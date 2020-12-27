import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import EmpirePanel from "../components/EmpirePanel/EmpirePanel";

export default function EmpireContainer() {
  const { citySize, empire } = useSelector(
    (state: RootStateOrAny) => state
  ).empireSlice;

  return <EmpirePanel citySize={citySize} empireStats={empire} />;
}
