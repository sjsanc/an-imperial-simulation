import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Job } from "../../classes/Job";
import { Structure } from "../../classes/Structure";
import { padArray } from "../../helpers/displayHelpers";
import { useGameEngine } from "../../hooks/useGameEngine";
import { useStore } from "../../store/store";
import GameIcon from "../common/GameIcon";
import LabelledGrid from "../common/LabelledGrid";
import JobTooltip from "../tooltips/JobTooltip";
import LabelTooltip from "../tooltips/LabelTooltip";
import JobIcon from "./JobIcon";
import UpgradeIcon from "./UpgradeIcon";

export default function StructureActions({ str }: { str: Structure }) {
  const { state } = useStore();
  const actions = useGameEngine();

  const getJobState = (job: Job) => {
    if (job.workers > 0) return "active";
    else if (job.insufficient) return "warning";
  };

  return (
    <Wrapper>
      <LabelledGrid cols={3} label="Upgrades" className="muted">
        {padArray(state.getList(str, "upgrades"), 9).map((upg: any | "x", i) => (
          <GameIcon
            key={i}
            itemData={upg}
            tooltip={<LabelTooltip>{upg.name}</LabelTooltip>}
            onClick={() => actions.build(upg, 1)}
            state={(upg) => {
              if (upg.builtCount > 0) return "built";
              else return undefined;
            }}
          />
        ))}
      </LabelledGrid>
      <LabelledGrid cols={3} label="Jobs" className="jobs muted">
        {padArray(state.getList(str, "jobs"), 6).map((job: Job, i: number) => (
          <GameIcon
            key={i}
            itemData={job}
            count={job.workers}
            fontSize={12}
            tooltip={<JobTooltip job={job} />}
            onMouseDown={(e) => actions.setWorkers(job, 1, e)}
            state={(job) => {
              if (job.insufficient) return "warning";
              else if (job.workers > 0) return "active";
            }}
          />
        ))}
      </LabelledGrid>
      <div className="muted"></div>
      <LabelledGrid cols={1} label="Actions" className="actions muted">
        <button onClick={() => actions.build(str, 1)}>BUILD</button>
        <button onClick={() => actions.destroy(str, 1)}>DEMOLISH</button>
        <button>FREEZE</button>
      </LabelledGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${tw`grid gap-1`}
  grid-template-columns: 120px 180px auto 90px;

  > div {
    ${tw`bg-gray-100 rounded p-1`}
  }

  .labelled-grid {
    ${tw`gap-1`}
    > div {
      aspect-ratio: 1;
    }
  }

  button {
    font-size: 11px;
    ${tw`border-0 bg-gray-400 rounded p-1 text-gray-800 font-medium`}
    &:hover {
      ${tw`bg-gray-500 text-white cursor-pointer`}
    }
  }

  .actions {
    > div {
      height: 92px;
    }
  }

  .cost-to-build {
    > div {
      > div {
        aspect-ratio: unset;
        height: 20px;
      }
    }
  }
`;
