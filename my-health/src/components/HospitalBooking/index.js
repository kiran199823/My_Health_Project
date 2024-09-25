import React from 'react';
import './style.scss';
import { InputField } from '../CustomElements/InputField';

const HospitalBooking = () => {
  return (
    <div className="hospitalBookingContainer">
      <div className="hospitalBookingBackGroundImage flexCenter">
        <p className="hospitalBookingHeading">Book a hospital</p>
      </div>
      <div className="hospitalBookingBody">
        <div className="hospitalBookingBodyContent">
          <InputField id="stateAndCity" labelName="State and City" />
          <InputField id="date" labelName="Select date"/>
          <InputField id="hospitalName" labelName="Hospital name (optional)"/>
          <InputField id="doctorName" labelName="Doctor name (optional)"/>
          <InputField id="specialist" labelName="Specialist (optional)"/>
          <button className="hospitalBookingBodyContentButtons">
            CHECK AVAILABILITY
          </button>
          <button className="hospitalBookingBodyContentButtonCancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalBooking;
