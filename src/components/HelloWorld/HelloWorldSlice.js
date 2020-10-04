import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    multiply: (state) => {
      state.value *= 2;
    },
    divide: (state) => {
      state.value /= 2;
    },
  },
});

// export const { increment, decrement, multiply, divide } = slice.actions;

export const actions = slice.actions;

export const selectCount = (state) => state.counter.value;

export default slice.reducer;
