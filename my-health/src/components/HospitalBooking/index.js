import React, { useState } from 'react';
import './style.scss';
import { InputField } from '../CustomElements/InputField';
import { getInputSearchItems, handleAPIDispatch } from './utils';
import SearchSuggestion from '../CustomElements/SearchSuggestion';

const HospitalBooking = (props) => {
  const { dispatch, statesData } = props;

  const [inputValues, setInputValues] = useState({
    state: '',
    city: '',
    date: '01/01/2001',
    hospital: '',
    doctor: '',
    specialist: ''
  });
  const [isOpenSearchTab, setIsOpenSearchTab] = useState(false);
  const [searchSuggestion, setSearchSuggestion] = useState({});

  const handleOnSelect = (selectedItem) => {
    const { id, item } = selectedItem;
    console.log('id, value', id, item);
    setInputValues({ ...inputValues, [id]: item });
  };

  const handleOnClick = (events) => {
    const inputId = events.target.id;
    handleAPIDispatch(inputId, dispatch);

    const inputSearchitems = getInputSearchItems(inputId, statesData);
    console.log('inputSearchitems: ', inputSearchitems);
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
            value={inputValues.state}
            onClick={handleOnClick}
          />
          <InputField
            id="city"
            labelName="City"
            value={inputValues.city}
            onClick={handleOnClick}
          />
          <InputField
            id="date"
            labelName="Select date"
            value={inputValues.date}
          />
          <InputField
            id="hospital"
            labelName="Hospital name (optional)"
            value={inputValues.hospital}
            onClick={handleOnClick}
          />
          <InputField
            id="doctor"
            labelName="Doctor name (optional)"
            value={inputValues.doctor}
            onClick={handleOnClick}
          />
          <InputField
            id="specialist"
            labelName="Specialist (optional)"
            value={inputValues.specialist}
            onClick={handleOnClick}
          />
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
          id={searchSuggestion.id}
          placeHolder={searchSuggestion.placeHolder}
          headerName={searchSuggestion.headerName}
          suggestionItems={searchSuggestion.suggestionItems}
          onSelect={handleOnSelect}
          handleOnBack={handleOnBackButton}
        />
      )}
    </div>
  );
};

export default HospitalBooking;
