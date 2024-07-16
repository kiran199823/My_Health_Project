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
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from './createAccountReducer/createAccountSlice';
import { formatDate, userRequestBody } from './utils';
import { DropDown } from '../../CustomElements/DropDown';
import { apiRequest } from '../../../request';
import { dataEncryption } from '../../../utils';

const CreateAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.createAccountSlice?.userInfo);

  const { params } = useRouteDetails();

  const [errorMessages, setErrorMessages] = useState({});
  const step = params.get('st') || '1';

  const options = [
    {
      value: 'male',
      name: 'Male'
    },
    {
      value: 'female',
      name: 'female'
    },
    {
      value: 'others',
      name: 'Others'
    }
  ];

  const handleOnContactSubmit = (event) => {
    event.preventDefault();
    const { email, phoneNo } = event.target.elements;
    const emailErrorMessage = emailValidation(email?.value)?.message;
    const phoneErrorMessage = phoneValidation(phoneNo?.value)?.message;
    setErrorMessages({ emailErrorMessage, phoneErrorMessage });
    if (!(emailErrorMessage || phoneErrorMessage)) {
      dispatch(
        updateUserInfo({
          email: email?.value,
          phoneNo: phoneNo?.value
        })
      );
      navigate('/create-account?st=2');
    }
  };

  const handleOnNameFieldSubmit = (event) => {
    event.preventDefault();
    const { firstName, middleName, lastName } = event.target.elements;
    const firstNameErrorMessage = nameValidation(firstName?.value)?.message;
    const lastNameErrorMessage = nameValidation(lastName?.value)?.message;
    setErrorMessages({ firstNameErrorMessage, lastNameErrorMessage });
    if (!(firstNameErrorMessage || lastNameErrorMessage)) {
      dispatch(
        updateUserInfo({
          firstName: firstName?.value,
          middleName: middleName?.value,
          lastName: lastName?.value
        })
      );
      navigate('/create-account?st=3');
    }
  };

  const handleOnBasicFieldSubmit = (event) => {
    event.preventDefault();
    const genderValue = event.target.elements.gender?.value;
    const isNotValidDate = dateValidation(event.target.elements);
    const isNotValidGender = genderValidation(genderValue);

    const dateErrorMessage = isNotValidDate?.message;
    const genderErrorMessage = isNotValidGender?.message;
    setErrorMessages({ dateErrorMessage, genderErrorMessage });

    if (!(isNotValidDate || isNotValidGender)) {
      const formatedDate = formatDate(event.target.elements);
      dispatch(
        updateUserInfo({
          DOB: formatedDate,
          gender: genderValue
        })
      );
      navigate('/create-account?st=4');
    }
  };

  const handleOnPasswordFieldSubmit = (event) => {
    event.preventDefault();
    const setPasswordValue = event.target.elements?.setPassword?.value;
    const confirmPasswordValue = event.target.elements?.confirmPassword?.value;
    const isNotValidPassword = passwordValidation(setPasswordValue);

    if (isNotValidPassword) {
      const passwordErrorMessage = isNotValidPassword?.message;
      setErrorMessages({ passwordErrorMessage });
      return;
    }
    if (confirmPasswordValue !== setPasswordValue) {
      const passwordMatchErrorMessage = 'Password did not matching';
      setErrorMessages({ passwordMatchErrorMessage });
      return;
    }

    const encryptedPassword = dataEncryption(setPasswordValue);

    const requestData = userRequestBody(userInfo, encryptedPassword);

    if (userInfo) {
      apiRequest('api/user', { method: 'post', data: requestData })
        .then((responseMessage) =>
          console.log('responseMessage', responseMessage)
        )
        .catch((error) => console.log('error', error));
    }
  };

  const contactField = () => {
    return (
      <form className="nameContainer" onSubmit={handleOnContactSubmit}>
        <div className="nameFieldContainer">
          <div className="setPasswordContainer">
            <InputField
              labelName="Email"
              id="email"
              errorMessage={errorMessages.emailErrorMessage}
            />
          </div>
          <div className="confirmPasswordContainer">
            <InputField
              labelName="Phone no"
              id="phoneNo"
              type="number"
              errorMessage={errorMessages.phoneErrorMessage}
            />
          </div>
        </div>
        <div className="nameButtonContainer">
          <Button type="submit" text="Next" />
        </div>
      </form>
    );
  };

  const nameInputField = () => {
    return (
      <form className="nameContainer" onSubmit={handleOnNameFieldSubmit}>
        <div className="nameFieldContainer">
          <div className="firstNameContainer">
            <InputField
              labelName="First name"
              id="firstName"
              errorMessage={errorMessages.firstNameErrorMessage}
            />
          </div>
          <div className="middleAndLastNameContainer">
            <InputField labelName="Middle name (Optional)" id="middleName" />
            <InputField
              labelName="Last name"
              id="lastName"
              errorMessage={errorMessages.lastNameErrorMessage}
            />
          </div>
        </div>
        <div className="nameButtonContainer">
          <Button type="submit" text="Next" />
        </div>
      </form>
    );
  };

  const basicInputField = () => {
    return (
      <form className="nameContainer" onSubmit={handleOnBasicFieldSubmit}>
        <div className="nameFieldContainer">
          <div className="basicDOBContainer">
            <InputField
              labelName="Date"
              id="date"
              type="number"
              errorMessage={errorMessages.dateErrorMessage}
            />
            <InputField
              labelName="Month"
              id="month"
              type="number"
              errorMessage={!!errorMessages.dateErrorMessage}
            />
            <InputField
              labelName="Year"
              id="year"
              type="number"
              errorMessage={!!errorMessages.dateErrorMessage}
            />
          </div>
          <div className="genderContainer">
            <DropDown
              labelName="Gender"
              id="gender"
              options={options}
              errorMessage={errorMessages?.genderErrorMessage}
            />
          </div>
        </div>
        <div className="nameButtonContainer">
          <Button type="submit" text="Next" />
        </div>
      </form>
    );
  };

  const passwordInputField = () => {
    return (
      <form className="nameContainer" onSubmit={handleOnPasswordFieldSubmit}>
        <div className="nameFieldContainer">
          <div className="setPasswordContainer">
            <InputField
              labelName="Set password"
              id="setPassword"
              type="password"
              errorMessage={errorMessages.passwordErrorMessage}
            />
          </div>
          <div className="confirmPasswordContainer">
            <InputField
              labelName="Confirm password"
              id="confirmPassword"
              type="password"
              errorMessage={errorMessages.passwordMatchErrorMessage}
            />
          </div>
        </div>
        <div className="nameButtonContainer">
          <Button type="submit" text="Next" />
        </div>
      </form>
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
      >
        {layoutFields(step).renderInputFields}{' '}
        {/* did not add conditional chaining due to some testing, add it later */}
      </AccountLayout>
    </>
  );
};

export default CreateAccount;
