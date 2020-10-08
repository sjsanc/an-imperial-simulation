import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const example = {
  type: "simple",
  text: "This is a simple message!",
  timeStamp: "0:35",
};

export const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    createMessage: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const messageActions = messageSlice.actions;

export const selectMessages = (state) => state.messages;

export default messageSlice.reducer;
