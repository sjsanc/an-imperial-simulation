import React from "react";
import style from "./Tooltips.module.scss";

export default function LabelTooltip(props: {
  visible: boolean;
  text: string;
}) {
  return (
    <div
      className={
        props.visible
          ? style.labelTooltip
          : [style.labelToolTip, style.hidden].join(" ")
      }>
      {props.text}
    </div>
  );
}
