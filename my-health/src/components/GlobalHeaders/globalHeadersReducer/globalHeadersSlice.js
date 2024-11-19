import { createSlice } from '@reduxjs/toolkit';

const globalHeadersSlice = createSlice({
  name: 'globalHeaders',
  initialState: {
    value: 1
  },
  reducers: {
    increment: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment } = globalHeadersSlice.actions;
export default globalHeadersSlice.reducer;
