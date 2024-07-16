import React, { useState } from 'react';
import './style.scss';

export const DropDown = (props) => {
  const [hasContent, setHasContent] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { id, options, errorMessage, handleOnChange, labelName, ...others } =
    props;

  const onChangeInput = (event) => {
    const value = event.target.value;
    if (value) {
      setHasContent(true);
      setSelectedOption(value);
    } else {
      setHasContent(false);
    }

    if (typeof handleOnChange === 'function') {
      handleOnChange(event);
    }
  };

  return (
    <div className="inputStyle">
      <select
        className={`inputCustomStyle ${errorMessage ? 'inputError' : ''}`}
        value={selectedOption}
        id={id}
        onChange={onChangeInput}
        {...others}
      >
        <option value="" disabled hidden></option>
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
