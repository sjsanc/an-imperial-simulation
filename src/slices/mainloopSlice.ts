import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MainloopType = {
  time: number;
  rate: number;
  runStatus: boolean;
};

export const initialState: MainloopType = {
  time: 0,
  rate: 1000,
  runStatus: false,
};

const mainloopSlice = createSlice({
  name: "mainloop",
  initialState,
  reducers: {
    step: (state) => {
      state.time = state.time + 1;
    },
    toggleStart: (state) => {
      state.runStatus = !state.runStatus;
    },
    setRate: (state, action: PayloadAction<1000 | 500 | 250>) => {
      state.rate = action.payload;
    },
    addYear: (state) => {
      state.time = state.time + 300;
    },
    addMonth: (state) => {
      state.time = state.time + 25;
    },
  },
});

export const {
  step,
  toggleStart,
  setRate,
  addYear,
  addMonth,
} = mainloopSlice.actions;
export default mainloopSlice.reducer;
