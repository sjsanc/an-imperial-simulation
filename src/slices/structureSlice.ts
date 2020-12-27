import { find } from "../tools/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StructureType } from "../types";
import { structureData } from "./../data/structureData";

type PayloadType = {
  structure: StructureType;
  changes: any;
};

const initialState = {
  structures: structureData,
};

const filteredState = (state: any, prop: any) =>
  state.filter((t: any) => t.name === prop);

const structureSlice = createSlice({
  name: "structures",
  initialState,
  reducers: {
    buildStructure: (state, action: PayloadAction<StructureType>) => {
      find(action.payload.name, state.structures).built = true;
      find(action.payload.name, state.structures).amount += 1;
    },
  },
});

export const { buildStructure } = structureSlice.actions;
export default structureSlice.reducer;
