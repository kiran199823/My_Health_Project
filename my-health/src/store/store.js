import { configureStore } from '@reduxjs/toolkit';
import globalHeadersSlice from '../components/GlobalHeaders/globalHeadersReducer/globalHeadersSlice';
import signinSlice from '../components/Account/Signin/signinReducer/signinSlice';
import createAccountSlice from '../components/Account/CreateAccount/createAccountReducer/createAccountSlice';

const store = configureStore({
  reducer: {
    globalHeadersSlice,
    signinSlice,
    createAccountSlice
  }
});

export default store;
