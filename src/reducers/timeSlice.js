import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "time",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementDay: (state) => {
      // base game rate 1 tick = 1 sec;
      state.value += 1;
    },
  },
});

export const timeActions = slice.actions;

export const selectTime = (state) => state.time.value;

export default slice.reducer;
