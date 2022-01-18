import React from "react";
import { Command, Framer } from "react-feather";
import styled from "styled-components";
import tw from "twin.macro";
import { useGameEngine } from "../hooks/useGameEngine";
import { Job } from "../classes/Job";
import { useViews } from "../hooks/useViews";
import { useStore } from "../store/store";
import JobTooltip from "./tooltips/JobTooltip";
import GameIcon from "./common/GameIcon";

export default function Quickview() {
  const { state } = useStore();
  const actions = useGameEngine();
  const [view, setView] = useViews(["jobs", "magic"]);
  const activeJobs = state.getData("jobs", (x: Job) => x.workers > 0);

  return (
    <QuickviewBar>
      <div className="bar">
        <div className="controls">
          <div data-view="jobs" className={view === "jobs" ? "active" : ""} onClick={setView}>
            <Framer size="14px" />
          </div>
          <div data-view="magic" className={view === "magic" ? "active" : ""} onClick={setView}>
            <Command size="14px" />
          </div>
        </div>
        <div className="view">
          <label>{view}</label>
          {view === "jobs" && (
            <div className="jobs-view">
              {activeJobs.length > 0 ? (
                activeJobs.map((job: Job, i: number) => {
                  return (
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
                  );
                })
              ) : (
                <p>No active jobs</p>
              )}
            </div>
          )}
          {view === "magic" && <div>MAGIC</div>}
        </div>
      </div>
    </QuickviewBar>
  );
}

const QuickviewBar = styled.div`
  label {
    ${tw`text-gray-500 font-medium uppercase flex`}
    font-size: 9px;
  }
  > label {
    ${tw`mb-2`}
  }
  .bar {
    ${tw`grid w-full mb-2`}
    grid-template-columns: 35px auto;
    p {
      font-size: 12px;
    }
  }

  .controls {
    ${tw`flex flex-col items-center justify-between mr-1`}
    div {
      aspect-ratio: 1;
      ${tw`w-full flex items-center justify-center rounded`}
      &:hover {
        ${tw`bg-gray-200 cursor-pointer`}
      }
    }
    .active {
      ${tw`bg-gray-200`}
    }
  }

  .view {
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
      0px 1px 3px 0px rgb(0 0 0 / 12%);
    min-height: 66px;
    ${tw`bg-white w-full rounded p-2`}

    > div {
      ${tw`flex mt-1`}

      // job
      > div {
        height: 36px;
        width: 36px;
        ${tw`mr-1`}
      }
    }
  }
`;
