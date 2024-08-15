import React, { useEffect, useState } from 'react';
import './style.scss';
import AccountLayout from '../AccountLayout';
import { passwordValidation, emailValidation } from '../../validations';
import { InputField } from '../../CustomElements/InputField';
import { Button } from '../../CustomElements/Button';
import { apiRequest } from '../../../request';
import { useDispatch, useSelector } from 'react-redux';
import { signinCall, signinSuccess } from './signinReducer/signinSlice';
import { CheckBox } from '../../CustomElements/CheckBox';
import { useNavigate } from 'react-router-dom';
import { INPUT_STYLE_MEDIUM } from '../../../constants';

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
  const [authDetails, setAuthDetails] = useState({
    emailOrPhone: '',
    password: ''
  });

  const isEmailExist = signinData?.isEmailExist;
  const isUserSignedin = !!localStorage.getItem('user');

  useEffect(() => {
    if (isUserSignedin) {
      navigate('/'); // Navigating to home page
    }
  }, [isUserSignedin]);

  const handleEmailOnSubmit = (event) => {
    event.preventDefault();
    const { emailOrPhone } = event.target.elements;
    const errorMessage = emailValidation(emailOrPhone?.value)?.message;
    if (errorMessage) {
      setErrors(errorMessage);
    } else {
      setErrors('');
      dispatch(signinCall());
      apiRequest('api/signin/email', {
        method: 'post',
        data: emailOrPhone?.value
      })
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
      apiRequest('api/signin/password', {
        method: 'post',
        data: password?.value
      })
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data?.email?.email));
          dispatch(signinSuccess(data));
        })
        .catch((error) => console.log('error', error));
    }
  };

  const handleOnCreateAccountClick = () => {
    navigate('/create-account?st=1');
  };

  const handleOnChange = (event) => {
    const inputLabel = event.target.id;
    const inputValue = event.target.value;
    setAuthDetails({ ...authDetails, [inputLabel]: inputValue });
  };

  return (
    <>
      {!isEmailExist && (
        <AccountLayout
          leftMiddleHeading="Sign in"
          leftBottomMessage="Use your Registred Account"
          isLoading={loading}
        >
          <form className="signincontainer" onSubmit={handleEmailOnSubmit}>
            <div className="signinInputField">
              <InputField
                id="emailOrPhone"
                labelName="Email or Phone"
                value={authDetails.emailOrPhone}
                onChange={handleOnChange}
                errorMessage={errors}
                style={INPUT_STYLE_MEDIUM} // inline styles
              />
              <p>
                Not yet registred?
                <span
                  className="signinCRMessages"
                  onClick={handleOnCreateAccountClick}
                >
                  {' '}
                  Create&nbsp;account
                </span>
              </p>
            </div>
            <Button type="submit" className="signinNext" text="Next" />
          </form>
        </AccountLayout>
      )}
      {isEmailExist && (
        <AccountLayout
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
                value={authDetails.password}
                onChange={handleOnChange}
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
