import React from "react";
import style from "./Debugger.module.scss";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { handleAlterResource } from "../../containers/ResourceContainer";
import { alterEmpireStat } from "../../slices/empireSlice";
import { ResSelector, updateResearch } from "../../slices/researchSlice";
import store from "../../store/store";
import { find } from "../../tools/utils";
import { resData } from "../../data/resData";

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
        onClick={() =>
          dispatch(
            alterEmpireStat({
              type: "fertility",
              direction: "inc",
              amount: 3,
            })
          )
        }>
        VITALITY
      </button>
      <button
        onClick={() => {
          let res = ResSelector.selectAll(store.getState());
          console.log(res);
        }}>
        GetEnt
      </button>
      <button
        onClick={() =>
          dispatch(
            updateResearch({
              id: "science",
              changes: { complete: true },
            })
          )
        }>
        GetRes
      </button>
      <button
        onClick={() => handleAlterResource(researchRes, dispatch, "inc", 1000)}>
        1000Research
      </button>
    </div>
  );
}
