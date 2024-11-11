import React, { useEffect, useState } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import { calculateGST, calculateTotal } from './utils';

const Checkout = (props) => {
  const { cartId } = useParams();

  const { fetchCartDetails, cartDetails } = props;

  const [fee, setFee] = useState({});
  const [isOpenUPIModel, setIsOpenUPIModel] = useState(false);
  const [billModelInfo, setBillModelInfo] = useState({
    phoneNo: '',
    otp: '',
    isOTPSent: false,
    isOTPVerified: false,
  });

  useEffect(() => {
    if (cartId) {
      console.log('CDM');
      fetchCartDetails(cartId);
    }
  }, []);

  useEffect(() => {
    if (cartDetails?.selectedDoctorInfo?.name) {
      const doctorFee = 500;
      const CGST = calculateGST(doctorFee);
      const SGST = calculateGST(doctorFee);
      const total = calculateTotal(doctorFee, CGST, SGST);
      setFee({
        doctorFee,
        CGST,
        SGST,
        total,
      });
    }
  }, [cartDetails?.selectedDoctorInfo?.name]); // for now use name later change it to fee

  const handleOnPay = () => {
    console.log('handleclick');
    setIsOpenUPIModel(true);
  };

  const handlePhoneNoChange = (event) => {
    const phoneNo = event.target.value;
    if (phoneNo?.length <= 10) {
      setBillModelInfo({ phoneNo });
    }
  };

  const handleOnSendOTP = () => {
    if (billModelInfo?.phoneNo?.length === 10) {
      setBillModelInfo((prev) => ({
        ...prev,
        isOTPSent: true,
      }));
    }
  };

  const handleOnOTPChange = (event) => {
    const otp = event.target.value;
    if (otp?.length <= 4) {
      setBillModelInfo((prev) => ({
        ...prev,
        otp,
      }));
    }
  };

  const handleOnVerifyOTP = () => {
    if (billModelInfo?.otp?.length === 4) {
      setBillModelInfo((prev) => ({
        ...prev,
        isOTPVerified: true,
      }));
    }
  };

  return (
    <div className="checkoutContainer">
      <div className="body">
        <div className="checkoutHeader">
          <h1>Checkout</h1>
        </div>
        {!!cartDetails?.selectedDoctorInfo && (
          <div className="fareContainer">
            {/* <table border="1"> */}
            <table>
              <tr>
                <td>Doctor fee</td>
                {/* <td>{cartDetails.selectedDoctorInfo?.fee}</td> */}
                <td>{fee?.doctorFee}</td>
              </tr>
              <tr>
                <th colSpan="2">Taxes</th>
                {/* colspan spans 2 column and rowSpan spans rown */}
              </tr>
              <tr>
                <td>CGST 9%</td>
                <td>{fee?.CGST}</td>
              </tr>
              <tr>
                <td>SGST 9%</td>
                <td>{fee?.SGST}</td>
              </tr>
              <tr>
                <td className="total">Total</td>
                <td className="total">{fee?.total}</td>
              </tr>
            </table>
          </div>
        )}
        <div className="paymentContainer">
          <h2>Payment method</h2>
          <span className="subHeading">
            At present only Google Pay is available
          </span>
          <div className="UPIContainer">
            <div className="UPIsListCard">
              <img
                src="https://img.icons8.com/?size=100&id=d3FdjviJ7gNe&format=png&color=000000"
                width="45"
                height="45"
              />
              <span>Google pay</span>
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <button className="payButton" onClick={handleOnPay}>
            PAY
          </button>
        </div>
      </div>
      {isOpenUPIModel && !billModelInfo?.isOTPVerified && (
        <div className="upiModel">
          <label>Phone number</label>
          <input
            type="number"
            maxLength="10"
            onChange={handlePhoneNoChange}
            value={billModelInfo?.phoneNo}
          />
          <button type="button" onClick={handleOnSendOTP}>
            Send OPT
          </button>
          <label>OPT</label>
          <input
            type="number"
            onChange={handleOnOTPChange}
            value={billModelInfo?.otp}
            disabled={!billModelInfo?.isOTPSent}
          />
          <button
            type="button"
            disabled={!billModelInfo?.isOTPSent}
            onClick={handleOnVerifyOTP}
          >
            Verify
          </button>
        </div>
      )}
      {billModelInfo?.isOTPVerified && (
        <div className="confirmationContainer">
          <div className="confirmationCircle">
            <p>Booking confirmed</p>
            <p>Thank you</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
