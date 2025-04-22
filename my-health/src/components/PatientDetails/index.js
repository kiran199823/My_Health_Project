import { connect } from 'react-redux';
import PatientDetailsComponent from './PatientDetailsComponent';
import { handlefetchCartDetails, selectCartDetails } from '../DoctorsInfo';
import {
  registerPatient,
  registerPatientSuccess,
} from './patientDetailsReducer/patientDetailsSlice';
import { apiRequest } from '../../request';

const handleRegisterPatientDetails = (data, navigate, dispatch) => {
  dispatch(registerPatient());
  apiRequest('/api/registerPatientDetails', { method: 'post', data })
    .then((response) => {
      registerPatientSuccess();
      navigate(`/checkout/${data.cartId}`);
    })
    .catch((error) => console.log('registerPatientError', error));
};

const mapStateToProps = (state, ownProps) => ({
  cartDetails: selectCartDetails(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCartDetails: (cartId) => handlefetchCartDetails(cartId, dispatch),
  registerPatientAndRedirect: (data, navigate) =>
    handleRegisterPatientDetails(data, navigate, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDetailsComponent);
