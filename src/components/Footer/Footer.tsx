import React, { useRef } from "react";
import style from "./Footer.module.scss";
import FPSMeter from "../../tools/FPSmeter";
import { K } from "../../constants";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <p>AN IMPERIAL SIMULATION</p>
      <a href="https://github.com/sjsanc">by sjsanc</a>
      <p>
        VERSION: {K.VERSION}-{K.VERSION_TITLE}
      </p>
      <div className="fpsMeter">
        <FPSMeter />
      </div>
    </footer>
  );
}
