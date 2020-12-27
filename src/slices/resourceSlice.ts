import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resData } from "../data/resData";
import { ResType } from "../types";

type PayloadType = {
  resname: string;
  amount: number;
};

type initialStateType = {
  resources: ResType[];
  pinlist: string[];
};
const initialState: initialStateType = {
  resources: resData,
  pinlist: [],
};

const resourceSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    increaseRes: (state, action: PayloadAction<PayloadType>) => {
      state.resources.find(
        (res) => res.name === action.payload.resname
      )!.amount += action.payload.amount;
    },
    decreaseRes: (state, action: PayloadAction<PayloadType>) => {
      state.resources.find(
        (res) => res.name === action.payload.resname
      )!.amount -= action.payload.amount;
    },
    setPinlist: (
      state,
      action: PayloadAction<{ pin: string; type: "add" | "remove" }>
    ) => {
      switch (action.payload.type) {
        case "add":
          state.pinlist = [...state.pinlist, action.payload.pin];
          break;
        case "remove":
          state.pinlist = state.pinlist.filter(
            (pin) => action.payload.pin !== pin
          );
      }
    },
  },
});

export const { increaseRes, decreaseRes, setPinlist } = resourceSlice.actions;
export default resourceSlice.reducer;
