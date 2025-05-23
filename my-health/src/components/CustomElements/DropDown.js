import React, { useState, useEffect } from 'react';
import './style.scss';

export const DropDown = (props) => {
  const [hasContent, setHasContent] = useState(false);
  const { id, options, errorMessage, onChange, labelName, value, ...others } =
    props;

  useEffect(() => {
    if (value) {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  }, [value]);

  const onChangeInput = (event) => {
    // add code if needed

    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  return (
    <div className="inputStyle">
      <select
        className={`inputCustomStyle ${errorMessage ? 'inputError' : ''}`}
        value={value}
        id={id}
        onChange={onChangeInput}
        {...others}
      >
        <option value="" disabled hidden></option>
        {/* when it's disabled it cannot be clicked, typed in, or submitted as part of a form */}
        {/* hidden elements are not displayed on the page and take up no space in the layout */}
        {options &&
          options.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            );
          })}
      </select>
      <label className={`${hasContent ? 'moveUpLabel' : ''}`}>
        {labelName}
      </label>
      <p className="errorMessageStyles">{errorMessage}</p>
    </div>
  );
};
