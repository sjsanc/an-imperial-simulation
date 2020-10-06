import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../components/HelloWorld/HelloWorldSlice";
import timeReducer from "../reducers/timeSlice";
import timeControlsReducer from "../reducers/timeControlsSlice";
import populationReducer from "../reducers/populationSlice";
import demographicsReducer from "../reducers/demographicsSlice";
import gameDataReducer from "../reducers/gameDataSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    time: timeReducer,
    timeControls: timeControlsReducer,
    population: populationReducer,
    demographics: demographicsReducer,
    gameData: gameDataReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});
