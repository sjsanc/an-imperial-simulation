import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type EmpireStatTypes =
  | "vitality"
  | "happiness"
  | "loyalty"
  | "sanitation"
  | "fertility";

type PayloadType = {
  type: EmpireStatTypes;
  direction: "inc" | "desc";
  amount: number;
};

export type EmpireType = {
  empire: {
    vitality: number;
    happiness: number;
    loyalty: number;
    sanitation: number;
    fertility: number;
  };
};

export const initialState = {
  empire: {
    vitality: 5,
    happiness: 10,
    loyalty: 10,
    sanitation: 5,
    fertility: 2,
  },
  citySize: "hamlet",
  totalWealth: 0,
  totalPower: 0,
};

const empireSlice = createSlice({
  name: "empire",
  initialState,
  reducers: {
    alterEmpireStat: (state, action: PayloadAction<PayloadType>) => {
      switch (action.payload.direction) {
        case "inc":
          state.empire[action.payload.type] += action.payload.amount;
          break;
        case "desc":
          state.empire[action.payload.type] -= action.payload.amount;
      }
    },
  },
});

export const { alterEmpireStat } = empireSlice.actions;
export default empireSlice.reducer;

// VITALITY
// Empire citizen overall health. Used to caluclate deaths
