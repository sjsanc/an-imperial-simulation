import { createSlice } from "@reduxjs/toolkit";

export const demographicsSlice = createSlice({
  name: "demographics",
  initialState: {},
  reducers: {
    updateDemographics: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export const demographicsActions = demographicsSlice.actions;

export const selectDemographics = (state) => state.demographics;

export default demographicsSlice.reducer;
