import React, { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getResetFields } from '../HospitalBooking/utils';

const DoctorsInfoComponent = (props) => {
  const {
    fetchCartDetails,
    cartDetails,
    fetchDoctorsInfo,
    doctorsInfo,
    bookingInputsAPIDispatch,
    resetRequiredFields,
    registerDoctorAndRedirect,
  } = props;
  const { cartId } = useParams();
  const navigate = useNavigate();

  const { hospital, doctor, specialist } = cartDetails;

  const intialFilterValues = {
    hospital: '',
    doctor: '',
    specialist: '',
  };

  const [filterValues, setFilterValues] = useState(intialFilterValues);

  useEffect(() => {
    fetchCartDetails(cartId);
  }, []);

  useEffect(() => {
    fetchDoctorsInfo({
      hospital: hospital ?? '',
      doctor: doctor ?? '',
      specialist: specialist ?? '',
    });
  }, [doctor, hospital, specialist]);

  const handleOnSelect = (selectedItem) => {
    const { id: filterName, selectedValue } = selectedItem; // id will be assigned to filterName

    if (
      filterValues[filterName] &&
      filterValues[filterName] !== selectedValue
    ) {
      const resetFields = getResetFields(
        filterName,
        setFilterValues,
        selectedValue
      );
      resetRequiredFields(resetFields);
      return;
    }

    setFilterValues({ ...filterValues, [filterName]: selectedValue });
  };

  const handleFiltersClick = (event) => {
    const filterName = event.target.id;
    let data = {};

    if (filterName === 'doctors') {
      data = { hospital: filterValues?.hospital };
    } else if (filterName === 'specialists') {
      data = {
        details: {
          hospital: filterValues?.hospital,
          doctor: filterValues?.doctor,
        },
      };
    }
    bookingInputsAPIDispatch(filterName, 'post', data);
  };

  const handleOnCardClick = (event) => {
    const selectedDoctor = doctorsInfo?.find(
      ({ name }) => name === event.target.id
    );
    const requestBody = {
      cartId,
      selectedDoctor,
    };
    registerDoctorAndRedirect(requestBody, navigate);
  };

  return (
    <div className="doctorInfoContainer">
      <div className="header">
        <span>Select doctor</span>
      </div>
      <div className="filters">
        <button
          id="hospitals"
          className={`${hospital ? 'filled' : 'hospital'}`}
          onClick={handleFiltersClick}
        >
          Hospitals
        </button>
        <button id="doctors" className={`${doctor ? 'filled' : 'hospital'}`}>
          Doctors
        </button>
        <button
          id="specialists"
          className={`${specialist ? 'filled' : 'hospital'}`}
        >
          Specialists
        </button>
      </div>
      <div className="doctorsInfoContainer">
        {doctorsInfo &&
          doctorsInfo?.map((doctor, index) => {
            return (
              <div
                className="doctorCard"
                id={doctor.name}
                key={index}
                onClick={handleOnCardClick}
              >
                <img
                  className="item-photo"
                  src="https://img.icons8.com/3d-fluency/94/medical-doctor--v6.png"
                  alt="doctor"
                  width="80"
                  height="80"
                />
                <p className="item-name">{doctor.name}</p>
                <p className="item-fee">
                  {'consultant Fee: '}
                  <span className="fee">500</span>
                </p>
                <p className={`item-spel ${specialist ? 'normalFont' : ''}`}>
                  {doctor.specialization}
                </p>
                <p className={`item-hospital ${hospital ? 'normalFont' : ''}`}>
                  {doctor.hospital}
                </p>
                <p className="item-des">{doctor.description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DoctorsInfoComponent;
