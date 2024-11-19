import React from 'react';
import PropTypes from 'prop-types';

export const CheckBox = (props) => {
  const { labelName } = props;
  return (
    <>
      <input className="customCheckbox" type="checkbox" />
      <label>{labelName}</label>
    </>
  );
};

CheckBox.propTypes = {
  labelName: PropTypes.string
};
