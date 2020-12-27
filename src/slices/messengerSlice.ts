import { RootStateOrAny } from "react-redux";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { msgData } from "../data/msgData";
import store from "../store/store";

export type Msg = {
  id: number;
  type: string;
  typeFK: string | number;
};

const msgAdaptor = createEntityAdapter<Msg>({
  selectId: (msg) => msg.id,
});

const messengerSlice = createSlice({
  name: "messages",
  initialState: msgAdaptor.getInitialState(),
  reducers: {
    emitMessage: msgAdaptor.addOne,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const MsgSelector = msgAdaptor.getSelectors<RootState>(
  (state) => state.messengerSlice
);

export const { emitMessage } = messengerSlice.actions;
export default messengerSlice.reducer;
