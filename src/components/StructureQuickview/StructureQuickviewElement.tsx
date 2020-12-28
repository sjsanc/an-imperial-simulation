import React, { useState } from "react";
import style from "./StructureQuickview.module.scss";
import { StructureType } from "../../types";
import { useDispatch } from "react-redux";
import LabelTooltip from "../Tooltips/LabelTooltip";

export default function StructureQuickviewElement(props: {
  ctx: StructureType;
}) {
  const dispatch = useDispatch();
  const ctx = props.ctx;
  return (
    <div className={style.structure}>
      <img
        className={
          ctx.built
            ? undefined
            : ctx.available && !ctx.built
            ? style.available
            : undefined
        }
        alt={ctx.name}
        src={`${process.env.PUBLIC_URL}/usedIcons/structures/${ctx.name}.png`}></img>
      {ctx.amount > 0 && (
        <div className={style.strAmountIndicator}>{ctx.amount}</div>
      )}
    </div>
  );
}
