import { configureStore } from '@reduxjs/toolkit';
import globalHeadersSlice from '../components/GlobalHeaders/globalHeadersReducer/globalHeadersSlice';
import signinSlice from '../components/Account/Signin/signinReducer/signinSlice';
import createAccountSlice from '../components/Account/CreateAccount/createAccountReducer/createAccountSlice';
import hospitalBookingSlice from '../components/HospitalBooking/hospitaBookingReducer/hospitalBookingSlice';

const store = configureStore({
  reducer: {
    globalHeadersSlice,
    signinSlice,
    createAccountSlice,
    hospitalBookingSlice
  }
});

export default store;
