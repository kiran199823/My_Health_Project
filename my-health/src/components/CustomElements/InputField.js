import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

// Reuseable component for input fields
export const InputField = (props) => {
  const [hasContent, setHasContent] = useState(false);
  const {
    inputClassName,
    labelClassName,
    labelName,
    id,
    type = 'text',
    handleOnChange,
    errorMessage,
    ...others
  } = props;

  const onChangeInput = (event) => {
    const value = event.target.value;
    if (value) {
      setHasContent(true);
    } else {
      setHasContent(false);
    }

    if (typeof handleOnChange === 'function') {
      handleOnChange(event);
    }
  };

  return (
    <div className="inputStyle">
      <input
        className={`inputCustomStyle ${inputClassName} ${
          errorMessage ? 'inputError' : ''
        }`}
        id={id}
        name={id}
        type={type}
        onChange={onChangeInput}
        {...others}
      />
      <label
        className={`${labelClassName} ${hasContent ? 'moveUpLabel' : ''}`}
      >
        {labelName}
      </label>
      {errorMessage && <p className="errorMessageStyles">{errorMessage}</p>}
    </div>
  );
};

InputField.propTypes = {
  inputClassName: PropTypes.any,
  labelClassName: PropTypes.any,
  labelName: PropTypes.string,
  id: PropTypes.any,
  type: PropTypes.string,
  handleOnChange: PropTypes.func,
  errorMessage: PropTypes.string
};
