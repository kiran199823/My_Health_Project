import React, { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { InputField } from '../CustomElements/InputField';
import {
  ageValidator,
  genderValidator,
  nameValidation,
  phoneValidation,
} from '../validations';

const PatientDetailsComponent = (props) => {
  const navigate = useNavigate();
  const { cartId } = useParams();

  const { fetchCartDetails, cartDetails, registerPatientAndRedirect } = props;

  const intialFormState = {
    firstName: '',
    lastName: '',
    age: '',
    phoneNo: '',
  };

  const [doctorInfo, setDoctorInfo] = useState({});
  const [selectedTime, setSelectedTime] = useState();
  const [patientDetails, setPatientDetails] = useState(intialFormState);
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (cartId) {
      fetchCartDetails(cartId);
    }
  }, []);

  useEffect(() => {
    console.log('CDU');
    if (cartDetails) {
      setDoctorInfo(cartDetails?.selectedDoctorInfo);
    }
  }, [cartDetails?.selectedDoctorInfo?.name]);

  const handleOnSelectTime = (event) => {
    const { value } = event.target;
    setSelectedTime(value);
  };

  const handlePatientInputChange = (event) => {
    const { id: fieldName, value } = event.target;
    setPatientDetails({ ...patientDetails, [fieldName]: value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, age, gender, phoneNo } = event.target;
    const firstNameValidation = nameValidation(firstName.value);
    const lastNameValidation = nameValidation(lastName.value);
    const ageValidation = ageValidator(age.value);
    const genderValidation = genderValidator(gender.value);
    const phoneNoValidation = phoneValidation(phoneNo?.value, true);

    setErrors({
      firstName: firstNameValidation?.message,
      lastName: lastNameValidation?.message,
      age: ageValidation?.message,
      gender: genderValidation?.message,
      phoneNo: phoneNoValidation?.message,
    });

    if (
      !firstNameValidation?.message &&
      !lastNameValidation?.message &&
      !ageValidation?.message &&
      !genderValidation?.message &&
      !phoneNoValidation?.message
    ) {
      registerPatientAndRedirect(
        {
          selectedTime,
          firstName: firstName.value,
          lastName: lastName.value,
          age: age.value,
          gender: gender.value,
          phoneNo: phoneNo.value,
          cartId,
        },
        navigate
      );
    }
  };

  return (
    <div className="patientContainer">
      <div className="header">
        <span>Enter patient details</span>
      </div>
      <form className="patientDetainsForm" onSubmit={handleOnSubmit}>
        <div className="availableContainer">
          <p>
            {doctorInfo?.name && `${doctorInfo.name} available timings`}
            <br />
            <span className="subTitle">Please select your convient time</span>
          </p>
          <div className="availableTime">
            {doctorInfo?.available?.time &&
              doctorInfo?.available?.time?.map((time, index) => {
                return (
                  <button
                    type="button"
                    value={time}
                    className={
                      selectedTime === time ? 'selectedTime' : 'timeButtons'
                    }
                    key={index}
                    onClick={handleOnSelectTime}
                  >
                    {time}
                  </button>
                );
              })}
          </div>
        </div>
        <span>Patient Details</span>
        <InputField
          id="firstName"
          labelName="First Name"
          value={patientDetails?.firstName}
          errorMessage={errors?.firstName}
          onChange={handlePatientInputChange}
        />
        <InputField
          id="lastName"
          labelName="Last Name"
          value={patientDetails?.lastName}
          errorMessage={errors?.lastName}
          onChange={handlePatientInputChange}
        />
        <div className="ageAndGenderContainer">
          <InputField
            id="age"
            labelName="Enter age"
            value={patientDetails?.age}
            errorMessage={errors?.age}
            onChange={handlePatientInputChange}
          />
          <div className="agc-item2">
            <label className="genderLabel">Gender</label>
            <select id="gender" className="genderDropDown">
              <option value="select">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            {!!errors?.gender && <span>{errors.gender}</span>}
          </div>
        </div>
        <br />
        <div className="optional">
          <span className="optionalLine" />
          <span>Optional</span>
          <span className="optionalLine" />
        </div>
        <InputField
          id="phoneNo"
          type="number"
          labelName="Phone No (optional)"
          value={patientDetails?.phoneNo}
          errorMessage={errors?.phoneNo}
          onChange={handlePatientInputChange}
        />
        <button type="submit" className="submitButton">
          Continue
        </button>
      </form>
    </div>
  );
};

export default PatientDetailsComponent;
