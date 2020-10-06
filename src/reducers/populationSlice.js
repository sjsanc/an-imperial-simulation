import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "population",
  initialState: [],
  reducers: {
    incrementAge: (state) => {
      state.forEach((person) => {
        person.age++;
      });
    },
    initialisePop: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    birth: (state, action) => {
      state.push(action.payload);
    },
    death: (state, action) => {
      let index = action.payload;
      state = state.filter((person) => person.id !== index);
      return state;
    },
    reIndex: (state) => {
      state.forEach((person) => {
        person.id = state.indexOf(person);
      });
    },
  },
});

export const populationActions = slice.actions;

export const selectPopulation = (state) => state.population;

export default slice.reducer;
