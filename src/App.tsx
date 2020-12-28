import React, { useEffect, useState } from "react";
import "./App.scss";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { addMonth, step } from "./slices/mainloopSlice";
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
import Debugger from "./components/Debugger/Debugger";

function App() {
  const dispatch = useDispatch();
  const [time, setTime] = useState<number>(0);
  const [debug, setDebug] = useState<boolean>(false);

  const showDebugger = () => {
    setDebug(!debug);
  };

  const { runStatus, rate } = useSelector(
    (state: RootStateOrAny) => state
  ).mainloopSlice;

  const { resources } = useSelector(
    (state: RootStateOrAny) => state
  ).resourceSlice;

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
      <CentrePanel paused={runStatus} time={time} />
      <PopulationContainer time={time} />
      <ResourceContainer />
      <MessengerContainer time={time} />
      <StructureQuickview />
      <Footer showDebugger={showDebugger} />
      <Debugger visible={debug} time={time} />
    </div>
  );
}

export default App;
