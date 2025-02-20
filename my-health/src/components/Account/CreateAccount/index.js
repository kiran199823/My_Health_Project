import React, { useState } from 'react';
import './style.scss';
import AccountLayout from '../AccountLayout';
import { InputField } from '../../CustomElements/InputField';
import useRouteDetails from '../../App/routeDetails';
import { Button } from '../../CustomElements/Button';
import {
  dateValidation,
  emailValidation,
  genderValidator,
  nameValidation,
  passwordValidation,
  phoneValidation,
} from '../../validations';
import { useLocation, useNavigate } from 'react-router-dom';
import { userRequestBody } from './utils';
import { DropDown } from '../../CustomElements/DropDown';
import { apiRequest } from '../../../request';
import { options } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  signupCall,
  signupCallFail,
  signupCallSuccess,
} from './createAccountReducer/createAccountSlice';
import { signinSuccess } from '../Signin/signinReducer/signinSlice';
import { INPUT_STYLE_MEDIUM } from '../../../constants';

const CreateAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state) => state.createAccountSlice.signup.loading
  );

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const step = queryParams.get('st') || '1';

  const [errorMessages, setErrorMessages] = useState({});
  const [userDetails, setUserDetails] = useState({
    email: '',
    phoneNo: '',
    firstName: '',
    lastName: '',
    date: '',
    month: '',
    year: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const handleOnChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setUserDetails({ ...userDetails, [id]: value });
  };

  const handleOnNext = (event) => {
    event.preventDefault();
    const { firstName, lastName, date, month, year, gender } = userDetails;
    const firstNameErrorMessage = nameValidation(firstName)?.message;
    const lastNameErrorMessage = nameValidation(lastName)?.message;
    const DOBErrorMessage = dateValidation(date, month, year)?.message;
    const genderErrorMessage = genderValidator(gender)?.message;
    setErrorMessages({
      firstNameErrorMessage,
      lastNameErrorMessage,
      DOBErrorMessage,
      genderErrorMessage,
    });
    if (
      !(
        firstNameErrorMessage ||
        lastNameErrorMessage ||
        DOBErrorMessage ||
        genderErrorMessage
      ) &&
      step === '1'
    ) {
      navigate('?st=2');
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault(); // without this browser does a full page reload and appends form data to the URL.
    const { email, phoneNo, password } = userDetails;
    const emailErrorMessage = emailValidation(email)?.message;
    const phoneNumberErrorMessage = phoneValidation(phoneNo)?.message;
    const passwordErrorMessage = passwordValidation(password)?.message;
    setErrorMessages({
      emailErrorMessage,
      phoneNumberErrorMessage,
      passwordErrorMessage,
    });

    if (
      !(emailErrorMessage || phoneNumberErrorMessage || passwordErrorMessage)
    ) {
      const requestData = userRequestBody(userDetails);

      if (requestData) {
        dispatch(signupCall());
        apiRequest('api/user', { method: 'post', data: requestData })
          .then((responseMessage) => {
            const { Auth: status, Email: email } = responseMessage;
            dispatch(signinSuccess());
            dispatch(signupCallSuccess());
            if (status && email)
              localStorage.setItem('user', JSON.stringify(email));
            navigate('/');
          })
          .catch(() => {
            dispatch(signupCallFail());
          });
      }
    }
  };

  const handleOnSignin = () => {
    navigate('/signin');
  };

  return (
    <>
      <AccountLayout
        leftMiddleHeading="Create account"
        leftBottomMessage={step === '1' ? 'Basic Info' : 'Contact Info'}
        isLoading={isLoading}
      >
        <div className="createAccountChild">
          <form className="createAccountForm" onSubmit={handleOnSubmit}>
            {step === '1' && (
              <div className="item-createAccountInputs">
                <InputField
                  id="firstName"
                  labelName="First name"
                  value={userDetails.firstName}
                  onChange={handleOnChange}
                  errorMessage={errorMessages.firstNameErrorMessage}
                  style={INPUT_STYLE_MEDIUM} // inline styles
                />

                <InputField
                  id="lastName"
                  labelName="Last name"
                  value={userDetails.lastName}
                  onChange={handleOnChange}
                  errorMessage={errorMessages.lastNameErrorMessage}
                  style={INPUT_STYLE_MEDIUM} // inline styles
                />

                <div className="DOBContainer">
                  <label className="item-DOBLabel">Date of birth</label>
                  <InputField
                    id="date"
                    labelName="Date"
                    value={userDetails.date}
                    maxlength="2"
                    errorMessage={errorMessages?.DOBErrorMessage}
                    onChange={handleOnChange}
                  />
                  <InputField
                    id="month"
                    value={userDetails.month}
                    maxlength="2"
                    onChange={handleOnChange}
                    labelName="Month"
                  />
                  <InputField
                    id="year"
                    value={userDetails.year}
                    maxlength="4"
                    onChange={handleOnChange}
                    labelName="Year"
                  />
                </div>

                <DropDown
                  labelName="Gender"
                  id="gender"
                  options={options}
                  value={userDetails.gender}
                  onChange={handleOnChange}
                  errorMessage={errorMessages?.genderErrorMessage}
                />
              </div>
            )}
            {step === '2' && (
              <div className="item-createAccountInputs">
                <InputField
                  id="email"
                  labelName="Email"
                  value={userDetails.email}
                  onChange={handleOnChange}
                  errorMessage={errorMessages?.emailErrorMessage}
                  style={INPUT_STYLE_MEDIUM} // inline styles
                />

                <InputField
                  id="phoneNo"
                  labelName="Phone number"
                  value={userDetails.phoneNo}
                  type="number"
                  onChange={handleOnChange}
                  errorMessage={errorMessages?.phoneNumberErrorMessage}
                  style={INPUT_STYLE_MEDIUM} // inline styles
                />

                <InputField
                  id="password"
                  labelName="Set passkey"
                  value={userDetails.password}
                  type="number"
                  // maxlength="6"
                  onChange={handleOnChange}
                  errorMessage={errorMessages?.passwordErrorMessage}
                  style={INPUT_STYLE_MEDIUM} // inline styles
                />
              </div>
            )}
            <p className="item-haveAccountContainer">
              Already have an account?
              <span className="signinCRMessages" onClick={handleOnSignin}>
                Signin
              </span>
            </p>
            <div className="item-buttonContainer">
              {step === '1' && (
                <Button type="button" text="Next" onClick={handleOnNext} />
              )}
              {step === '2' && <Button type="submit" text="Submit" />}
            </div>
          </form>
        </div>
      </AccountLayout>
    </>
  );
};

export default CreateAccount;
