import React from 'react';
import HospitalBooking from '..';
import { useDispatch, useSelector } from 'react-redux';
import {
  stateRequest,
  stateRequestSuccess
} from '../hospitaBookingReducer/hospitalBookingSlice';
import { apiRequest } from '../../../request';

const HospitalBookingContainer = () => {
  const dispatch = useDispatch();

  const stateRequestDispatch = () => {
    dispatch(stateRequest());
    apiRequest('api/stateCity', {
      method: 'get'
    })
      .then((data) => dispatch(stateRequestSuccess(data)))
      .catch((error) => console.log('getStateCityError', error));
  };

  const statesData = useSelector((state) => {
    const statesData = state?.hospitalBookingSlice?.state?.data;
    if (statesData[0]?.states) {
      return statesData[0]?.states?.map((data) => data?.state);
    }
  });

  const handleDispatch = () => ({
    stateRequest: () => stateRequestDispatch()
  });

  return (
    <HospitalBooking dispatch={handleDispatch()} statesData={statesData} />
  );
};

export default HospitalBookingContainer;
