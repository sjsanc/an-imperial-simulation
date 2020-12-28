import React from "react";
import style from "./Tooltips.module.scss";

export default function PopulationTooltip(props: { visible: boolean }) {
  return (
    <div
      //   style={{ top: "55px" }}
      className={
        props.visible
          ? [style.populationTooltip].join(" ")
          : [style.populationTooltip, style.hidden].join(" ")
      }>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/usedIcons/ui/people.png`}
          alt="population"
        />
        <h1>total population</h1>
      </div>
      <p>The total number of citizens in your empire.</p>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/usedIcons/ui/employed.png`}
          alt="employed"
        />
        <h1>employed</h1>
      </div>
      <p>The number of citizens employed in regular jobs.</p>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/usedIcons/ui/military.png`}
          alt="military"
        />
        <h1>military</h1>
      </div>
      <p>The number of citizens enlisted in your military.</p>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/usedIcons/ui/hero.png`}
          alt="hero"
        />
        <h1>heroes</h1>
      </div>
      <p>The number of heroic legends pledged to you.</p>
    </div>
  );
}
