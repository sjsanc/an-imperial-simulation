import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useJobActions from "../actions/useJobActions";
import useTimeActions from "../actions/useTimeActions";
import { useStore } from "../store/store";
import "../styles/global.css";
import Debugger from "./Debugger";
import MessagePanel from "./MessagePanel";
import ResourcePanel from "./ResourcePanel";
import StructuresPanel from "./StructuresPanel";
import Topbar from "./Topbar";

const panels = ["Structures", "Research"];

function App() {
  const [activePanel, setActivePanel] = useState<string>(panels[0]);
  const { state } = useStore();
  const { tick } = useTimeActions();
  const { performActiveJobs } = useJobActions();

  // useEffect(() => {
  //   const loop = setInterval(() => {
  //     if (state.gameLoopRunning) {
  //       tick();
  //       performActiveJobs();
  //     }
  //   }, state.gameSpeed);
  //   return () => clearInterval(loop);
  // }, [state.gameLoopRunning]);

  const handleSetPanel = (e: React.MouseEvent) => {
    setActivePanel(e.currentTarget.id);
  };

  const renderPanel = (activePanel: string) => {
    switch (activePanel) {
      case panels[0]:
        return <StructuresPanel />;
    }
  };

  return (
    <Wrapper className="App">
      {/* <Topbar />
      <Main>
        <ResourcePanel />
        <CentrePanel>
          <div>
            {panels.map((item, i) => (
              <Button active={activePanel === item} key={i} id={item} onClick={handleSetPanel}>
                {item}
              </Button>
            ))}
          </div>
          <div>{renderPanel(activePanel)}</div>
        </CentrePanel>
        <MessagePanel />
      </Main>
      <Debugger /> */}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: #f0f0f0;
`;

const Main = styled.div`
  position: absolute;
  top: 62px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const CentrePanel = styled.div`
  position: absolute;
  left: 250px;
  padding: 8px;
  top: 0px;
  right: 250px;
  bottom: 0;
`;

const Button = styled.button<{ active: boolean }>`
  border: 0;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 16px;
  color: #161616;
  cursor: pointer;
  border-radius: 3px;
  margin-right: 6px;
  margin-bottom: 6px;
  background: ${(p) => (p.active ? p.theme.colors.lgray : "#f0f0f0")};

  &:hover {
    background: ${({ theme: { colors } }) => colors.lgray};
  }
`;
