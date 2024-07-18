import { createSlice } from '@reduxjs/toolkit';

const createAccountSlice = createSlice({
  name: 'createAccount',
  initialState: {
    signup: {
      loading: false,
      loaded: false
    }
  },
  reducers: {
    signupCall: (state, action) => {
      state.signup.loading = true;
      state.signup.loaded = false;
    },
    signupCallSuccess: (state, action) => {
      state.signup.loading = false;
      state.signup.loaded = true;
    },
    signupCallFail: (state, action) => {
      state.signup.loading = false;
      state.signup.loaded = true;
    }
  }
});

export const { signupCall, signupCallSuccess, signupCallFail } =
  createAccountSlice.actions;
export default createAccountSlice.reducer;
