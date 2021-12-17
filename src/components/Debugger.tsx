import React, { useState } from "react";
import styled from "styled-components";
import { ActionTypes, useStore } from "../store/store";

export default function Debugger() {
  const [debug, setDebug] = useState<boolean>(false);
  const { state, dispatch } = useStore();

  return (
    <Wrapper>
      {debug && (
        <div>
          <button
            onClick={() => {
              console.log(state);
            }}>
            Print State
          </button>
          <ul>
            <li>currentTick: {state.currentTick}</li>
            <li>gameLoopRunning: {state.gameLoopRunning ? "true" : "false"}</li>
            <li>wood: {state.resources[0].amount}</li>
          </ul>
        </div>
      )}
      <button
        onClick={() => {
          setDebug(!debug);
        }}>
        {debug ? "Hide" : "Show"} Debugger
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ul {
    list-style: none;
  }

  li {
    font-size: 12px;
  }

  div {
    min-height: 200px;
    width: 500px;
    background: ${({ theme: { colors } }) => colors.dark};
    border-radius: 6px;
    margin-bottom: -10px;
    padding: 15px;
    color: white;
  }

  button {
    border: none;
    padding: 15px;
    background: ${({ theme: { colors } }) => colors.dark};
    border-radius: 6px;
    color: white;

    &:hover {
      background: ${({ theme: { colors } }) => colors.grey};
      cursor: pointer;
    }
  }
`;
