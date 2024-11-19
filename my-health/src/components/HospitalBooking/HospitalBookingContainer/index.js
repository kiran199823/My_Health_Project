import HospitalBooking from '..';
import { connect } from 'react-redux';
import {
  bookingInputsRequest,
  bookingInputsAPISuccess,
  resetRequiredFields,
  fetchState,
  fetchStateSuccess,
  resetlocationFields,
  updateCurrentLocation,
  registerBookingInfo,
  registerBookingInfoSuccess,
} from '../hospitaBookingReducer/hospitalBookingSlice';
import { apiRequest } from '../../../request';
import { createSelector } from 'reselect';
import { getInputSearchItems } from '../utils';

const selectHospitalBooking = (state) => state.hospitalBookingSlice;
const selectGlobalLocation = (state) => state.appSlice?.globalLocation;

const selectCurrentLocation = createSelector(
  selectGlobalLocation,
  selectHospitalBooking,
  (globalLocation, bookingStateData) => {
    const { currentState, currentCity } = bookingStateData.currentLocation;

    if (!currentState || !currentCity) {
      return globalLocation;
    }

    return { state: currentState, city: currentCity };
  }
);

const selectInputSuggestionData = (fieldName) =>
  createSelector(selectHospitalBooking, (bookingInputSuggestion) => {
    const suggestionValues = bookingInputSuggestion[fieldName]?.data;
    const suggestionData = getInputSearchItems(fieldName, suggestionValues);
    return suggestionData;
  });

const selectIsStateLoaded = createSelector(
  selectHospitalBooking,
  (bookingStateData) => {
    return bookingStateData?.location?.state?.loaded;
  }
);

const selectGetStates = createSelector(
  selectHospitalBooking,
  (bookingStateData) => {
    return bookingStateData.location?.state?.data;
  }
);

const selectGetcities = createSelector(
  selectHospitalBooking,
  (bookingStateData) => {
    return bookingStateData.location?.city?.data;
  }
);

const selectGetCartId = createSelector(
  selectHospitalBooking,
  (bookingStateData) => {
    return bookingStateData.bookingInfo.cartId;
  }
);

// Dispatch functions
const bookingInputsAPIDispatch = (
  fieldName,
  method = 'get',
  data = null,
  dispatch
) => {
  dispatch(bookingInputsRequest(fieldName));
  apiRequest(`api/${fieldName}`, {
    method,
    data,
  })
    .then((data) => dispatch(bookingInputsAPISuccess({ fieldName, data })))
    .catch((error) => console.log('bookingInputsError', error));
};

const fetchLocationData = (
  fieldName,
  method = 'get',
  data = null,
  dispatch
) => {
  dispatch(fetchState(fieldName));
  apiRequest(`api/${fieldName}`, {
    method,
    data,
  })
    .then((data) => dispatch(fetchStateSuccess({ fieldName, data })))
    .catch((error) => console.log('fetchStateError', error));
};

const handleRegisterBookingInfo = (data, dispatch) => {
  dispatch(registerBookingInfo());
  apiRequest('api/registerBookingInfo', { method: 'post', data })
    .then((data) => dispatch(registerBookingInfoSuccess(data)))
    .catch((error) => console.log('registerBookingInfo', error));
};

// mapDispatchToProps and mapStateToProps
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchLocationData: (fieldName, method, data) =>
    fetchLocationData(fieldName, method, data, dispatch),
  bookingInputsAPIDispatch: (fieldName, method, data) =>
    bookingInputsAPIDispatch(fieldName, method, data, dispatch),
  resetRequiredFields: (fieldNames) =>
    dispatch(resetRequiredFields(fieldNames)),
  resetlocationFields: () => dispatch(resetlocationFields()),
  updateCurrentLocation: (location) =>
    dispatch(updateCurrentLocation(location)),
  registerbookingInfo: (data) => handleRegisterBookingInfo(data, dispatch),
});

const mapStateToProps = (state, ownProps) => ({
  inputSuggestionData: (fieldName) =>
    selectInputSuggestionData(fieldName)(state), // inside selectInputSuggestionData function there is one more function so use selectInputSuggestionData()()
  isStateLoaded: selectIsStateLoaded(state),
  statesData: selectGetStates(state),
  citiesData: selectGetcities(state),
  currentLocation: selectCurrentLocation(state),
  cartId: selectGetCartId(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HospitalBooking);
