import React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import style from "./StructureQuickview.module.scss";
import { StructureType } from "../../types";
import StructureQuickviewElement from "./StructureQuickviewElement";

export default function StructureQuickview() {
  const { structures } = useSelector(
    (state: RootStateOrAny) => state
  ).structureSlice;

  return (
    <div className={style.wrapper}>
      <div className={style.subWrapper}>
        {structures.map((str: StructureType) => {
          if (str.name !== "basic") {
            if (str.built) {
              return <StructureQuickviewElement key={str.name} ctx={str} />;
            } else return null;
          } else return null;
        })}
        {structures.map((str: StructureType) => {
          if (str.name !== "basic") {
            if (!str.built && str.available) {
              return <StructureQuickviewElement key={str.name} ctx={str} />;
            } else return null;
          } else return null;
        })}
      </div>
    </div>
  );
}
