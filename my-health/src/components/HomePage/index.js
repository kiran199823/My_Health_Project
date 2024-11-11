import { connect } from 'react-redux';
import HomePageComponent from './HomePageComponent';
import { createSelector } from '@reduxjs/toolkit';
import { apiRequest } from '../../request';
import {
  fetchCityList,
  fetchCityListSuccess,
  fetchStateList,
  fetchStateListSuccess,
  resetlocationFields,
} from './homePageReducer/homePageSlice';
import {
  fetchToken,
  fetchTokenSuccess,
  updateGlobalLocation,
} from '../App/appReducer/appSlice';

const appState = (state) => state.appSlice;
const homePageState = (state) => state.homePageSlice;

const selectGlobalLocation = createSelector(appState, (appState) => {
  const { state, city } = appState.globalLocation;
  return { state, city };
});

const selectStateList = createSelector(homePageState, (homePageState) => {
  return homePageState?.location?.stateList?.data;
});

const selectCityList = createSelector(homePageState, (homePageState) => {
  return homePageState?.location?.cityList?.data;
});

const handleFetchLocationData = (fieldName, method, data = null, dispatch) => {
  if (fieldName === 'state') {
    dispatch(fetchStateList());
    apiRequest('api/state')
      .then((data) => dispatch(fetchStateListSuccess(data)))
      .catch((error) => console.log('fetchStateError:', error));
  } else if (fieldName === 'city') {
    dispatch(fetchCityList());
    apiRequest('api/city', {
      method: 'post',
      data,
    })
      .then((data) => dispatch(fetchCityListSuccess(data)))
      .catch((error) => console.log('fetchCityError:', error));
  }
};

const handleFetchToken = (dispatch) => {
  dispatch(fetchToken());
  apiRequest('api/gettoken')
    .then((status) => {
      dispatch(fetchTokenSuccess());
      console.log('status', status);
    })
    .catch((error) => console.log('tokenError', error));
};

const mapStateToProps = (state, ownProps) => ({
  globalLocation: selectGlobalLocation(state),
  statesList: selectStateList(state),
  citiesList: selectCityList(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchLocationData: (fieldName, method, data) =>
    handleFetchLocationData(fieldName, method, data, dispatch),
  updateGlobalLocation: (data) => dispatch(updateGlobalLocation(data)),
  resetlocationFields: () => dispatch(resetlocationFields()),
  fetchToken: () => handleFetchToken(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);
