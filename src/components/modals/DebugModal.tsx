import _ from "lodash";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { sortArray } from "../../helpers/storeHelpers";
import { useGameEngine } from "../../hooks/useGameEngine";
import { useViews } from "../../hooks/useViews";
import { ActionTypes, useStore } from "../../store/store";
import GameIcon from "../common/GameIcon";
import ViewIcon from "../common/ViewIcon";
import ModalWrapper from "./ModalWrapper";

export default function DebugModal() {
  const { state, dispatch } = useStore();
  const [view, setViews, views] = useViews(["store", "actions"]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const actions = [
    {
      name: "Console log state",
      func: () => console.log(state),
    },
    {
      name: "Add 100x to all Res",
      func: () => {
        state.data.resources.forEach((res, i) => {
          dispatch({
            type: ActionTypes.INCREASE_BY,
            payload: {
              target: `data.resources.${i}.amount`,
              value: 100,
              message: "DEBUG: added 100 to all resources.",
            },
          });
        });
      },
    },
  ];

  const filterItems = () => {
    return sortArray(_.flatten(Array.from(_.values(state.data))), "type");
  };

  return (
    <Wrapper>
      <ModalWrapper title="debug" views={[view, setViews, views]}>
        {view === views[0] && (
          <div className="store-wrapper">
            <div className="store-display">
              {filterItems().map((type, i) => (
                <div key={i} className="type-wrapper">
                  <label>{type[0]}</label>
                  <div className="grid">
                    {type[1].map((item: any, i) => (
                      <GameIcon itemData={item} key={i} onClick={() => setSelectedItem(item)}>
                        YO
                      </GameIcon>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="item-state-display">
              {selectedItem && (
                <div>
                  <h3>{selectedItem.name}</h3>
                  <div className="selected-item-grid">
                    {Object.entries(selectedItem).map(([k, v], i) => (
                      <div>
                        <span>{k}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {view === views[1] && (
          <div className="actions">
            {actions.map((a, i) => (
              <button key={i} onClick={a.func}>
                {a.name}
              </button>
            ))}
          </div>
        )}
      </ModalWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  button {
    ${tw`p-2 bg-gray-300 border-0 rounded mr-2`}
  }

  label {
    ${tw`flex text-gray-500 font-medium uppercase flex mb-1`}
    font-size: 9px;
  }

  .store-wrapper {
    ${tw`grid gap-2`}
    grid-template-columns: 1fr 1fr;
  }

  .store-display {
    ${tw`flex flex-col`}
  }

  .type-wrapper {
    ${tw`mb-2`}
  }

  .grid {
    ${tw`grid gap-1`}
    grid-template-columns: repeat(12, 1fr);

    > div {
      background: #262626;
    }
  }

  .item-state-display {
    background: #262626;
    ${tw`h-full rounded p-2`}
    span {
      font-size: 12px;
    }
  }
`;
