import { concat } from "lodash";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FastForward, ChevronRight, List, LogOut } from "react-feather";
import styled from "styled-components";
import tw from "twin.macro";
import { useViews } from "../hooks/useViews";
import { ActionTypes, useStore } from "../store/store";

export default function Debugger({
  active,
  setActive,
}: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}) {
  const { state, dispatch } = useStore();
  const [view, setView] = useViews(["actions", "store"]);

  const expand = (e: React.MouseEvent) => {
    if (e.currentTarget.parentElement) {
      e.currentTarget.parentElement.classList.toggle("collapsed");
    }
  };

  // const data = concat(
  //   Object.entries(state.config),
  //   Object.entries(state.state),
  //   Object.entries(state.data)
  // );

  const Prop = ({ k, v }: { k: string; v: any }) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    let value;
    if (!expanded) value = "(...)";
    else if (v.length === 0) value = "null";
    else if (v === "") value = "null";
    else if (typeof v === "object") value = JSON.stringify(v);
    else value = v;

    return (
      <div
        className={`prop ${expanded ? "prop-expanded" : ""}`}
        onClick={() => setExpanded(!expanded)}
        title={JSON.stringify(v)}>
        <span className="prop-key">{k}: </span>
        <span className="prop-value">{value}</span>
      </div>
    );
  };

  const actions = [
    {
      name: "Print State",
      func: () => console.log(state),
    },
    {
      name: "Res: add 100",
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

  return active ? (
    <Wrapper>
      <div className="views">
        <button data-view="store" onClick={setView}>
          Store
        </button>
        <button data-view="actions" onClick={setView}>
          Actions
        </button>
      </div>
      <div className="body">
        {view === "store" && (
          <div className="store">
            {Object.entries(state.data).map(([key, val], i) => (
              <div key={i} className="class collapsed">
                <span className="class-key" onClick={expand}>
                  <FastForward size={"10px"} />
                  {key}
                </span>
                <div className="itemlist">
                  {val.map((item: any, i) => (
                    <div key={i} className="item collapsed">
                      <span className="item-key" onClick={expand}>
                        {item.name}
                      </span>
                      <div className="proplist">
                        {Object.entries(item).map(([k, v], i) => (
                          <>
                            <Prop key={i} k={k} v={v} />
                          </>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {view === "actions" && (
          <div className="actions">
            {actions.map((a, i) => (
              <button key={i} onClick={a.func}>
                {a.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  ) : null;
}

const Wrapper = styled.div`
  top: 60px;
  right: 0;
  bottom: 0;
  width: 250px;
  position: absolute;
  background: #131313;
  color: white;

  .toggle {
  }

  .views {
    ${tw`w-full p-2 flex items-center justify-around`}
    border-bottom: 1px solid #dadada;
    button {
      ${tw`border-0 px-4 py-2 rounded bg-gray-800 text-white`}
    }
    .close {
      ${tw`text-white `}
    }
  }
  .body {
    ${tw`ml-1`}
    span {
      font-size: 12px;
      line-height: 1;
      ${tw`block cursor-pointer`}
      &:hover {
        background: #333333;
      }
    }
    .class {
      ${tw`flex flex-col`}
    }
    .class-key {
      ${tw`flex items-center text-purple-500`}
      svg {
        ${tw`mr-1`}
      }
    }
    .itemlist {
    }
    .item-key {
      ${tw`pl-3 text-yellow-300`}
    }
    .proplist {
    }
    .prop {
      ${tw`flex items-center cursor-pointer`}
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 250px;
      &:hover {
        background: #333333;
      }
    }
    .prop-key {
      ${tw`pl-5`}
      font-size: 10px;
    }
    .prop-value {
      font-size: 10px;
      ${tw`pl-1`}
    }
    .collapsed {
      span {
        ${tw`text-white`}
      }
      div {
        display: none;
      }
    }
  }
`;
