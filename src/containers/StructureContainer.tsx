import React from "react";
import StructurePanel from "../components/StructurePanel/StructurePanel";
import { customDispatch, ResType, StructureType } from "../types";
import { costCheck } from "../tools/costCheck";

// STRUCTURE IMPORTS
import { buildStructure } from "../slices/structureSlice";

// RES IMPORTS
import { handleAlterResource, handleCost } from "./ResourceContainer";

export const handleBuildStructure = (
  structure: StructureType,
  dispatch: customDispatch,
  resourceList: ResType[]
) => {
  if (costCheck(structure.cost, resourceList)) {
    if (structure.available) {
      if ((structure.unique && structure.amount < 1) || !structure.unique) {
        dispatch(buildStructure(structure));
        handleCost(structure.cost, resourceList, dispatch);
      }
    }
  }
};

export default function StructureContainer(props: { time: number }) {
  return (
    <>
      <StructurePanel />
    </>
  );
}
