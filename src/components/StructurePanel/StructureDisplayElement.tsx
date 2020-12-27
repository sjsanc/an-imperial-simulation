import { strict } from "assert";
import React from "react";
import { useDispatch } from "react-redux";
import { costCheck } from "../../tools/costCheck";
import { find } from "../../tools/utils";
import { ResType, StructureType } from "../../types";
import style from "./StructurePanel.module.scss";

export default function StructureDisplayElement(props: {
  ctx: StructureType;
  reslist: ResType[];
  handleBuildStructure: any;
}) {
  const ctx = props.ctx;
  const dispatch = useDispatch();
  const sufficientRes = costCheck(ctx.cost, props.reslist);
  return (
    <div
      className={
        ctx.amount > 0
          ? [style.structure, style.active].join(" ")
          : style.structure
      }>
      <div>
        <h1>
          <span>
            {ctx.name}
            <img
              alt={ctx.name}
              src={`${process.env.PUBLIC_URL}/usedIcons/structures/${ctx.name}.png`}></img>
          </span>
          <span className={ctx.amount < 1 ? style.greyed : undefined}>
            {ctx.amount}
          </span>
        </h1>
        <p>{ctx.desc}</p>
      </div>
      <div className={style.costblock}>
        <h2>BUILD COST</h2>
        {ctx.cost.map((cost) => (
          <div className={style.cost} key={cost.name}>
            <p>{cost.name}</p>
            <p
              className={
                cost.amount <= find(cost.name, props.reslist)!.amount
                  ? style.greened
                  : undefined
              }>
              {cost.amount}
            </p>
          </div>
        ))}
        <h2
          onClick={() => {
            props.handleBuildStructure(ctx, dispatch, props.reslist);
          }}
          className={
            sufficientRes
              ? style.constructBtnEnabled
              : style.constructBtnDisabled
          }>
          {sufficientRes ? "BUILD" : "INSUFFICIENT RES."}
        </h2>
      </div>
    </div>
  );
}
