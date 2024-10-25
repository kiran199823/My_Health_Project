import { createSlice } from '@reduxjs/toolkit';

const initialStateData = () => {
  return {
    loading: false,
    loaded: false,
    data: '',
  };
};

const hospitalBookingSlice = createSlice({
  name: 'hospitalBooking',
  initialState: {
    currentLocation: {
      currentState: '',
      currentCity: '',
    },
    location: {
      state: initialStateData(),
      city: initialStateData(),
    },
    hospital: initialStateData(),
  },
  reducers: {
    updateCurrentLocation: (state, action) => {
      state.currentLocation.currentState =
        action.payload?.state ?? state.currentLocation.currentState;
      state.currentLocation.currentCity =
        action.payload?.city ?? state.currentLocation.currentCity;
    },
    fetchState: (state, action) => {
      const stateName = action?.payload;
      state.location[stateName].loading = true;
      state.location[stateName].loaded = false;
    },
    fetchStateSuccess: (state, action) => {
      const stateName = action?.payload?.fieldName;
      state.location[stateName].loading = false;
      state.location[stateName].loaded = true;
      state.location[stateName].data = action?.payload?.data;
    },
    resetlocationFields: (state, action) => {
      state.location.state = initialStateData();
      state.location.city = initialStateData();
    },
    bookingInputsRequest: (state, action) => {
      state[action?.payload].loading = true; // here state is a intialState and it's treated as array
      state[action?.payload].loaded = false;
    },
    bookingInputsAPISuccess: (state, action) => {
      const stateName = action?.payload?.fieldName;
      if (stateName) {
        state[stateName].data = action?.payload?.data;
        state[stateName].loading = false;
        state[stateName].loaded = true;
      }
    },
    resetRequiredFields: (state, action) => {
      const stateNames = action?.payload ?? [];
      stateNames.forEach((stateName) => {
        if (state[stateName]) {
          state[stateName].data = '';
        }
      });
    },
  },
});

export const {
  bookingInputsRequest,
  bookingInputsAPISuccess,
  resetRequiredFields,
  fetchState,
  fetchStateSuccess,
  resetlocationFields,
  updateCurrentLocation,
} = hospitalBookingSlice.actions;
export default hospitalBookingSlice.reducer;
