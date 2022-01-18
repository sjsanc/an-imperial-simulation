import { flip } from "lodash";
import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { useGameEngine } from "../../hooks/useGameEngine";
import { useStore } from "../../store/store";

export default function WikiModal({ active }: { active: boolean }) {
  const { state } = useStore();
  const actions = useGameEngine();

  return (
    <Wrapper active={active}>
      <div className="header">
        <h1>Wiki</h1>
        <button
          onClick={() => {
            actions.flip(`miscState.wikiOpen`, false);
          }}>
          ✖
        </button>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div<{ active }>`
  opacity: 0;

  left: 0;
  right: 0;
  margin: 0 auto;
  top: 100px;

  height: 600px;
  width: 95%;
  max-width: 1000px;
  position: absolute;
  background: ${({ theme: { colors } }) => colors.dark};

  border-radius: 15px;

  color: white;

  button {
    color: white;
    background: transparent;
    border: none;
    padding: 10px;
    cursor: pointer;
  }

  ${tw`p-3`}

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ${({ active }) =>
    active &&
    css`
      top: 90px;
      transition: 0.1s ease-in;
      opacity: 100;
    `};
`;
