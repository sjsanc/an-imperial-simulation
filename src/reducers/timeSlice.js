import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "time",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementTick: (state) => {
      // base game rate 1 tick = 1 sec;
      state.value += 1;
    },
    incrementDay: (state) => {
      // 1 day per 4 seconds
      state.value += 1 * 4;
    },
    incrementMonth: (state) => {
      // 30 days per 1 month
      state.value += 1 * 4 * 30;
    },
    incrementYear: (state) => {
      // 360 days per 1 year
      state.value += 1 * 4 * 360;
    },
    incrementAge: (state) => {
      // 500 years to an Age
      state.value += 1 * 4 * 360 * 500;
    },
  },
});

export const timeActions = slice.actions;

export const selectTime = (state) => state.time.value;

export default slice.reducer;
