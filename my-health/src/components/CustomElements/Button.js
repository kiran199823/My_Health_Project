import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export const Button = (props) => {
  const { text, className, type, varient, ...otherProps } = props;
  return (
    <button
      type={type}
      className={`${varient === 'circle' ? 'customButtonCircle' : 'customButton'}`}
      {...otherProps}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.any,
  type: PropTypes.string,
  varient: PropTypes.string
};
