import { messageActions, selectMessages } from "../reducers/messageSlice";

import { flavourMessages } from "../data/flavourMessage";

export const emitTestMessage = (dispatch, time) => {
  dispatch(
    messageActions.createMessage({
      type: "simple",
      text: "This is a simple message",
      time: time,
    })
  );
};

export const randomFlavourMessage = (dispatch, time) => {
  dispatch(
    messageActions.createMessage({
      type: "flavour",
      text: flavourMessages[Math.floor(Math.random() * flavourMessages.length)],
      time: time,
    })
  );
};
