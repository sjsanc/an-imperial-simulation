import { createSlice } from "@reduxjs/toolkit";

export const gameDataSlice = createSlice({
  name: "gameData",
  initialState: [],
  reducers: {
    initialiseGame: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export const gameDataActions = gameDataSlice.actions;

export const selectGameData = (state) => state.gameData;

export default gameDataSlice.reducer;
