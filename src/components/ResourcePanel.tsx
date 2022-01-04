import React, { useState } from "react";
import styled from "styled-components";
import { Grid, List } from "react-feather";
import tw from "twin.macro";
import { Resource } from "../classes/Resource";
import { useGameEngine } from "../hooks/useGameEngine";
import { useStore } from "../store/store";
import Tippy from "@tippyjs/react/headless";
import ResourceTooltip from "./tooltips/ResourceTooltip";
import { sortArray } from "../helpers/storeHelpers";

export default function ResourcePanel() {
  const { state, dispatch } = useStore();
  const actions = useGameEngine();

  return (
    <Wrapper>
      <div className="header">
        <h3>Resources</h3>
        <div className="view-icons">
          <div>
            <List size="18px" />
          </div>
          <div>
            <Grid size="18px" />
          </div>
        </div>
      </div>
      <div>
        {sortArray(state.data.resources, "category").map((type, i) => (
          <div key={i} className="resource-wrapper">
            <label>{type[0]}</label>
            <div className="resource-grid">
              {type[1].map((res: Resource, i: number) => (
                <Tippy
                  key={i}
                  placement="bottom"
                  render={(attrs) => <ResourceTooltip {...attrs} res={res} />}>
                  <div className="resource">
                    <img src={`/assets/icons/ICON_${res.iconPath}.png`} />
                    <div>{res.amount}</div>
                  </div>
                </Tippy>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs({
  className: "p-4",
})`
  & {
    width: 250px;
    padding: 6px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
      0px 1px 3px 0px rgb(0 0 0 / 12%);
    ${tw`p-1 bg-white h-full`}
    .header {
      ${tw`flex justify-between items-center mb-1`}
    }
    .view-icons {
      ${tw`flex items-center`}

      div {
        ${tw`ml-1 p-1 rounded cursor-pointer flex items-center`}

        &:hover {
          ${tw`bg-gray-200`}
        }
      }
    }
    .resource-wrapper {
      label {
        ${tw`flex text-gray-500 font-medium uppercase flex mb-1`}
        font-size: 9px;
      }
    }
    .resource-grid {
      ${tw`grid grid-cols-6 gap-1 mb-2`}
    }
    .resource {
      aspect-ratio: 1;
      ${tw`w-full relative rounded bg-gray-200 flex items-center justify-center pr-1`};
      img {
        width: 16px;
        height: 16px;
      }
      div {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 9px;
        padding: 1px 3px;
        ${tw`bg-gray-600 text-white rounded`}
      }
      &:hover {
        ${tw`bg-gray-300 cursor-pointer`}
      }
    }
  }
`;
