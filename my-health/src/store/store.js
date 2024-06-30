import { configureStore } from '@reduxjs/toolkit';
import globalHeadersReducer from '../components/GlobalHeaders/globalHeadersReducer/globalHeadersSlice';

const store = configureStore({
  reducer: {
    globalHeadersReducer
  }
});

export default store;
