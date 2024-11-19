import React, { useEffect, useState } from 'react';
import './style.scss';
import { InputField } from '../CustomElements/InputField';
import { getResetFields } from './utils';
import SearchSuggestion from '../CustomElements/SearchSuggestion';
import { dateValidation } from '../validations';
import LocationChange from '../LocationChange';
import { useNavigate } from 'react-router-dom';
import useRouteDetails from '../App/routeDetails';

const HospitalBooking = (props) => {
  const navigate = useNavigate();

  const {
    bookingInputsAPIDispatch,
    inputSuggestionData,
    fetchLocationData,
    isStateLoaded,
    statesData,
    citiesData,
    resetlocationFields,
    currentLocation,
    updateCurrentLocation,
    resetRequiredFields,
    registerbookingInfo,
    cartId,
  } = props;

  const intialInputValues = {
    date: '',
    hospital: '',
    doctor: '',
    specialist: '',
  };

  const [inputValues, setInputValues] = useState(intialInputValues);
  const [errors, setErrors] = useState('');
  const [currentFieldName, setCurrentFieldName] = useState('');
  const [searchSuggestionOptions, setSearchSuggestionOptions] = useState();
  const [isShowLocationModal, setIsShowLocationModal] = useState(false);

  useEffect(() => {
    if (currentFieldName && inputSuggestionData(currentFieldName)) {
      const suggestionData = inputSuggestionData(currentFieldName);
      setSearchSuggestionOptions(suggestionData);
    }
  }, [inputSuggestionData]);

  useEffect(() => {
    if (cartId) {
      navigate(`/doctorinfo/${cartId}`);
    }
  }, [cartId]);

  const handleOnSelect = (selectedItem) => {
    const { id: fieldName, selectedValue } = selectedItem; // id will be assigned to fieldName

    if (inputValues[fieldName] && inputValues[fieldName] !== selectedValue) {
      const resetFields = getResetFields(
        fieldName,
        setInputValues,
        selectedValue
      );
      resetRequiredFields(resetFields);
      return;
    }

    setInputValues({ ...inputValues, [fieldName]: selectedValue });
  };

  const handleDateChange = (events) => {
    const fieldName = events.target.id;
    const dateValue = events.target.value;
    if (
      fieldName === 'date' &&
      inputValues.date &&
      inputValues.date !== dateValue
    ) {
      const resetFields = getResetFields('date', setInputValues, dateValue);
      resetRequiredFields(resetFields);
      return;
    }

    setInputValues({ ...inputValues, date: dateValue });
  };

  const handleOnClick = (events) => {
    const fieldName = events.target.id;
    setCurrentFieldName(fieldName);
    let data = {};

    if (fieldName === 'hospital') {
      data = { location: currentLocation };
    } else if (fieldName === 'doctor') {
      data = { location: currentLocation, hospital: inputValues?.hospital };
    } else if (fieldName === 'specialist') {
      data = {
        location: currentLocation,
        details: {
          hospital: inputValues?.hospital,
          doctor: inputValues?.doctor,
        },
      };
    }
    bookingInputsAPIDispatch(fieldName, 'post', data);
  };

  const closeSuggestionModel = () => {
    resetRequiredFields([`${currentFieldName}`]);
    setSearchSuggestionOptions();
    setCurrentFieldName();
  };

  const handleOnBackButton = () => {
    navigate('/');
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const { date, hospital, doctor, specialist } = event.target.elements;
    const [day, month, year] = date.value.split('-');
    const dateError = dateValidation(day, month, year);
    if (dateError) {
      setErrors({
        date: dateError?.message,
      });
      return;
    }
    const bookingInfo = {
      date: date.value,
      hospital: hospital.value,
      doctor: doctor.value,
      specialist: specialist.value,
    };
    registerbookingInfo(bookingInfo);
  };

  const closeLocationModel = () => {
    setIsShowLocationModal(false);
  };

  const handleLocationClick = () => {
    setIsShowLocationModal(true);
  };

  const handleOnLocationChange = (data) => {
    resetRequiredFields(['hospital', 'doctor', 'specialist']);
    updateCurrentLocation(data);
  };

  return (
    <div className="hospitalBookingContainer">
      <div className="hospitalBookingBackGroundImage flexCenter">
        <p className="hospitalBookingHeading">Book a hospital</p>
      </div>
      <div className="hospitalBookingBody">
        <form className="hospitalBookingBodyContent" onSubmit={handleOnSubmit}>
          {/* do not change id's for InputField, since same name is given in backend */}
          <div className="warningStyle">
            <p>
              The options you see will depend on the location you chose
              before.&nbsp;
              <button
                type="button"
                className="locationChangeButton"
                onClick={handleLocationClick}
              >
                {currentLocation?.city}
              </button>
            </p>
          </div>
          <InputField
            id="date"
            labelName="Select date"
            placeHolder="Select date (DD-MM-YYYY)"
            pattern="\d{2}-\d{2}-\d{4}"
            errorMessage={errors?.date}
            value={inputValues.date}
            title="Format: dd-mm-yyyy"
            onChange={handleDateChange}
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
          <button className="hospitalBookingBodyContentButtons" type="submit">
            CHECK AVAILABILITY
          </button>
          <button
            type="button"
            className="hospitalBookingBodyContentButtonCancel"
            onClick={handleOnBackButton}
          >
            Back
          </button>
        </form>
      </div>
      {isShowLocationModal && (
        <LocationChange
          fetchLocationData={fetchLocationData}
          stateSuggestion={statesData}
          citySuggestion={citiesData}
          isStateLoaded={isStateLoaded}
          closeLocationModel={closeLocationModel}
          resetlocationFields={resetlocationFields}
          updateLocation={handleOnLocationChange}
        />
      )}
      {searchSuggestionOptions?.suggestionItems?.length > 0 && (
        <SearchSuggestion
          id={searchSuggestionOptions.id}
          placeHolder={searchSuggestionOptions.placeHolder}
          headerName={searchSuggestionOptions.headerName}
          suggestionItems={searchSuggestionOptions.suggestionItems}
          onSelect={handleOnSelect}
          handleOnBack={closeSuggestionModel}
        />
      )}
    </div>
  );
};

export default HospitalBooking;
