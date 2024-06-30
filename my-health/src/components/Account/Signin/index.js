import React, { useState } from 'react';
import './style.scss';
import AccountLayout from '../AccountLayout';
import { userNameValidation } from '../../validations';
import { myHealthShortHand } from '../../../constants';
import { InputField } from '../../CustomElements/InputField';
import { Button } from '../../CustomElements/Button';
import { apiRequest } from '../../../request';
import { useDispatch, useSelector } from 'react-redux';
import { findEmailCall, findEmailSuccess } from './signinReducer/signinSlice';

const Signin = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.signinSlice.findEmail.loading);

  const [errors, setErrors] = useState();

  const fieldValidation = (value) => {
    return userNameValidation(value)?.message;
  };

  const handleOnSubmit = (event) => {
    const { emailOrPhone } = event.target.elements;
    event.preventDefault();
    const errorMessage = fieldValidation(emailOrPhone.value);
    if (errorMessage) {
      setErrors(errorMessage);
    } else {
      setErrors('');
      dispatch(findEmailCall());
      apiRequest('/findemail', { method: 'post', data: emailOrPhone.value })
        .then((data) => dispatch(findEmailSuccess(data)))
        .catch((error) => console.log('error', error));
    }
  };

  // implement later if needed otherwise remove it
  // const handleOnChange = (event) => {
  //   if (errors) {
  //     fieldValidation(event);
  //   }
  // };

  return (
    <AccountLayout
      leftTopLogo={myHealthShortHand}
      leftMiddleHeading="Sign in"
      leftBottomMessage="Use your Registred Account"
      isLoading={loading}
    >
      <form className="signincontainer" onSubmit={handleOnSubmit}>
        <div className="signinInputField">
          <InputField
            id="emailOrPhone"
            labelName="Email or Phone"
            // handleOnChange={handleOnChange}
            errorMessage={errors}
          />
          <p>
            Not yet registred?
            <span className="signinCRMessages"> create&nbsp;account</span>
          </p>
        </div>
        <Button type="submit" className="signinNext" text="Next" />
      </form>
    </AccountLayout>
  );
};

export default Signin;
