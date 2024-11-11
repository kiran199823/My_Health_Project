import { connect } from 'react-redux';
import DoctorsInfoComponent from './DoctorsInfoComponent';
import {
  fetchCartDetails,
  fetchCartDetailsSuccess,
  fetchDoctorsInfo,
  fetchDoctorsInfoSuccess,
  registerDoctorInfo,
  registerDoctorInfoSuccess,
} from './doctorsInfoReducer/doctorsInfoSlice';
import { apiRequest } from '../../request';
import { createSelector } from '@reduxjs/toolkit';

// selectors
const doctorsInfoState = (state) => state.doctorsInfoSlice;

export const selectCartDetails = createSelector(doctorsInfoState, (doctorsInfo) => {
  return doctorsInfo.cartDetails.data;
});

const selectDoctorsInfo = createSelector(doctorsInfoState, (doctorsInfo) => {
  return doctorsInfo?.doctorsInfo?.data;
});

// dispatch
export const handlefetchCartDetails = (cartId, dispatch) => {
  dispatch(fetchCartDetails());
  apiRequest('/api/getCartDetails', { method: 'post', data: { cartId } })
    .then((data) => dispatch(fetchCartDetailsSuccess(data[0])))
    .catch((error) => console.log('cartDetailsError', error));
};

const handlefetchDoctorsInfo = (fields, dispatch) => {
  dispatch(fetchDoctorsInfo());
  apiRequest('api/doctorsResults', { method: 'post', data: fields })
    .then((data) => dispatch(fetchDoctorsInfoSuccess(data)))
    .catch((error) => console.log('fetchDoctorsInfoError', error));
};

const handleRegisterAndRedirect = (doctorInfo, navigate, dispatch) => {
  dispatch(registerDoctorInfo());
  apiRequest('/api/registerDoctorInfo', { method: 'post', data: doctorInfo })
    .then((data) => {
      dispatch(registerDoctorInfoSuccess());
      navigate(`/patientDetails/${doctorInfo?.cartId}`);
    })
    .catch((error) => console.log('registerDoctorInfoError', error));
};

const mapStateToProps = (state, ownProps) => ({
  cartDetails: selectCartDetails(state),
  doctorsInfo: selectDoctorsInfo(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCartDetails: (cartId) => handlefetchCartDetails(cartId, dispatch),
  fetchDoctorsInfo: (fields) => handlefetchDoctorsInfo(fields, dispatch),
  registerDoctorAndRedirect: (doctorInfo, navigate) =>
    handleRegisterAndRedirect(doctorInfo, navigate, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorsInfoComponent);
