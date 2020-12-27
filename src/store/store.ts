import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import countSlice from "../slices/count";
import mainloopSlice from "../slices/mainloopSlice";
import populationSlice from "../slices/populationSlice";
import empireSlice from "../slices/empireSlice";
import jobsSlice from "../slices/jobsSlice";
import resourceSlice from "../slices/resourceSlice";
import messengerSlice from "../slices/messengerSlice";
import structureSlice from "../slices/structureSlice";
import researchSlice from "../slices/researchSlice";

const reducer = combineReducers({
  countSlice,
  mainloopSlice,
  populationSlice,
  empireSlice,
  jobsSlice,
  resourceSlice,
  messengerSlice,
  structureSlice,
  researchSlice,
});

const store = configureStore({
  reducer,
});

export default store;
