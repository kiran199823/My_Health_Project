import React from 'react';
import HospitalBooking from '..';
import { useDispatch, useSelector } from 'react-redux';
import {
  stateAndCityRequest,
  stateAndCityRequestSuccess
} from '../hospitaBookingReducer/hospitalBookingSlice';
import { apiRequest } from '../../../request';

const HospitalBookingContainer = () => {
  const dispatch = useDispatch();

  const stateAndCityRequestDispatch = () => {
    dispatch(stateAndCityRequest());
    apiRequest('api/stateCity', {
      method: 'get'
    })
      .then((data) => dispatch(stateAndCityRequestSuccess(data)))
      .catch((error) => console.log('getStateCityError', error));
  };

  const stateCityData = useSelector((state) => {
    const statesAndCitiesData = state?.hospitalBookingSlice?.stateAndCity?.data;
    if (statesAndCitiesData[0]?.states) {
      return statesAndCitiesData[0]?.states?.map((data) => data?.state);
    }
  });

  const handleDispatch = () => ({
    stateAndCityRequest: () => stateAndCityRequestDispatch()
  });

  return (
    <HospitalBooking
      dispatch={handleDispatch()}
      stateCityData={stateCityData}
    />
  );
};

export default HospitalBookingContainer;
