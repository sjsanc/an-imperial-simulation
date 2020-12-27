import React from "react";
import { useDispatch } from "react-redux";
import { JobType } from "../../types";
import style from "./JobPanel.module.scss";

export default function Job(props: {
  job: JobType;
  dispatchHandlers: any;
  population: { citizens: number[]; employed: number };
}) {
  const dispatch = useDispatch();
  const job = props.job;
  const pop = props.population;
  return (
    <div
      className={
        job.workers > 0 ? [style.job, style.activeJob].join(" ") : style.job
      }>
      <div
        id={job.name}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.dispatchHandlers.handleAssignWorker(job, dispatch, "inc", {
            employed: pop.employed,
            citizens: pop.citizens.length,
            event: e,
          });
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.dispatchHandlers.handleAssignWorker(job, dispatch, "desc", {
            employed: pop.employed,
            citizens: pop.citizens.length,
            event: e,
          });
        }}
        className={style.jobIcon}>
        <img
          alt="goaway"
          src={`${process.env.PUBLIC_URL}/usedIcons/jobs/${job.name}.png`}></img>
      </div>
      <div className={style.jobWorkers}>{job.workers}</div>
      <div className={style.jobAlert}>
        <img
          className={job.insuff ? style.alertRed : style.alertWhite}
          alt="goawway"
          src={`${process.env.PUBLIC_URL}/usedIcons/ui/alert.svg`}></img>
      </div>
      <div className={style.jobInfo}>
        <h1>{job.name}</h1>
        <p>{job.desc}</p>
      </div>
    </div>
  );
}
