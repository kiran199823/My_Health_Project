import { createSlice } from '@reduxjs/toolkit';

const initialStateData = {
  loading: false,
  loaded: false,
  data: '',
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState: {
    location: {
      stateList: initialStateData,
      cityList: initialStateData,
    },
  },
  reducers: {
    fetchStateList: (state) => {
      state.location.stateList.loading = true;
      state.location.stateList.loaded = false;
    },
    fetchStateListSuccess: (state, action) => {
      state.location.stateList.loading = false;
      state.location.stateList.loaded = true;
      state.location.stateList.data = action.payload;
    },
    fetchCityList: (state) => {
      state.location.cityList.loading = true;
      state.location.cityList.loaded = false;
    },
    fetchCityListSuccess: (state, action) => {
      state.location.cityList.loading = false;
      state.location.cityList.loaded = true;
      state.location.cityList.data = action.payload;
    },
    resetlocationFields: (state) => {
      state.location.stateList = initialStateData;
      state.location.cityList = initialStateData;
    },
  },
});

export const {
  fetchStateList,
  fetchStateListSuccess,
  fetchCityList,
  fetchCityListSuccess,
  resetlocationFields,
} = homePageSlice.actions;

export default homePageSlice.reducer;
