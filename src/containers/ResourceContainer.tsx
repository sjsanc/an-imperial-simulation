import React, { useState } from "react";

// REDUX IMPORTS
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { customDispatch, QuantType } from "../types";

// RES IMPORTS
import ResPanel from "../components/ResPanel/ResPanel";
import { ResType } from "../types";
import { increaseRes, decreaseRes } from "../slices/resourceSlice";
import { find } from "../tools/utils";

export const handleAlterResource = (
  res: ResType | undefined,
  dispatch: customDispatch,
  type: "inc" | "desc",
  amount: number
) => {
  if (typeof res === "undefined") throw Error("Couldn't find resource");
  else if (type === "inc")
    dispatch(increaseRes({ resname: res.name, amount: amount }));
  else if (type === "desc")
    dispatch(decreaseRes({ resname: res.name, amount: amount }));
};

type BulkAlterType = {
  res: ResType;
  amount: number;
};

export const handleCost = (
  costs: QuantType[],
  reslist: ResType[],
  dispatch: customDispatch
) => {
  costs.forEach((cost) => {
    let res = find(cost.name, reslist);
    handleAlterResource(res, dispatch, "desc", cost.amount);
  });
};

export const handleBulkAlterResource = (
  resList: BulkAlterType[],
  dispatch: customDispatch,
  type: "inc" | "desc"
) => {
  if (type === "inc") {
    resList.forEach((res) => {
      dispatch(increaseRes({ resname: res.res.name, amount: res.amount }));
    });
  }
};

export default function ResourceContainer() {
  const { resources } = useSelector(
    (state: RootStateOrAny) => state
  ).resourceSlice;

  return (
    <>
      <ResPanel resources={resources} dispatchHandler={handleAlterResource} />
    </>
  );
}
