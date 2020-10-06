import React, { useState, useEffect } from "react";
import style from "./Infobox.module.scss";

export default function Infobox({ infobox }) {
  const [currentTooltip, setCurrentTooltip] = useState();

  useEffect(() => {
    setCurrentTooltip(infobox);
  }, [infobox]);

  return (
    <div className={style.infobox}>
      <div>{currentTooltip}</div>
    </div>
  );
}
