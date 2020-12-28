import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import store from "../store/store";

export type Research = {
  name: string;
  desc: string;
  complete: boolean;
  prereqs: string[];
  cost: number;
};

const researchAdaptor = createEntityAdapter<Research>({
  selectId: (res) => res.name,
});

const researchSlice = createSlice({
  name: "research",
  initialState: researchAdaptor.getInitialState(),
  reducers: {
    addResearch: researchAdaptor.addMany,
    updateResearch: researchAdaptor.updateOne,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const ResSelector = researchAdaptor.getSelectors<RootState>(
  (state) => state.researchSlice
);

export const { addResearch, updateResearch } = researchSlice.actions;
export default researchSlice.reducer;
