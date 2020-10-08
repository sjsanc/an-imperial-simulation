import React, { useState, useEffect } from "react";
import style from "./MessagePanel.module.scss";
import { useSelector } from "react-redux";
import { selectMessages } from "../../reducers/messageSlice";

export default function MessagePanel() {
  const [messages, setMessages] = useState([]);
  const inbox = useSelector(selectMessages);

  useEffect(() => {
    setMessages(inbox);
  }, [inbox]);

  return (
    <div className={style.messagePanel}>
      {messages.map((message, i) => {
        return (
          <div className={style.message} key={`message_${i}`}>
            <img src={`./src/assets/Icons/Pack 1A/icon_25.png`}></img>
            <p>{message.text}</p>
          </div>
        );
      })}
    </div>
  );
}
