import React, { useEffect, useState } from "react";
import "./App.scss";

import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { addMonth, step } from "./slices/mainloopSlice";

// COMPONENTS
import Topbar from "./components/Topbar";
import PopulationContainer from "./containers/PopulationContainer";
import ResourceContainer, {
  handleAlterResource,
} from "./containers/ResourceContainer";
import MessengerContainer from "./containers/MessengerContainer";
import CentrePanel from "./components/CentrePanel";
import Footer from "./components/Footer/Footer";

import StructureQuickview from "./components/StructureQuickview/StructureQuickview";
import { alterEmpireStat } from "./slices/empireSlice";

import { ResSelector, updateResearch } from "./slices/researchSlice";
import store from "./store/store";
import { find } from "./tools/utils";

function App() {
  const dispatch = useDispatch();
  const [time, setTime] = useState<number>(0);

  const { runStatus, rate } = useSelector(
    (state: RootStateOrAny) => state
  ).mainloopSlice;

  const { resources } = useSelector(
    (state: RootStateOrAny) => state
  ).resourceSlice;

  const researchRes = find("research", resources);

  const { empire } = useSelector((state: RootStateOrAny) => state).empireSlice;

  useEffect(() => {
    const loop = setInterval(() => {
      if (runStatus) {
        setTime(time + 1);
        console.log(time);
      }
    }, rate);

    return () => clearInterval(loop);
  }, [runStatus, rate, time]);

  return (
    <div className="App">
      <Topbar time={time} />
      <CentrePanel time={time} />
      <PopulationContainer time={time} />
      <ResourceContainer />
      <MessengerContainer time={time} />
      <StructureQuickview />
      <Footer />

      <div className="debug">
        <p>time: {time}</p>
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
          onClick={() =>
            handleAlterResource(researchRes, dispatch, "inc", 1000)
          }>
          1000Research
        </button>
      </div>
    </div>
  );
}

export default App;
