import React from "react";
import "./style.css";

//Reuseable component for input fields
export const InputField = (props) => {
  const {
    inputClassName,
    labelClassName,
    labelName,
    id,
    type = "text",
    handleOnChnage,
    errorMessage,
    ...others
  } = props;

  return (
    <div>
      <label className={labelClassName}>{labelName}</label>
      <div className="inputStyle">
        <input
          className={`${inputClassName} ${errorMessage ? "inputError" : ""}`}
          id={id}
          name={id}
          type={type}
          onChange={handleOnChnage}
          {...others}
        />
        {errorMessage && <p className="errorMessageStyles">{errorMessage}</p>}
      </div>
    </div>
  );
};
