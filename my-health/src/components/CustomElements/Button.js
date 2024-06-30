import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export const Button = (props) => {
  const { text, className, type } = props;
  return <button type={type} className={`customButton ${className}`}>{text}</button>;
};

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.any,
  type: PropTypes.string
};
