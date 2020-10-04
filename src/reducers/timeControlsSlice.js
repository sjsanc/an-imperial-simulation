import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "timeControls",
  initialState: {
    value: "play",
  },
  reducers: {
    play: (state) => {
      state.value = "play";
    },
    pause: (state) => {
      state.value = "pause";
    },
    fast: (state) => {
      state.value = "fast";
    },
  },
});

export const timeControlsActions = slice.actions;

export const selectTimeControls = (state) => state.timeControls.value;

export default slice.reducer;
