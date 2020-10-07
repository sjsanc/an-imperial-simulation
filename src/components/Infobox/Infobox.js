import React, { useState, useEffect } from "react";
import style from "./Infobox.module.scss";

export default function Infobox({ infobox }) {
  const [currentTooltip, setCurrentTooltip] = useState({});

  useEffect(() => {
    setCurrentTooltip(infobox);
  }, [infobox]);

  return (
    <div className={style.infobox}>
      {currentTooltip && (
        <>
          <img
            src={`./src/assets/Icons/Pack 1A/icon_${currentTooltip.icon}.png`}
          ></img>
          <div>{currentTooltip.type}</div>
          <div>{currentTooltip.name}</div>
          <div>{currentTooltip.desc}</div>
        </>
      )}
    </div>
  );
}
