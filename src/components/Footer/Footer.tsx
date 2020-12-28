import React, { useRef } from "react";
import style from "./Footer.module.scss";
import FPSMeter from "../../tools/FPSmeter";
import { K } from "../../constants";

export default function Footer(props: { showDebugger: any }) {
  return (
    <footer className={style.footer}>
      <p>AN IMPERIAL SIMULATION</p>
      <a href="https://github.com/sjsanc">by sjsanc</a>
      <p>
        VERSION: {K.VERSION}-{K.VERSION_TITLE}
      </p>

      <button onClick={() => props.showDebugger()}>show debugger</button>
      <div className="fpsMeter">
        <FPSMeter />
      </div>
    </footer>
  );
}
