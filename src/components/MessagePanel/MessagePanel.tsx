import React from "react";
import style from "./MessagePanel.module.scss";

import Message from "./Message";
import { useDispatch } from "react-redux";

export default function MessagePanel(props: { messages: any }) {
  return (
    <div className={style.wrapper}>
      <div className={style.subWrapper}>
        {props.messages.map((msg: any) => {
          return <Message key={msg.id} msg={msg} />;
        })}
      </div>
    </div>
  );
}

// {Object.entries(props.messages).map((msg: any) => (
//     <Message msg={msg} />
//   ))}
