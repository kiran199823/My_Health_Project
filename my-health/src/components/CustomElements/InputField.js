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
    ...others
  } = props;

  return (
    <div>
      <label className={labelClassName}>{labelName}</label>
      <input
        className={inputClassName}
        id={id}
        name={id}
        type={type}
        {...others}
      />
    </div>
  );
};
