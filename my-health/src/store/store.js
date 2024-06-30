import { configureStore } from '@reduxjs/toolkit';
import globalHeadersSlice from '../components/GlobalHeaders/globalHeadersReducer/globalHeadersSlice';
import signinSlice from '../components/Account/Signin/signinReducer/signinSlice';

const store = configureStore({
  reducer: {
    globalHeadersSlice,
    signinSlice
  }
});

export default store;
