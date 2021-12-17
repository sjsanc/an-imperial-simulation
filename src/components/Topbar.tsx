import React from "react";
import styled from "styled-components";
import { getDays, getYears } from "../helpers/formatTime";
import { useStore } from "../store/store";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlay, FaPause } from "react-icons/fa";
import useTimeActions from "../actions/useTimeActions";

export default function Topbar() {
  const { state } = useStore();
  const { play, pause } = useTimeActions();
  const currentYear = getYears(state.currentTick, state.gameConfig.yearLength);
  const currentDay = getDays(state.currentTick, state.gameConfig.yearLength);

  const setPlayPause = (e: React.MouseEvent) => {
    state.gameLoopRunning ? pause() : play();
  };

  return (
    <Wrapper>
      <div>
        <h1>AN IMPERIAL SIMULATION</h1>
        <Button>About</Button>
        <Button>Wiki</Button>
        <Button>Credits</Button>
      </div>
      <div>
        <PopIndicator>
          <h3>
            POP: {state.population.total}/{state.population.workers}
          </h3>
        </PopIndicator>
        <TimeControls>
          <div className="playPause" onClick={setPlayPause}>
            {state.gameLoopRunning ? <FaPause /> : <FaPlay />}
          </div>
          <CircularProgressbar
            className="progress"
            maxValue={state.gameConfig.yearLength}
            value={currentDay}
            strokeWidth={10}
            text={currentYear.toString()}
            styles={{
              path: {
                stroke: "white",
                strokeLinecap: "butt",
              },
              trail: {
                stroke: "#1d1d1d",
              },
              text: {
                fill: "white",
                fontSize: "30px",
              },
            }}
          />
        </TimeControls>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${({ theme: { colors } }) => colors.dark};
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;

  * {
    margin-right: 7px;
  }

  div {
    display: flex;
  }
`;

const Button = styled.button`
  color: white;
  background: ${({ theme: { colors } }) => colors.dark};
  border: none;
  border-radius: 3px;
  padding: 10px 16px;
  font-weight: 500;
  font-size: 15px;

  &:hover {
    background: ${({ theme: { colors } }) => colors.grey};
    cursor: pointer;
  }
`;

const TimeControls = styled.div`
  margin: 0;
  .progress {
    width: unset;
    height: 40px;
  }

  .playPause {
    display: flex;
    margin: 0 15px 0 0;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
      display: block;
      margin: 0 auto;
    }

    &:hover {
      color: gray;
      transition: 0.2s ease-in-out;
    }
  }
  h2 {
    margin-right: 15px;
    display: flex;
    align-items: center;
  }
  text {
    font-family: "Bebas Neue", sans-serif;
  }
`;

const PopIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
