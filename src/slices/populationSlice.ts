import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";

export type PopulationType = { citizens: number[]; employed: number };

const initialState: PopulationType = {
  citizens: [25, 30, 35],
  employed: 0,
};

const populationSlice = createSlice({
  name: "population",
  initialState,
  reducers: {
    birth: (state, action: PayloadAction<number>) => {
      state.citizens.push(action.payload);
    },
    birthCohort: (state, action: PayloadAction<number[]>) => {
      state.citizens = state.citizens.concat(action.payload);
    },
    ageUp: (state) => {
      state.citizens = state.citizens.map((c) => c + 1);
    },
    expireNaturally: (state, action: PayloadAction<number>) => {
      state.citizens = state.citizens.filter((c) => c < action.payload);
    },
    changeEmployment: (
      state,
      action: PayloadAction<{ type: "employ" | "dismiss"; amount: number }>
    ) => {
      switch (action.payload.type) {
        case "employ":
          state.employed += action.payload.amount;
          break;
        case "dismiss":
          state.employed -= action.payload.amount;
      }
    },
  },
});

export const {
  birth,
  ageUp,
  changeEmployment,
  expireNaturally,
  birthCohort,
} = populationSlice.actions;
export default populationSlice.reducer;
