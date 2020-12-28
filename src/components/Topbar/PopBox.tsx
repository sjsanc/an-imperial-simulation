import React, { useState } from "react";
import PopulationTooltip from "../Tooltips/PopulationTooltip";
import style from "./Topbar.module.scss";

export default function PopBox(props: {
  citizens: number[];
  employed: number;
}) {
  const [tooltip, showTooltip] = useState<boolean>(false);
  const handleShowTooltip = () => {
    showTooltip(!tooltip);
  };

  return (
    <div
      className={style.popBox}
      onMouseEnter={handleShowTooltip}
      onMouseLeave={handleShowTooltip}>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/usedIcons/ui/people.png`}
          alt="population"
        />
        <h2>{props.citizens.length}</h2>
      </div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/usedIcons/ui/employed.png`}
          alt="employed"
        />
        <h2>{props.employed}</h2>
      </div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/usedIcons/ui/military.png`}
          alt="military"
        />
        <h2>0</h2>
      </div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/usedIcons/ui/hero.png`}
          alt="heroes"
        />
        <h2>0</h2>
        <PopulationTooltip visible={tooltip} />
      </div>
    </div>
  );
}
