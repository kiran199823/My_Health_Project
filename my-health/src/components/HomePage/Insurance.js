import React from 'react';
import { insuranceItems } from './utils';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Insurance = () => {
  return (
    <div className="labsContaier">
      <div className="homeHeading">
        <p>Insurance</p>
      </div>
      <div className="labsButtonsContainer">
        {insuranceItems &&
          insuranceItems.map(({ name, src, alt }, index) => {
            return (
              <button className="labsButton flexCenter" key={index}>
                {/* <FontAwesomeIcon icon={icon} className="labsButtonFontIcon" /> */}
                <img width="48" height="48" src={src} alt={alt} />
                <span className="labsButtonName">{name}</span>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Insurance;
