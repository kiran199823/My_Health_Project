import React from "react";
import "./style.css";
import { InputField } from "../../CustomElements/InputField";

const Login = () => {
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
            />
            <InputField
              labelClassName="loginLabels"
              inputClassName="loginInput"
              labelName="Password"
              type="password"
              id="password"
              placeholder="Password..."
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
