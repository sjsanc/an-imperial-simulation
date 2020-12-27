import React from "react";
import { EmpireType } from "../../slices/empireSlice";
import style from "./EmpirePanel.module.scss";

export default function EmpirePanel(props: {
  citySize: string;
  empireStats: EmpireType;
}) {
  return (
    <div className={style.wrapper}>
      <div className={style.empireStats}>
        <h1>imperial stats</h1>
        {Object.entries(props.empireStats).map(([key, value]) => (
          <div>
            <div>
              <h3>{key}</h3>
              <h3>{value}</h3>
            </div>
            <p>Some filler text about what this thing does etc etc etc</p>
          </div>
        ))}
      </div>
      <div className={style.cityGraphic}>
        <div>
          <img
            alt={props.citySize}
            src={`${process.env.PUBLIC_URL}/usedIcons/ui/citySizes/${props.citySize}.png`}></img>
        </div>
        <h2>CITY SIZE</h2>
        <h1>{props.citySize}</h1>
        <h2>NEXT UPGRADE</h2>
        <h3>TOWN</h3>
        <div className={style.resourceBox}></div>
        <button>UPGRADE</button>
      </div>
      <div className={style.comingSoon}>Coming soon</div>
    </div>
  );
}

// {Object.entries(props.messages).map((msg: any) => (
//     <Message msg={msg} />
//   ))}
