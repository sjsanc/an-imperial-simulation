import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { getRandom } from "../helpers/storeHelpers";
import { useGameEngine } from "../hooks/useGameEngine";
import { useStore } from "../store/store";
import "../styles/global.css";
import Debugger from "./Debugger";
import EmpirePanel from "./EmpirePanel";
import MessagePanel from "./MessagePanel";
import WikiModal from "./modals/WikiModal";
import Quickview from "./Quickview";
import ResourcePanel from "./ResourcePanel";
import StructuresPanel from "./structure/StructuresPanel";
import Topbar from "./Topbar";

const panels = ["Structures", "Census", "Empire", "Research", "Military", "Allegiances", "Magic"];

const flavourMessages = ["The night is dark and full of terrors..."];

function App() {
  const [activePanel, setActivePanel] = useState<string>(panels[0]);
  const [debug, setDebug] = useState<boolean>(false);
  const { state } = useStore();
  const actions = useGameEngine();

  useEffect(() => {
    const loop = setInterval(() => {
      if (state.state.isRunning) {
        actions.tick();

        actions.performJobs();

        actions.feedPop();

        if (state.state.currentTick % 60 === 0) {
          actions.calcBirths();
        }

        if (state.state.currentTick % 120 === 0) {
          actions.postMessage({ type: "basic", body: getRandom(flavourMessages) });
        }
      }
    }, state.config.gameSpeed);
    return () => clearInterval(loop);
  }, [actions]);

  const handleSetPanel = (e: React.MouseEvent) => {
    setActivePanel(e.currentTarget.id);
  };

  const renderPanel = (activePanel: string) => {
    switch (activePanel) {
      case panels[0]:
        return <StructuresPanel />;
      case panels[2]:
        return <EmpirePanel />;
    }
  };

  return (
    <Wrapper className="App">
      <Topbar debug={debug} setDebug={setDebug} />
      <Main>
        <ResourcePanel />
        <CentrePanel>
          <div className="center-top">
            <div>
              {panels.map((item, i) => (
                <Button active={activePanel === item} key={i} id={item} onClick={handleSetPanel}>
                  {item}
                </Button>
              ))}
            </div>
            <Quickview />
          </div>
          <div className="overflow-panel">{renderPanel(activePanel)}</div>
        </CentrePanel>
        <MessagePanel />
      </Main>
      <Debugger active={debug} setActive={setDebug} />
      <WikiModal active={state.miscState.wikiOpen} />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: #f0f0f0;
  overflow: hidden;

  .increase {
    ${tw`text-green-500`}
  }

  .decrease {
    ${tw`text-red-500`}
  }

  .overflow-panel {
    height: 79vh;
    overflow-y: scroll;
    overflow-x: hidden;
    ${tw`pr-1`}

    &::-webkit-scrollbar {
      ${tw`bg-gray-100`}
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      ${tw`bg-gray-200`}
      border-radius: 5px;
    }
    &::-webkit-scrollbar-corner {
      /* background: $base1; */
    }
  }

  .center-top {
    /* ${tw`drop-shadow-md mb-2`} */
  }
`;

const Main = styled.div`
  position: absolute;
  overflow: hidden;
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
  /* ${tw`bg-gray-200`} */
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
