import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

// Reuseable component for input fields
export const InputField = (props) => {
  const [hasContent, setHasContent] = useState(false);
  const {
    labelClassName,
    labelName,
    inputClassName,
    placeHolder,
    id,
    value,
    type = 'text',
    onChange,
    onClick,
    errorMessage,
    ...others
  } = props;

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
      <input
        className={`inputCustomStyle ${inputClassName} ${errorMessage ? 'inputError' : ''}`}
        id={id}
        name={id}
        type={type}
        value={value || ''}
        onClick={onClick}
        onChange={onChangeInput}
        placeholder={placeHolder}
        {...others}
      />
      {labelName && (
        <label
          className={`${labelClassName} ${hasContent ? 'moveUpLabel' : ''}`}
        >
          {labelName}
        </label>
      )}
      <span className="errorMessageStyles">{errorMessage}</span>
    </div>
  );
};

InputField.propTypes = {
  labelClassName: PropTypes.any,
  labelName: PropTypes.string,
  id: PropTypes.any,
  value: PropTypes.any,
  type: PropTypes.string,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string
};
