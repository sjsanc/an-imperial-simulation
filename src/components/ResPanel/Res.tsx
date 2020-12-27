import React from "react";
import { ResType } from "../../types";
import style from "./ResPanel.module.scss";

import { setPinlist } from "../../slices/resourceSlice";

export default function Res(props: {
  ctx: ResType;
  dispatchHandler: any;
  dispatch: any;
  pinlist: string[];
}) {
  const pinned = props.pinlist.includes(props.ctx.name);

  return (
    <div
      className={style.resource}
      key={props.ctx.name}
      onClick={() => {
        props.dispatchHandler(props.ctx, props.dispatch, "inc", 5);
      }}>
      <img
        alt={props.ctx.name}
        src={`${process.env.PUBLIC_URL}/usedIcons/resources/${props.ctx.name}.png`}
      />
      <h1>
        {props.ctx.name}{" "}
        <img
          onClick={() => {
            if (pinned) {
              props.dispatch(
                setPinlist({ pin: props.ctx.name, type: "remove" })
              );
            } else {
              props.dispatch(setPinlist({ pin: props.ctx.name, type: "add" }));
            }
          }}
          className={pinned ? style.activePin : undefined}
          alt="pinIcon"
          src={`${process.env.PUBLIC_URL}/usedIcons/ui/pin.png`}></img>
      </h1>
      <p>{props.ctx.amount}</p>
    </div>
  );
}
