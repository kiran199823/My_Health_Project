import { createSlice } from '@reduxjs/toolkit';

const hospitalBookingSlice = createSlice({
  name: 'hospitalBooking',
  initialState: {
    stateAndCity: {
      loading: false,
      loaded: false,
      data: {}
    }
  },
  reducers: {
    stateAndCityRequest: (state, action) => {
      state.stateAndCity.loading = true;
      state.stateAndCity.loaded = false;
    },
    stateAndCityRequestSuccess: (state, action) => {
      state.stateAndCity.data = action?.payload;
      state.stateAndCity.loading = false;
      state.stateAndCity.loaded = true;
    }
  }
});

export const { stateAndCityRequest, stateAndCityRequestSuccess } =
  hospitalBookingSlice.actions;
export default hospitalBookingSlice.reducer;
