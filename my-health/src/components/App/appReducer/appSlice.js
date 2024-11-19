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
    tokenData: {
      loading: false,
      loaded: false,
      token: '',
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
    fetchToken: (state, action) => {
      state.tokenData.loading = true;
      state.tokenData.loaded = false;
    },
    fetchTokenSuccess: (state, action) => {
      state.tokenData.loading = false;
      state.tokenData.loaded = true;
    },
  },
});

export const { updateGlobalLocation, fetchToken, fetchTokenSuccess } =
  appSlice.actions;
export default appSlice.reducer;
