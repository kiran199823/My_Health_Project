import { createSlice } from '@reduxjs/toolkit';

const patientDetailsSlice = createSlice({
  name: 'patientDetails',
  initialState: {
    registerPatientState: {
      loading: false,
      loaded: false,
      data: {},
    },
  },
  reducers: {
    registerPatient: (state, action) => {
      state.registerPatientState.loading = true;
      state.registerPatientState.loaded = false;
    },
    registerPatientSuccess: (state, action) => {
      state.registerPatientState.loading = false;
      state.registerPatientState.loaded = true;
    //   state.registerPatientState.data = action?.payload;
    },
  },
});

export const { registerPatient, registerPatientSuccess } =
  patientDetailsSlice.actions;
export default patientDetailsSlice.reducer;
