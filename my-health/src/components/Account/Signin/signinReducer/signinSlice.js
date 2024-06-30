import { createSlice } from '@reduxjs/toolkit';

const signinSlice = createSlice({
  name: 'signin',
  initialState: {
    findEmail: {
      loading: false,
      loaded: false,
      data: {}
    }
  },
  reducers: {
    findEmailCall: (state, action) => {
      state.findEmail.loading = true;
      state.findEmail.loaded = false;
    },
    findEmailSuccess: (state, action) => {
      state.findEmail.loading = false;
      state.findEmail.loaded = true;
    //   state.findEmail.data = action?.data;
    }
  }
});

export const { findEmailCall, findEmailSuccess } = signinSlice.actions;
export default signinSlice.reducer;
