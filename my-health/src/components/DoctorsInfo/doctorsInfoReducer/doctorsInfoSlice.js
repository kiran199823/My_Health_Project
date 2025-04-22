import { createSlice } from '@reduxjs/toolkit';

const doctorsInfoSlice = createSlice({
  name: 'doctorsInfo',
  initialState: {
    cartDetails: {
      loading: false,
      loaded: false,
      data: '',
    },
    doctorsInfo: {
      loading: false,
      loaded: false,
      data: '',
    },
    registerDoctor: {
      loading: false,
      loaded: false,
    },
  },
  reducers: {
    fetchCartDetails: (state, action) => {
      state.cartDetails.loading = true;
      state.cartDetails.loaded = false;
    },
    fetchCartDetailsSuccess: (state, action) => {
      state.cartDetails.loading = true;
      state.cartDetails.loaded = false;
      state.cartDetails.data = action.payload;
    },
    fetchDoctorsInfo: (state, action) => {
      state.doctorsInfo.loading = true;
      state.doctorsInfo.loaded = false;
    },
    fetchDoctorsInfoSuccess: (state, action) => {
      state.doctorsInfo.loading = true;
      state.doctorsInfo.loaded = false;
      state.doctorsInfo.data = action.payload;
    },
    registerDoctorInfo: (state, action) => {
      state.registerDoctor.loading = true;
      state.registerDoctor.loaded = false;
    },
    registerDoctorInfoSuccess: (state, action) => {
      state.registerDoctor.loading = false;
      state.registerDoctor.loaded = true;
    },
  },
});

export const {
  fetchCartDetails,
  fetchCartDetailsSuccess,
  fetchDoctorsInfo,
  fetchDoctorsInfoSuccess,
  registerDoctorInfo,
  registerDoctorInfoSuccess,
} = doctorsInfoSlice.actions;
export default doctorsInfoSlice.reducer;
