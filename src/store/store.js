import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../components/HelloWorld/HelloWorldSlice";
import timeReducer from "../reducers/timeSlice";
import timeControlsReducer from "../reducers/timeControlsSlice";
import populationReducer from "../reducers/populationSlice";
import demographicsReducer from "../reducers/demographicsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    time: timeReducer,
    timeControls: timeControlsReducer,
    population: populationReducer,
    demographics: demographicsReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});
