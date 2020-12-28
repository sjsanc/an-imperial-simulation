import React from "react";
import style from "./MessagePanel.module.scss";

export default function Message(props: { msg: any }) {
  return (
    <div className={[style.message, style[props.msg.type]].join(" ")}>
      {props.msg.body}
    </div>
  );
}
