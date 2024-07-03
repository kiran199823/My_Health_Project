import React, { useEffect, useState } from 'react';
import './style.scss';
import AccountLayout from '../AccountLayout';
import { passwordValidation, userNameValidation } from '../../validations';
import { myHealthShortHand } from '../../../constants';
import { InputField } from '../../CustomElements/InputField';
import { Button } from '../../CustomElements/Button';
import { apiRequest } from '../../../request';
import { useDispatch, useSelector } from 'react-redux';
import { signinCall, signinSuccess } from './signinReducer/signinSlice';
import { CheckBox } from '../../CustomElements/CheckBox';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state?.signinSlice?.findEmail?.loading
  );
  const signinData = useSelector(
    (state) => state?.signinSlice?.findEmail?.data
  );

  const [errors, setErrors] = useState();
  const isEmailExist = signinData?.isEmailExist;
  const isUserSignedin = !!localStorage.getItem('user');
  console.log('isUserSignedin: ', isUserSignedin);

  useEffect(() => {
    if (isUserSignedin) {
      navigate('/'); // Navigating to home page
    }
  }, [isUserSignedin]);

  const handleEmailOnSubmit = (event) => {
    event.preventDefault();
    const { emailOrPhone } = event.target.elements;
    const errorMessage = userNameValidation(emailOrPhone?.value)?.message;
    if (errorMessage) {
      setErrors(errorMessage);
    } else {
      setErrors('');
      dispatch(signinCall());
      apiRequest('/signin/email', { method: 'post', data: emailOrPhone?.value })
        .then((data) => dispatch(signinSuccess(data)))
        .catch((error) => console.log('error', error));
    }
  };

  const handlePasswordOnSubmit = (event) => {
    event.preventDefault();
    const { password } = event.target.elements;
    const errorMessage = passwordValidation(password?.value)?.message;
    if (errorMessage) {
      setErrors(errorMessage);
    } else {
      setErrors('');
      dispatch(signinCall());
      apiRequest('/signin/password', { method: 'post', data: password?.value })
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data?.email?.email));
          dispatch(signinSuccess(data));
        })
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
    <>
      {!isEmailExist && (
        <AccountLayout
          leftTopLogo={myHealthShortHand}
          leftMiddleHeading="Sign in"
          leftBottomMessage="Use your Registred Account"
          isLoading={loading}
        >
          <form className="signincontainer" onSubmit={handleEmailOnSubmit}>
            <div className="signinInputField">
              <InputField
                id="emailOrPhone"
                labelName="Email or Phone"
                // handleOnChange={handleOnChange}
                errorMessage={errors}
              />
              <p>
                Not yet registred?
                <span className="signinCRMessages"> Create&nbsp;account</span>
              </p>
            </div>
            <Button type="submit" className="signinNext" text="Next" />
          </form>
        </AccountLayout>
      )}
      {isEmailExist && (
        <AccountLayout
          leftTopLogo={myHealthShortHand}
          leftMiddleHeading="Welcome"
          leftBottomMessage={signinData?.email?.email}
          isLoading={loading}
        >
          <form className="signincontainer" onSubmit={handlePasswordOnSubmit}>
            <div className="signinInputField">
              <InputField
                id="password"
                labelName="Enter your password"
                type="password"
                // handleOnChange={handleOnChange}
                errorMessage={errors}
              />
              <CheckBox labelName="Show password" />
            </div>
            <div className="signinPasswordButtons">
              <span className="signinCRMessages">Forgot password?</span>
              <Button type="submit" text="Next" />
            </div>
          </form>
        </AccountLayout>
      )}
    </>
  );
};

export default Signin;
