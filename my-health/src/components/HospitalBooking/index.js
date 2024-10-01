import React, { useState } from 'react';
import './style.scss';
import { InputField } from '../CustomElements/InputField';
import { getInputSearchItems, handleAPIDispatch } from './utils';
import SearchSuggestion from '../CustomElements/SearchSuggestion';

const HospitalBooking = (props) => {
  const { dispatch, stateCityData } = props;

  const [isOpenSearchTab, setIsOpenSearchTab] = useState(false);
  const [searchSuggestion, setSearchSuggestion] = useState({});

  const handleOnInputChange = (events) => {
    console.log('events', events);
  };

  const handleOnClick = (events) => {
    const inputId = events.target.id;
    handleAPIDispatch(inputId, dispatch);

    const inputSearchitems = getInputSearchItems(inputId, stateCityData);
    if (inputSearchitems) {
      setSearchSuggestion(inputSearchitems);
      setIsOpenSearchTab(true);
    }
  };

  const handleOnBackButton = () => {
    setIsOpenSearchTab(false);
    setSearchSuggestion({});
  };

  return (
    <div className="hospitalBookingContainer">
      <div className="hospitalBookingBackGroundImage flexCenter">
        <p className="hospitalBookingHeading">Book a hospital</p>
      </div>
      <div className="hospitalBookingBody">
        <div className="hospitalBookingBodyContent">
          <InputField
            id="state"
            labelName="State"
            onChange={handleOnInputChange}
            onClick={handleOnClick}
          />
          <InputField
            id="city"
            labelName="City"
            onChange={handleOnInputChange}
            onClick={handleOnClick}
          />
          <InputField id="date" labelName="Select date" />
          <InputField id="hospitalName" labelName="Hospital name (optional)" />
          <InputField id="doctorName" labelName="Doctor name (optional)" />
          <InputField id="specialist" labelName="Specialist (optional)" />
          <button className="hospitalBookingBodyContentButtons">
            CHECK AVAILABILITY
          </button>
          <button className="hospitalBookingBodyContentButtonCancel">
            Back
          </button>
        </div>
      </div>
      {isOpenSearchTab && searchSuggestion && (
        <SearchSuggestion
          placeHolder={searchSuggestion.placeHolder}
          headerName={searchSuggestion.headerName}
          suggestionItems={searchSuggestion.suggestionItems}
          handleOnBack={handleOnBackButton}
        />
      )}
    </div>
  );
};

export default HospitalBooking;
