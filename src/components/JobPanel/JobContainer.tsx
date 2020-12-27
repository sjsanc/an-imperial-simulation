import React, { useEffect } from "react";
import style from "./JobPanel.module.scss";

import { costCheck } from "../../tools/costCheck";

// REDUX IMPORTS
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { customDispatch } from "../../types";

// JOB IMPORTS
import JobPanel from "./JobPanel";
import { JobType } from "../../types";
import {
  performJob,
  assignWorker,
  setInsufficient,
} from "../../slices/jobsSlice";

// RES IMPORTS
import {
  handleAlterResource,
  handleBulkAlterResource,
} from "../../containers/ResourceContainer";
import { ResType } from "../../types";

// POP IMPORTS
import { changeEmployment } from "../../slices/populationSlice";

const find = (thing: string, list: any[]) => {
  return list.find((li) => thing === li.name);
};

// HANDLER FUNCTIONS
export const handlePerformJob = (
  job: JobType,
  dispatch: customDispatch,
  reslist: ResType[]
) => {
  if (job.cost.length > 0 && costCheck(job.cost, reslist)) {
    if (job.progress < job.duration) {
      dispatch(performJob({ jobname: job.name, type: "progress" }));
    } else {
      dispatch(performJob({ jobname: job.name, type: "complete" }));

      let element = document.getElementById(job.name);
      element?.classList.add(style.flash);
      setTimeout(() => {
        element?.classList.remove(style.flash);
      }, 100);

      let repeat = 0;
      for (let i = 0; i < job.workers; i++) {
        let sufficient = 0;
        job.cost.forEach((cost) => {
          let res = find(cost.name, reslist);
          if (res.amount - repeat * cost.amount > cost.amount) {
            sufficient++;
          }
        });
        if (sufficient === job.cost.length) {
          repeat++;
        }
      }
      job.cost.forEach((cost) => {
        let res = find(cost.name, reslist);
        handleAlterResource(res, dispatch, "desc", cost.amount * repeat);
      });

      job.product.forEach((prod) => {
        let res = find(prod.name, reslist);
        handleAlterResource(res, dispatch, "inc", prod.amount * job.workers);
      });
    }
  } else if (job.cost.length > 0 && !costCheck(job.cost, reslist)) {
    dispatch(setInsufficient({ jobname: job.name, bool: true }));
    console.log("Insufficient reosurces");
  } else if (job.cost.length === 0) {
    if (job.progress < job.duration) {
      dispatch(performJob({ jobname: job.name, type: "progress" }));
    } else {
      dispatch(performJob({ jobname: job.name, type: "complete" }));

      let element = document.getElementById(job.name);
      element?.classList.add(style.flash);
      setTimeout(() => {
        element?.classList.remove(style.flash);
      }, 100);

      job.product.forEach((prod) => {
        let res = find(prod.name, reslist);
        handleAlterResource(res, dispatch, "inc", prod.amount * job.workers);
      });
    }
  }
};

export const handleAssignWorker = (
  job: JobType,
  dispatch: customDispatch,
  type: "inc" | "desc",
  options: {
    employed: number;
    citizens: number;
    event: React.MouseEvent;
  }
) => {
  if (options && options.event) {
    if (options.event.shiftKey) {
      if (type === "desc" && job.workers <= 5 && options.employed <= 5) {
        dispatch(changeEmployment({ type: "dismiss", amount: job.workers }));
        dispatch(
          assignWorker({ jobname: job.name, amount: job.workers, type: type })
        );
      } else if (type === "desc" && options.employed - 5 > 0) {
        dispatch(changeEmployment({ type: "dismiss", amount: 5 }));
        dispatch(assignWorker({ jobname: job.name, amount: 5, type: type }));
      } else if (type === "inc" && options.employed <= options.citizens - 5) {
        dispatch(changeEmployment({ type: "employ", amount: 5 }));
        dispatch(assignWorker({ jobname: job.name, amount: 5, type: type }));
      } else if (type === "inc" && options.employed < options.citizens) {
        dispatch(
          changeEmployment({
            type: "employ",
            amount: options.citizens - options.employed,
          })
        );
        dispatch(
          assignWorker({
            jobname: job.name,
            amount: options.citizens - options.employed,
            type: type,
          })
        );
      } else {
        console.error("Not enough citizens");
      }
    } else if (options.event.ctrlKey) {
      if (type === "desc" && job.workers <= 25 && options.employed <= 25) {
        dispatch(changeEmployment({ type: "dismiss", amount: job.workers }));
        dispatch(
          assignWorker({ jobname: job.name, amount: job.workers, type: type })
        );
      } else if (type === "desc" && options.employed - 25 > 0) {
        dispatch(changeEmployment({ type: "dismiss", amount: 5 }));
        dispatch(assignWorker({ jobname: job.name, amount: 25, type: type }));
      } else if (type === "inc" && options.employed <= options.citizens - 25) {
        dispatch(changeEmployment({ type: "employ", amount: 25 }));
        dispatch(assignWorker({ jobname: job.name, amount: 25, type: type }));
      } else if (type === "inc" && options.employed < options.citizens) {
        dispatch(
          changeEmployment({
            type: "employ",
            amount: options.citizens - options.employed,
          })
        );
        dispatch(
          assignWorker({
            jobname: job.name,
            amount: options.citizens - options.employed,
            type: type,
          })
        );
      }
    } else {
      if (type === "desc" && job.workers === 0) {
        console.log("Can't reduce lower than 0");
      } else if (type === "desc" && job.workers > 0) {
        dispatch(changeEmployment({ type: "dismiss", amount: 1 }));
        dispatch(assignWorker({ jobname: job.name, amount: 1, type: type }));
      } else if (
        type === "inc" &&
        options.citizens > 0 &&
        options.employed < options.citizens
      ) {
        dispatch(changeEmployment({ type: "employ", amount: 1 }));
        dispatch(assignWorker({ jobname: job.name, amount: 1, type: type }));
      }
    }
  }
};

export default function JobContainer(props: { time: number }) {
  const dispatch = useDispatch();

  // STORE SELECTORS
  const { jobs } = useSelector((state: RootStateOrAny) => state).jobsSlice;
  const { resources } = useSelector(
    (state: RootStateOrAny) => state
  ).resourceSlice;
  const { runStatus } = useSelector(
    (state: RootStateOrAny) => state
  ).mainloopSlice;

  // TIME LISTENER
  useEffect(() => {
    // use worker amount to modifer total product, DO NOT perform job multiple times!
    if (runStatus) {
      jobs.forEach((job: JobType) => {
        if (job.workers > 0) {
          handlePerformJob(job, dispatch, resources);
        }
      });
    }
  }, [props.time, dispatch]);

  return (
    <JobPanel
      resources={resources}
      jobs={jobs}
      dispatchHandlers={{
        handlePerformJob: handlePerformJob,
        handleAssignWorker: handleAssignWorker,
      }}
    />
  );
}
