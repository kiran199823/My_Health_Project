import React, { useState } from "react";
import "./style.css";
import { InputField } from "../../CustomElements/InputField";
import { userNameValidation, passwordValidation } from "../../validations";

const Login = () => {
  const [userNameError, setUserNameError] = useState({});
  const [passwordError, setpasswordError] = useState({});

  const onChange = (event) => {
    const { name, value } = event.target;

    if (name === "userName") {
      setUserNameError(userNameValidation(value));
    }

    if (name === "password") {
      setpasswordError(passwordValidation(value));
    }
  };

  return (
    <>
      <div className="fullScreen flexCenter loginPageContainer">
        <div className="flexCenter loginContainer">
          <h1>Login</h1>
          <form className="loginForm">
            <InputField
              labelClassName="loginLabels"
              inputClassName="loginInput"
              labelName="User name"
              id="userName"
              placeholder="User name..."
              handleOnChnage={onChange}
              errorMessage={userNameError?.message}
            />
            <InputField
              labelClassName="loginLabels"
              inputClassName="loginInput"
              labelName="Password"
              type="password"
              id="password"
              placeholder="Password..."
              handleOnChnage={onChange}
              errorMessage={passwordError?.message}
            />
            <div className="loginButtonsContainer">
              <button className="loginCloseButton">Close</button>
              <button className="loginSubmitButton" type="Submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
