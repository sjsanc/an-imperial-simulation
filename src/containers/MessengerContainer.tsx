import React, { useEffect } from "react";

// REDUX IMPORTS
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { customDispatch } from "../types";

// MESSENGER IMPORTS
import MessagePanel from "../components/MessagePanel/MessagePanel";
import { emitMessage, Msg, MsgSelector } from "../slices/messengerSlice";
import store from "../store/store";
import { msgData } from "../data/msgData";

const hydrateMessages = (messages: Msg[], msgData: any) => {
  let out: any[] = [];
  messages.forEach((msg) => {
    switch (msg.type) {
      case "flavour":
        out.push(Object.assign({ body: msgData["flavour"][msg.typeFK] }, msg));
    }
  });
  return out;
};

export default function MessengerContainer(props: { time: number }) {
  const dispatch = useDispatch();
  const messages = MsgSelector.selectAll(store.getState());
  const hydratedMessages = hydrateMessages(messages, msgData);

  useEffect(() => {
    if (props.time % 50 === 0) {
      dispatch(
        emitMessage({
          id: messages.length,
          type: "flavour",
          typeFK: Math.floor(Math.random() * msgData["flavour"].length),
        })
      );
    }
  }, [props.time, dispatch, msgData["flavour"].length]);

  return <MessagePanel messages={hydratedMessages} />;
}
