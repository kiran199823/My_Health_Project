import { createSlice } from '@reduxjs/toolkit';

const signinSlice = createSlice({
  name: 'signin',
  initialState: {
    findEmail: {
      loading: false,
      loaded: false,
      data: {}
    },
    user: {
      userData: ''
    }
  },
  reducers: {
    signinCall: (state, action) => {
      state.findEmail.loading = true;
      state.findEmail.loaded = false;
    },
    signinSuccess: (state, action) => {
      const userData = localStorage.getItem('user');
      if (userData) {
        state.user.userData = JSON.parse(userData);
      }
      state.findEmail.data = action?.payload;
      state.findEmail.loading = false;
      state.findEmail.loaded = true;
    },
    removeSignedInUser: (state, action) => {
      localStorage.removeItem('user');
      state.user.userData = '';
    }
  }
});

export const { signinCall, signinSuccess, removeSignedInUser } =
  signinSlice.actions;
export default signinSlice.reducer;
