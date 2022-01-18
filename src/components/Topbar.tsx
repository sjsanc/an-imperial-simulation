import React from "react";
import styled from "styled-components";
import { getDays, getYears, getMonth } from "../helpers/formatTime";
import { useStore } from "../store/store";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlay, FaPause, FaFastForward } from "react-icons/fa";
import { Menu } from "react-feather";
import { useGameEngine } from "../hooks/useGameEngine";
import tw from "twin.macro";
import { Job } from "../classes/Job";
import MediaQuery from "react-responsive";

export default function Topbar({ debug, setDebug }: { debug: boolean; setDebug: any }) {
  const { state } = useStore();
  const actions = useGameEngine();
  const currentYear = getYears(state.state.currentTick, state.config.yearLength) + 1;
  const currentDay = getDays(state.state.currentTick, state.config.yearLength);
  const currentMonth = getMonth(state.state.currentTick, state.config.yearLength);

  return (
    <Wrapper>
      <div className="title">
        <h1>AN IMPERIAL SIMULATION</h1>
        <MediaQuery minWidth={1200}>
          <button>About</button>
          <button
            onClick={() => {
              actions.flip(`miscState.wikiOpen`, !state.miscState.wikiOpen);
            }}>
            Wiki
          </button>
          <button>Credits</button>
          <button onClick={() => setDebug(!debug)}>Debug</button>
        </MediaQuery>
        <MediaQuery maxWidth={1200}>
          <div className="menu-burger">
            <Menu />
          </div>
        </MediaQuery>
      </div>

      <div className="float-right">
        <div className="population">
          <div>
            <label>Total</label>
            <h3>{state.data.census.length}</h3>
          </div>
          <div>
            <label>Workers</label>
            <h3>{state.getCountByPropValue("census", "role", "worker")}</h3>
          </div>
          <div>
            <label>Employed</label>
            <h3>{state.getEmployedCount()}</h3>
          </div>
          <div>
            <label>Soldiers</label>
            <h3>0</h3>
          </div>
          <div>
            <label>Heroes</label>
            <h3>0</h3>
          </div>
        </div>

        <div className="date-display">
          <div>
            <label>Month</label>
            <h3>{getMonth(state.state.currentTick, state.config.yearLength)}</h3>
          </div>
          <div>
            <label>Year</label>
            <h3>{currentYear}</h3>
          </div>
          <div>
            <label>Day</label>
            <h3>{currentDay}</h3>
          </div>
          <div>
            <CircularProgressbar
              className="progress"
              maxValue={state.config.yearLength}
              value={currentDay}
              strokeWidth={10}
              styles={{
                path: {
                  stroke: "white",
                  strokeLinecap: "butt",
                },
                trail: {
                  stroke: "black",
                },
              }}
            />
          </div>
        </div>

        <div className="time-controls">
          <div className={!state.state.isRunning ? "active" : ""} onClick={() => actions.pause()}>
            <FaPause />
          </div>
          <div className={state.state.isRunning ? "active" : ""} onClick={() => actions.play()}>
            <FaPlay />
          </div>
          {/* <div>
            <FaFastForward />
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${({ theme: { colors } }) => colors.dark};
  height: 60px;
  ${tw`flex items-center justify-between text-white`}

  label {
    ${tw`text-gray-300 font-medium uppercase flex`}
    font-size: 9px;
  }

  .title {
    ${tw`p-2`}
    h1 {
      ${tw`mr-2`}
    }
    button {
      background: ${({ theme: { colors } }) => colors.dark};
      ${tw`border-none p-2 rounded font-medium text-white cursor-pointer`}
      &:hover {
        background: ${({ theme: { colors } }) => colors.grey};
      }
    }
  }

  .menu-burger {
    ${tw`flex items-center`}
  }

  .float-right {
    ${tw`flex`}
  }

  .time-controls {
    background: #303030;
    ${tw`flex items-center rounded my-1 mr-2`}
    div {
      ${tw`rounded p-3 cursor-pointer mx-2`}
    }
    svg {
      ${tw`text-gray-500`}
    }
    .active svg {
      ${tw`text-white`}
    }
  }

  .date-display {
    ${tw`flex items-end my-1 mr-2 p-1`}
    div {
      ${tw`flex flex-col mx-3`}
    }
    h3 {
      ${tw`m-0`}
    }
    svg {
      margin-bottom: 2px;
      max-height: 35px;
    }
  }

  .population {
    ${tw`flex items-end my-1 mr-2 p-1 rounded cursor-pointer`}
    &:hover {
      ${tw``}
      background: #272727;
    }
    div {
      ${tw`flex flex-col mx-3`}
    }
    h3 {
      ${tw`m-0`}
    }
  }

  div {
    display: flex;
  }
`;
