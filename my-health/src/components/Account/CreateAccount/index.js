import React, { useState } from 'react';
import './style.scss';
import AccountLayout from '../AccountLayout';
import { InputField } from '../../CustomElements/InputField';
import useRouteDetails from '../../App/routeDetails';
import { Button } from '../../CustomElements/Button';
import {
  dateValidation,
  emailValidation,
  genderValidation,
  nameValidation,
  passwordValidation,
  phoneValidation
} from '../../validations';
import { useNavigate } from 'react-router-dom';
import { userRequestBody } from './utils';
import { DropDown } from '../../CustomElements/DropDown';
import { apiRequest } from '../../../request';
import { dataEncryption } from '../../../utils';
import { options } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  signupCall,
  signupCallFail,
  signupCallSuccess
} from './createAccountReducer/createAccountSlice';
import { signinSuccess } from '../Signin/signinReducer/signinSlice';
import { INPUT_STYLE_MEDIUM } from '../../../constants';

const CreateAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state) => state.createAccountSlice.signup.loading
  );

  const { params } = useRouteDetails();

  const [errorMessages, setErrorMessages] = useState({});
  const [userDetails, setUserDetails] = useState({
    email: '',
    phoneNo: '',
    firstName: '',
    middleName: '',
    lastName: '',
    date: '',
    month: '',
    year: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });
  const step = params.get('st') || '1';

  const handleOnFieldChange = (event) => {
    // event.target.value, event.target.id
    const inputField = event.target.id;
    const inputValue = event.target.value;
    setUserDetails({ ...userDetails, [inputField]: inputValue });
  };

  const handleOnContactSubmit = (event) => {
    event.preventDefault();
    const { email, phoneNo } = userDetails;
    const emailErrorMessage = emailValidation(email)?.message;
    const phoneErrorMessage = phoneValidation(phoneNo)?.message;
    setErrorMessages({ emailErrorMessage, phoneErrorMessage });
    if (!(emailErrorMessage || phoneErrorMessage)) {
      navigate('/create-account?st=2');
    }
  };

  const handleOnNameFieldSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName } = userDetails;
    const firstNameErrorMessage = nameValidation(firstName)?.message;
    const lastNameErrorMessage = nameValidation(lastName)?.message;
    setErrorMessages({ firstNameErrorMessage, lastNameErrorMessage });
    if (!(firstNameErrorMessage || lastNameErrorMessage)) {
      navigate('/create-account?st=3');
    }
  };

  const handleOnBasicFieldSubmit = (event) => {
    event.preventDefault();
    const { date, month, year, gender } = userDetails;
    const isNotValidDate = dateValidation(date, month, year);
    const isNotValidGender = genderValidation(gender);

    const dateErrorMessage = isNotValidDate?.message;
    const genderErrorMessage = isNotValidGender?.message;
    setErrorMessages({ dateErrorMessage, genderErrorMessage });

    if (!(isNotValidDate || isNotValidGender)) {
      navigate('/create-account?st=4');
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { password, confirmPassword, email } = userDetails;
    const isNotValidPassword = passwordValidation(password);

    if (isNotValidPassword) {
      const passwordErrorMessage = isNotValidPassword?.message;
      setErrorMessages({ passwordErrorMessage });
      return;
    }
    if (confirmPassword !== password) {
      const passwordMatchErrorMessage = 'Password did not matching';
      setErrorMessages({ passwordMatchErrorMessage });
      return;
    }

    const encryptedPassword = dataEncryption(password);

    const requestData = userRequestBody(userDetails, encryptedPassword);

    if (requestData) {
      dispatch(signupCall());
      apiRequest('api/user', { method: 'post', data: requestData })
        .then((responseMessage) => {
          localStorage.setItem('user', JSON.stringify(email));
          dispatch(signinSuccess());
          dispatch(signupCallSuccess(responseMessage));
          navigate('/');
        })
        .catch(() => {
          dispatch(signupCallFail());
        });
    }
  };

  const contactField = () => {
    return (
      <>
        <div className="nameFieldContainer">
          <div className="setPasswordContainer">
            <InputField
              labelName="Email"
              id="email"
              value={userDetails.email}
              onChange={handleOnFieldChange}
              errorMessage={errorMessages.emailErrorMessage}
              style={INPUT_STYLE_MEDIUM}
            />
          </div>
          <div className="confirmPasswordContainer">
            <InputField
              labelName="Phone no"
              id="phoneNo"
              type="number"
              value={userDetails.phoneNo}
              onChange={handleOnFieldChange}
              errorMessage={errorMessages.phoneErrorMessage}
            />
          </div>
        </div>
        <div className="nameButtonContainer">
          <Button text="Next" onClick={handleOnContactSubmit} />
        </div>
      </>
    );
  };

  const nameInputField = () => {
    return (
      <>
        <div className="nameFieldContainer">
          <div className="firstNameContainer">
            <InputField
              labelName="First name"
              id="firstName"
              value={userDetails.firstName}
              onChange={handleOnFieldChange}
              errorMessage={errorMessages.firstNameErrorMessage}
            />
          </div>
          <div className="middleAndLastNameContainer">
            <InputField
              labelName="Middle name (Optional)"
              id="middleName"
              value={userDetails.middleName}
              onChange={handleOnFieldChange}
            />
            <InputField
              labelName="Last name"
              id="lastName"
              value={userDetails.lastName}
              onChange={handleOnFieldChange}
              errorMessage={errorMessages.lastNameErrorMessage}
            />
          </div>
        </div>
        <div className="nameButtonContainer">
          <Button text="Next" onClick={handleOnNameFieldSubmit} />
        </div>
      </>
    );
  };

  const basicInputField = () => {
    return (
      <>
        <div className="nameFieldContainer">
          <div className="basicDOBContainer">
            <InputField
              labelName="Date"
              id="date"
              type="number"
              value={userDetails.date}
              onChange={handleOnFieldChange}
              errorMessage={errorMessages.dateErrorMessage}
            />
            <InputField
              labelName="Month"
              id="month"
              type="number"
              value={userDetails.month}
              onChange={handleOnFieldChange}
              errorMessage={!!errorMessages.dateErrorMessage}
            />
            <InputField
              labelName="Year"
              id="year"
              type="number"
              value={userDetails.year}
              onChange={handleOnFieldChange}
              errorMessage={!!errorMessages.dateErrorMessage}
            />
          </div>
          <div className="genderContainer">
            <DropDown
              labelName="Gender"
              id="gender"
              options={options}
              value={userDetails.gender}
              onChange={handleOnFieldChange}
              errorMessage={errorMessages?.genderErrorMessage}
            />
          </div>
        </div>
        <div className="nameButtonContainer">
          <Button text="Next" onClick={handleOnBasicFieldSubmit} />
        </div>
      </>
    );
  };

  const handleOnSigninClick = () => {
    navigate('/signin');
  };

  const passwordInputField = () => {
    return (
      <>
        <div className="nameFieldContainer">
          <div className="setPasswordContainer">
            <InputField
              labelName="Set password"
              id="password"
              type="password"
              value={userDetails.password}
              onChange={handleOnFieldChange}
              errorMessage={errorMessages.passwordErrorMessage}
            />
          </div>
          <div className="confirmPasswordContainer">
            <InputField
              labelName="Confirm password"
              id="confirmPassword"
              type="password"
              value={userDetails.confirmPassword}
              onChange={handleOnFieldChange}
              errorMessage={errorMessages.passwordMatchErrorMessage}
            />
          </div>
        </div>
        <div className="nameButtonContainer">
          <Button type="submit" text="Next" />
        </div>
      </>
    );
  };

  const layoutFields = (step) => {
    switch (step) {
      case '1':
        return {
          leftMiddleHeading: 'Create account',
          leftBottomMessage: 'Enter contact details',
          renderInputFields: contactField()
        };
      case '2':
        return {
          leftMiddleHeading: 'Create account',
          leftBottomMessage: 'Enter your name',
          renderInputFields: nameInputField()
        };
      case '3':
        return {
          leftMiddleHeading: 'Basic Information',
          leftBottomMessage: 'Enter details',
          renderInputFields: basicInputField()
        };
      case '4':
        return {
          leftMiddleHeading: 'Password',
          leftBottomMessage: 'set your password',
          renderInputFields: passwordInputField()
        };
    }
  };

  return (
    <>
      <AccountLayout
        leftMiddleHeading={layoutFields(step)?.leftMiddleHeading}
        leftBottomMessage={layoutFields(step)?.leftBottomMessage}
        isLoading={isLoading}
      >
        <form className="nameContainer" onSubmit={handleFormSubmit}>
          {layoutFields(step).renderInputFields}
          {/* did not add conditional chaining due to some testing, add it later */}
          <p>
            Already have account?
            <span className="signinCRMessages" onClick={handleOnSigninClick}>
              {' '}
              Signin
            </span>
          </p>
        </form>
      </AccountLayout>
    </>
  );
};

export default CreateAccount;
