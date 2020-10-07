import React, { useState } from "react";
import style from "./MessagePanel.module.scss";

export default function MessagePanel() {
  return (
    <div className={style.messagePanel}>
      <div className={style.message}>
        <img src={`./src/assets/Icons/Pack 1A/icon_25.png`}></img>
        <p>This is a test message. Ignore it. </p>
      </div>
      <div className={style.message}>
        {/* <img src={`./src/assets/Icons/Pack 1A/icon_50.png`}></img> */}
        <p>
          This is a test message. It's much longer than the previous message
          and, arguably, not as cool. But still pretty cool.
        </p>
      </div>
      <div className={style.message}></div>
    </div>
  );
}
