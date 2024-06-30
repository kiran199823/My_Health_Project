import React, { useState } from 'react';
import './style.scss';
import AccountLayout from '../AccountLayout';
import { userNameValidation } from '../../validations';
import { myHealthShortHand } from '../../../constants';
import { InputField } from '../../CustomElements/InputField';
import { Button } from '../../CustomElements/Button';

const Signin = () => {
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
