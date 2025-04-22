import React, { useState } from 'react';
import SearchSuggestion from '../CustomElements/SearchSuggestion';

const Appointment = () => {
  const [inputPopup, setInputPopup] = useState(false);
  const handleClick = () => {
    setInputPopup(true);
  };

  const handleBack = () => {
    setInputPopup(false);
  };

  const items = ['Karnataka', 'Andhara', 'kerala'];

  return (
    <div className="appointmentContainer">
      <input
        placeholder="State"
        className="placeInputs"
        onClick={handleClick}
      />
      <input placeholder="District" className="placeInputs" />
      <input
        placeholder="Hospital or Doctors name or specilist"
        className="appointmentInputs"
      />
      <input placeholder="Date" />
      <button type="submit">Search</button>
      {inputPopup && (
        <SearchSuggestion
          placeHolder="Search state"
          suggestionItems={items}
          headerName=" Select state"
          handleBack={handleBack}
        />
      )}
    </div>
  );
};

export default Appointment;
