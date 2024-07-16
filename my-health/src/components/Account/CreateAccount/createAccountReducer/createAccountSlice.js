import { createSlice } from '@reduxjs/toolkit';

const createAccountSlice = createSlice({
  name: 'createAccount',
  initialState: {
    userInfo: {
      firstName: '',
      middleName: '',
      lastName: '',
      DOB: '',
      gender: '',
      email: '',
      phoneNo: ''
    }
  },
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo.firstName = action.payload?.firstName
        ? action.payload.firstName
        : state.userInfo.firstName;
      state.userInfo.middleName = action.payload?.middleName
        ? action.payload.middleName
        : state.userInfo.middleName;
      state.userInfo.lastName = action.payload?.lastName
        ? action.payload.lastName
        : state.userInfo.lastName;
      state.userInfo.DOB = action.payload?.DOB
        ? action.payload.DOB
        : state.userInfo.DOB;
      state.userInfo.gender = action.payload?.gender
        ? action.payload.gender
        : state.userInfo.gender;
      state.userInfo.email = action.payload?.email
        ? action.payload.email
        : state.userInfo.email;
      state.userInfo.phoneNo = action.payload?.phoneNo
        ? action.payload.phoneNo
        : state.userInfo.phoneNo;
    }
  }
});

export const { updateUserInfo } = createAccountSlice.actions;
export default createAccountSlice.reducer;
