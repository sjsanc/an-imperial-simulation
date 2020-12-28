import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

// JOB IMPORTS
import { JobType, ResType } from "../../types";
import { performJob } from "../../slices/jobsSlice";
import { costCheck } from "../../tools/costCheck";
import style from "./JobPanel.module.scss";
import { find } from "../../tools/utils";
import { StructureType } from "../../types.d";
import Job from "./Job";
import { ResSelector } from "../../slices/researchSlice";
import store from "../../store/store";
import { jobResearchReqCheck } from "../../tools/jobResearchReqCheck";

export default function JobPanel(props: {
  resources: any;
  jobs: any;
  dispatchHandlers: any;
}) {
  const { citizens, employed } = useSelector(
    (state: RootStateOrAny) => state
  ).populationSlice;

  const { structures } = useSelector(
    (state: RootStateOrAny) => state
  ).structureSlice;

  const research = ResSelector.selectAll(store.getState());
  const jobs: JobType[] = props.jobs;

  return (
    <div className={style.wrapper}>
      {structures.map((str: StructureType) => {
        if (str.built && str.jobs.length > 0) {
          return (
            <div key={str.name + "_jobs"} className={style.typeWrapper}>
              <div className={style.typeHeader}>
                <h1>
                  {str.name}
                  <span>JOBS</span>
                </h1>
                <p>{str.desc}</p>
              </div>
              <div className={style.jobWrapper}>
                {jobs.map((job: JobType) => {
                  if (jobResearchReqCheck(job.research, research)) {
                    return (
                      <div key={job.name}>
                        {job.parentStructure === str.name && (
                          <Job
                            job={job}
                            dispatchHandlers={props.dispatchHandlers}
                            population={{ citizens, employed }}
                          />
                        )}
                      </div>
                    );
                  } else return null;
                })}
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
