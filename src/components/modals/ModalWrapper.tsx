import _ from "lodash";
import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { useGameEngine } from "../../hooks/useGameEngine";
import { useViews, ViewController } from "../../hooks/useViews";
import { useStore } from "../../store/store";
import ViewIcon from "../common/ViewIcon";

export default function ModalWrapper({
  children,
  title,
  views,
}: {
  children: React.ReactNode;
  title: string;
  views?: ViewController;
}) {
  const { state } = useStore();
  const actions = useGameEngine();

  return (
    <Wrapper open={state.miscState[`${title}Open`]}>
      <div className="header">
        <h1>{title}</h1>
        {views && (
          <div className="views">
            {views[2].map((v, i) => (
              <ViewIcon
                key={i}
                onClick={views[1]}
                active={v === views[0]}
                data-view={v}
                bg={"#303030"}>
                {_.startCase(v)}
              </ViewIcon>
            ))}
          </div>
        )}
        <button
          onClick={() => {
            actions.flip(`miscState[${title}Open]`, false);
          }}>
          ✖
        </button>
      </div>
      <div className="body">{children}</div>
    </Wrapper>
  );
}
const Wrapper = styled.div<{ open }>`
  left: 0;
  right: 0;
  top: 100px;
  height: 600px;
  width: 95%;
  max-width: 1000px;
  background: ${({ theme: { colors } }) => colors.dark};
  border-radius: 15px;
  ${tw`pointer-events-none text-white absolute mx-auto opacity-0 p-3`}

  .body {
    ${tw`mt-2`}
  }

  .header {
    ${tw`flex items-center justify-between`}

    button {
      ${tw`text-white border-0 p-3 cursor-pointer`}
      background: transparent;
    }
    .views {
      ${tw`flex`}
      button {
        ${tw`mr-2`}
        .active {
          background: red;
        }
      }
    }
    .view-icon {
      ${tw`mr-2 p-2 rounded`}
      cursor: pointer;
    }
  }

  ${({ open }) =>
    open &&
    css`
      pointer-events: unset;
      top: 90px;
      transition: 0.1s ease-in;
      opacity: 100;
    `};
`;
