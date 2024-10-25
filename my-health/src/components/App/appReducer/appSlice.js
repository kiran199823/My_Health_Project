import { createSlice } from '@reduxjs/toolkit';

const location = JSON.parse(localStorage.getItem('location'));

const appSlice = createSlice({
  name: 'app',
  initialState: {
    // Change the global location in future
    globalLocation: {
      state: location?.state ?? 'Karnataka',
      city: location?.city ?? 'Bengaluru',
    },
  },
  reducers: {
    updateGlobalLocation: (state, action) => {
      const { state: initialState, city: initialCity } = state.globalLocation;
      const {
        state: selectedState = initialState,
        city: selectedCity = initialCity,
      } = action.payload;

      localStorage.setItem(
        'location',
        JSON.stringify({
          state: selectedState,
          city: selectedCity,
        })
      );

      state.globalLocation.state = selectedState;
      state.globalLocation.city = selectedCity;
    },
  },
});

export const { updateGlobalLocation } = appSlice.actions;
export default appSlice.reducer;
