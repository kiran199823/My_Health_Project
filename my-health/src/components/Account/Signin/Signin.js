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
    password: '',
  });

  const isEmailFound = signinData === 'Found';

  const isUserSignedin = () => {
    const user = localStorage.getItem('user');
    if (user && user !== 'undefined') {
      return !!localStorage.getItem('user');
    }
    return false;
  };

  useEffect(() => {
    if (isUserSignedin()) {
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
        data: {
          EmailOrPhone: emailOrPhone?.value,
        },
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
        data: {
          EmailOrPhone: authDetails?.emailOrPhone,
          Password: password?.value,
        },
      })
        .then((data) => {
          const { success: authStatus, email } = data;
          if (authStatus && email) {
            localStorage.setItem('user', JSON.stringify(email));
          }
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
      {!isEmailFound && (
        <AccountLayout
          leftMiddleHeading="Sign in"
          leftBottomMessage="Use your Registred Account"
          isLoading={loading}
        >
          <form className="signincontainer" onSubmit={handleEmailOnSubmit}>
            <div className="signinInputField">
              <div className="item-inputField">
                <InputField
                  id="emailOrPhone"
                  labelName="Email or Phone"
                  value={authDetails.emailOrPhone}
                  onChange={handleOnChange}
                  errorMessage={errors}
                  style={INPUT_STYLE_MEDIUM} // inline styles
                />
              </div>
              <p className="item-notRegistredMessage">
                Not yet registred?
                <span
                  className="signinCRMessages"
                  onClick={handleOnCreateAccountClick}
                >
                  Create&nbsp;account
                </span>
              </p>
              <div className="item-nextButton">
                <Button type="submit" className="signinNext" text="Next" />
              </div>
            </div>
          </form>
        </AccountLayout>
      )}
      {isEmailFound && (
        <AccountLayout
          leftMiddleHeading="Welcome"
          leftBottomMessage={signinData?.email?.email}
          isLoading={loading}
        >
          <form className="signincontainer" onSubmit={handlePasswordOnSubmit}>
            <div className="passwordInputField">
              <div className="item-inputField">
                <InputField
                  id="password"
                  labelName="Enter your password"
                  type="password"
                  value={authDetails.password}
                  onChange={handleOnChange}
                  errorMessage={errors}
                  style={INPUT_STYLE_MEDIUM}
                />
              </div>
              <div className="item-showPassword">
                <CheckBox labelName="Show password" />
              </div>
              <div className="item-forgotPasswordButtons">
                <span className="signinCRMessages">Forgot password?</span>
              </div>
              <div className="item-submitButton">
                <Button type="submit" text="Next" />
              </div>
            </div>
          </form>
        </AccountLayout>
      )}
    </>
  );
};

export default Signin;
