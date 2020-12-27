import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ResearchPanel from "./ResearchPanel";
import { researchData } from "../../data/researchData";
import {
  addResearch,
  Research,
  ResSelector,
  updateResearch,
} from "../../slices/researchSlice";
import store from "../../store/store";
import { customDispatch, ResType } from "../../types";
import { handleAlterResource } from "../../containers/ResourceContainer";

const handleCompleteResearch = (
  research: Research,
  dispatch: customDispatch,
  resResource: ResType
) => {
  console.log(research.name);
  if (resResource.amount >= research.cost) {
    handleAlterResource(resResource, dispatch, "desc", research.cost);
    dispatch(
      updateResearch({ id: research.name, changes: { complete: true } })
    );
  }
};

export default function ResearchContainer() {
  const dispatch = useDispatch();
  const research = ResSelector.selectAll(store.getState());

  useEffect(() => {
    dispatch(addResearch(researchData));
  }, [dispatch]);

  return (
    <ResearchPanel
      research={research}
      handleCompleteResearch={handleCompleteResearch}
    />
  );
}
