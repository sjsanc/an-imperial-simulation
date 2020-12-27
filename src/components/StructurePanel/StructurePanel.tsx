import React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { StructureType } from "../../types";
import { buildStructure } from "../../slices/structureSlice";
import style from "./StructurePanel.module.scss";
import StructureDisplayElement from "./StructureDisplayElement";
import { handleBuildStructure } from "../../containers/StructureContainer";

export default function StructurePanel() {
  const { structures } = useSelector(
    (state: RootStateOrAny) => state
  ).structureSlice;
  const { resources } = useSelector(
    (state: RootStateOrAny) => state
  ).resourceSlice;
  const dispatch = useDispatch();

  return (
    <div className={style.wrapper}>
      {structures.map((str: StructureType) => {
        if (str.name !== "basic") {
          return (
            <StructureDisplayElement
              key={str.name}
              ctx={str}
              reslist={resources}
              handleBuildStructure={handleBuildStructure}
            />
          );
        } else return null;
      })}
    </div>
  );
}
