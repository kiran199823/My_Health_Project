import { configureStore } from '@reduxjs/toolkit';
import globalHeadersSlice from '../components/GlobalHeaders/globalHeadersReducer/globalHeadersSlice';
import signinSlice from '../components/Account/Signin/signinReducer/signinSlice';
import createAccountSlice from '../components/Account/CreateAccount/createAccountReducer/createAccountSlice';
import hospitalBookingSlice from '../components/HospitalBooking/hospitaBookingReducer/hospitalBookingSlice';
import appSlice from '../components/App/appReducer/appSlice';
import homePageSlice from '../components/HomePage/homePageReducer/homePageSlice';
import doctorsInfoSlice from '../components/DoctorsInfo/doctorsInfoReducer/doctorsInfoSlice';
import patientDetailsSlice from '../components/PatientDetails/patientDetailsReducer/patientDetailsSlice';

const store = configureStore({
  reducer: {
    globalHeadersSlice,
    signinSlice,
    createAccountSlice,
    hospitalBookingSlice,
    appSlice,
    homePageSlice,
    doctorsInfoSlice,
    patientDetailsSlice,
  },
});

export default store;
