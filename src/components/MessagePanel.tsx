import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { Effect } from "../classes/Effect";
import { padArray } from "../helpers/displayHelpers";
import { useStore } from "../store/store";

export default function MessagePanel() {
  const { state } = useStore();

  return (
    <Wrapper>
      <div className="global-effects">
        <label>STATUSES & EFFECTS</label>
        <div>
          {padArray(
            state.data.statuses.filter((s) => s.isActive),
            12
          ).map((eff: Effect | "x", i) => (
            <div key={i}>{eff !== "x" && "X"}</div>
          ))}
        </div>
      </div>
      <div className="messages">
        <label>Messages</label>
        <div>
          {state.state.messages.map((msg, i) => (
            <Message key={i} type={msg.type} className="message" id={msg.tick.toString()}>
              <img alt={"icon"} src={`/assets/icons/ICON_791.png`} />
              <p>{msg.body}</p>
            </Message>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 250px;
  ${tw`p-1`}
  height: 100%;
  background: white;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  position: absolute;
  right: 0;
  top: 0;

  label {
    ${tw`text-gray-500 font-medium uppercase flex mb-1`}
    font-size: 9px;
  }

  .messages {
    > div {
      ${tw`flex flex-col`}
    }
  }

  .global-effects {
    ${tw`mb-2`}
    > div {
      ${tw`grid w-full gap-1`}
      grid-template-columns: repeat(6, 1fr);

      > div {
        aspect-ratio: 1;
        ${tw`bg-gray-200 rounded`}
      }
    }
  }
`;

const Message = styled.div<{ type }>`
  min-height: 10px;
  ${tw`w-full rounded bg-gray-200 p-1`}

  ${({ type }) =>
    type === "warning" &&
    css`
      border: 1px solid #ffca51;
    `}

  p {
    font-size: 10px;
  }

  img {
    height: 12px;
    width: 12px;
    float: left;
    ${tw`mr-1`}/* border-radius: 50%; */
  }
`;
