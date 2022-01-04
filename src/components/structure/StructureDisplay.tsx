import React from "react";
import styled, { css } from "styled-components";
import { Structure } from "../../classes/Structure";
import { useGameEngine } from "../../hooks/useGameEngine";
import { useViews } from "../../hooks/useViews";
import { useStore } from "../../store/store";
import * as _ from "lodash";
import Tippy from "@tippyjs/react/headless";
import { Framer, BarChart, HelpCircle } from "react-feather";
import LabelTooltip from "../tooltips/LabelTooltip";
import StructureActions from "./StructureActions";
import tw from "twin.macro";
import StructureEffects from "./StructureEffects";
import { Resource } from "../../classes/Resource";
import { Parcel } from "../../types/types";

// Topview = views, infobox, count
// ACTIONS => upgrades, Jobs, cost, actions
// EFFECTS => product, consumption, passive
// DETAILS => chains, volume, value etc

const views = ["actions", "effects", "details"];
const icons = [<Framer size="14px" />, <BarChart size="14px" />, <HelpCircle size="14px" />];

export default function StructureDisplay({ str }: { str: Structure }) {
  const { state, dispatch } = useStore();
  const actions = useGameEngine();
  const [view, setView] = useViews(views);

  const structureState = str.isBuilt()
    ? "built"
    : state.checkPrereqs(str) || str.isBuildable
    ? "buildable"
    : "hidden";

  const ResCost = ({ cost }: { cost: Parcel }) => {
    const res: Resource = state.getDatum("resources", cost[0]);
    return (
      <div className="res-cost">
        <img src={`assets/icons/ICON_${res.iconPath}.png`} alt={res.name} />{" "}
        <span className={res.amount > cost[1] ? "increase" : "decrease"}>{cost[1]}</span>
      </div>
    );
  };

  return (
    <Wrapper strState={structureState} id={structureState}>
      <div className="infobox">
        <div className="view-selectors hidden">
          {views.map((v, i) => (
            <Tippy
              key={i}
              placement="bottom"
              render={(attrs) => <LabelTooltip>{_.startCase(v)}</LabelTooltip>}>
              <div data-view={v} onClick={setView}>
                {icons[i]}
              </div>
            </Tippy>
          ))}
        </div>
        <div className="title">
          <div className="icon">{str.initials.toUpperCase()}</div>
          <div>
            <h3>
              {str.name} <span>{str.structureType}</span>
            </h3>
            <p>{str.description}</p>
          </div>
        </div>
        <div className="count hidden">
          <label>Count</label>
          <h1>{str.builtCount}</h1>
        </div>
      </div>
      {structureState !== "hidden" && (
        <div className="views block">
          {view === "actions" && <StructureActions str={str} />}
          {view === "effects" && <StructureEffects str={str} />}
          {/* {view === "details" && <StructureDetails str={str} />} */}
        </div>
      )}
      {structureState === "buildable" && (
        <div className="initial-build">
          <button onClick={() => actions.build(str, 1)}>BUILD</button>
          <div>
            {str.buildCost.map((cost) => (
              <ResCost cost={cost} />
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ strState }>`
  ${tw`flex flex-col p-1 rounded relative`}
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);

  .initial-build {
    ${tw`flex flex-col items-center justify-center absolute`}
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    button {
      ${tw`bg-gray-500 border-0 px-3 py-2 rounded text-white font-medium cursor-pointer`}
    }

    > div {
      max-width: 200px;
      ${tw`flex mt-2 flex-wrap justify-center`}
    }

    .res-cost {
      ${tw`p-1 bg-gray-300 rounded flex items-center mr-1 mb-1 font-medium`}
      font-size: 12px;
      img {
        ${tw`mr-1`}
      }
    }
  }

  .infobox {
    grid-template-columns: 25px auto 62px;
    ${tw`grid gap-1 mb-1`}
    height: 75px;

    .view-selectors {
      div {
        ${tw`flex items-center justify-around cursor-pointer rounded`}
        aspect-ratio: 1;
        &:hover {
          ${tw`bg-gray-200`}
        }
      }
      ${tw`flex flex-col`}
    }

    .title,
    .count {
      ${tw`bg-gray-100 rounded`}
    }

    .title {
      ${tw`flex p-1`}
    }

    h3 span {
      font-family: "Roboto", sans-serif;
      font-size: 9px;
      ${tw`text-gray-400 uppercase`}
    }
    p {
      font-style: italic;
      font-size: 12px;
    }
    .icon,
    .count {
      aspect-ratio: 1;
      height: 100%;
    }
    .icon {
      img {
        height: 32px;
        width: 32px;
      }
      ${tw`mr-2 rounded flex items-center justify-center bg-gray-400`}
    }
    .count {
      ${tw`flex flex-col items-center p-2 rounded bg-gray-100 w-full`}
    }
  }

  .views {
    height: 135px;
  }

  ${(props) =>
    props.strState === "built"
      ? css`
          background: white;
          /* border: 1px solid #d0d0d0; */
        `
      : ""}

  ${(props) =>
    props.strState === "buildable" &&
    css`
      ${tw`bg-gray-300`}
      box-shadow: unset;
      .hidden {
        display: none !important;
      }
      .muted {
        ${tw`bg-gray-200`} /* opacity: 0 !important; */
        * {
          opacity: 0;
        }
      }
      .infobox {
        grid-gap: 0;
        grid-template-columns: 1fr;
      }
      .infobox .title {
        opacity: 50%;
        /* ${tw`bg-gray-200`} */
      }
    `}

  ${({ strState }) => strState === "hidden" && css``}
`;
