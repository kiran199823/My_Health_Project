import { createSlice } from '@reduxjs/toolkit';

const initialStateData = () => {
  return {
    loading: false,
    loaded: false,
    data: ''
  };
};

const hospitalBookingSlice = createSlice({
  name: 'hospitalBooking',
  initialState: {
    state: initialStateData(),
    city: initialStateData(),
    hospital: initialStateData()
  },
  reducers: {
    stateRequest: (state, action) => {
      state.state.loading = true;
      state.state.loaded = false;
    },
    stateRequestSuccess: (state, action) => {
      state.state.data = action?.payload;
      state.state.loading = false;
      state.state.loaded = true;
    }
  }
});

export const { stateRequest, stateRequestSuccess } =
  hospitalBookingSlice.actions;
export default hospitalBookingSlice.reducer;
