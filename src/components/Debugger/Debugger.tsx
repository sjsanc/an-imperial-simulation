import React from "react";
import style from "./Debugger.module.scss";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { handleAlterResource } from "../../containers/ResourceContainer";
import { alterEmpireStat } from "../../slices/empireSlice";
import { ResSelector, updateResearch } from "../../slices/researchSlice";
import store from "../../store/store";
import { find } from "../../tools/utils";
import { resData } from "../../data/resData";
import { birth } from "../../slices/populationSlice";

export default function Debugger(props: { time: number; visible: boolean }) {
  const dispatch = useDispatch();
  const time = props.time;
  const { resources } = useSelector(
    (state: RootStateOrAny) => state
  ).resourceSlice;
  const researchRes = find("research", resources);

  return (
    <div
      className={style.wrapper}
      style={props.visible ? { display: "inline" } : { display: "none" }}>
      <h1>Debugger -- time: {time}</h1>
      <button
        onClick={() => handleAlterResource(researchRes, dispatch, "inc", 1000)}>
        Give 1K Research
      </button>
      <button
        onClick={() => {
          dispatch(birth(55));
        }}>
        Add old person (55)
      </button>
    </div>
  );
}
