import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { name: "place_holder_name", age: 18, vitality: 10, job: "farmer" },
  { name: "place_holder_name", age: 22, vitality: 3, job: "farmer" },
  { name: "place_holder_name", age: 5, vitality: 4, job: "farmer" },
  { name: "place_holder_name", age: 44, vitality: 10, job: "farmer" },
  { name: "place_holder_name", age: 33, vitality: 5, job: "farmer" },
  { name: "place_holder_name", age: 34, vitality: 10, job: "farmer" },
  { name: "place_holder_name", age: 75, vitality: 10, job: "farmer" },
];

export const slice = createSlice({
  name: "population",
  initialState: initialState,
  reducers: {
    incrementAge: (state) => {
      state.forEach((person) => {
        person.age++;
      });
    },
    birth: (state, action) => {
      state.push(action.payload);
    },
    // death: (state, action) => {
    //   let index = action.payload;
    //   state.slice()
    // }
  },
});

export const populationActions = slice.actions;

export const selectPopulation = (state) => state.population;

export default slice.reducer;
