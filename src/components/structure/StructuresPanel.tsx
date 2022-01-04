import styled, { css } from "styled-components";
import { useStore } from "../../store/store";
import { Structure } from "../../classes/Structure";
import { useGameEngine } from "../../hooks/useGameEngine";
import { Job } from "../../classes/Job";
import { Parcel, StructureTypes } from "../../types/types";
import { Upgrade } from "../../classes/Upgrade";
import tw from "twin.macro";
import _ from "lodash";
import LabelTooltip from "../tooltips/LabelTooltip";
import JobTooltip from "../tooltips/JobTooltip";
import { Framer, Sliders, Home } from "react-feather";
import Tippy from "@tippyjs/react/headless";
import React, { useState } from "react";
import { Resource } from "../../classes/Resource";
import { padArray } from "../../helpers/displayHelpers";
import Quickview from "../Quickview";
import StructureDisplay from "./StructureDisplay";

const strTypes = ["all", "housing", "industry", "military", "defensive"];

export default function StructuresPanel() {
  const { state } = useStore();
  const actions = useGameEngine();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleSetActiveFilter = (e: React.MouseEvent) => {
    setActiveFilter(e.currentTarget.getAttribute("data-filter") as string);
  };

  // const activeJobs = state.getData("jobs", (x: Job) => x.workers > 0);

  // Filters the structure types to only show buildable structures
  const possibleStructureFilters = () => {
    const activeTypes = _.uniq(
      state.data.structures
        .filter((s: Structure) => s.isActive())
        .map((s: Structure) => s.structureType)
    );
    return activeTypes || [];
  };

  const renderStructures = () => {
    // Filter by selected type, buildable, builtCount then value
    return state.data.structures
      .filter((str: Structure) =>
        activeFilter === "all" ? str : str.structureType === activeFilter
      )
      .filter((str: Structure) => state.checkPrereqs(str) || str.isBuildable)
      .sort((a, b) => (a.value < b.value && 1) || -1)
      .sort((a, b) => (a.builtCount < b.builtCount && 1) || -1);
  };

  return (
    <Wrapper>
      <div className="structure-panel-topbar">
        <div className="structure-type-filters">
          <button
            data-filter={"all"}
            onClick={handleSetActiveFilter}
            className={activeFilter === "all" ? "active-filter" : ""}>
            All
          </button>
          {possibleStructureFilters().map((type: string, i) => (
            <button
              data-filter={type}
              key={i}
              onClick={handleSetActiveFilter}
              className={activeFilter === type ? "active-filter" : ""}>
              {_.startCase(type as string)}
            </button>
          ))}
        </div>
      </div>
      <div className="structures">
        {renderStructures().map((str, i) => (
          <StructureDisplay key={i} str={str} />
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow: hidden;
  .structures {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 6px;

    @media screen and (max-width: 1800px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 1400px) {
      grid-template-columns: 1fr;
    }
  }

  label {
    ${tw`text-gray-500 font-medium uppercase flex`}
    font-size: 9px;
  }

  .buildable {
    ${tw`bg-gray-300`}
    box-shadow: none;
    .demolish,
    .freeze,
    .views {
      pointer-events: none;
    }
    .demolish,
    .freeze {
      ${tw`bg-gray-200`}
    }
    .views {
      div {
        ${tw`text-gray-300`}
      }
    }
    .views .active-view {
      ${tw`bg-gray-100`}
    }
  }

  .structure-panel-topbar {
    .structure-type-filters {
      ${tw`mb-2`}
    }
    button {
      ${tw`border-none p-2 font-medium rounded cursor-pointer mr-2`}
      &:hover {
        ${tw`bg-gray-200`}
      }
    }
    .active-filter {
      ${tw`bg-gray-300`}
    }
  }
`;
