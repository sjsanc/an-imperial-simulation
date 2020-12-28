import React from "react";
import { JobType } from "../../types";
import style from "./Tooltips.module.scss";

export default function JobTooltip(props: { visible: boolean; job: JobType }) {
  return (
    <div
      className={
        props.visible
          ? style.jobTooltip
          : [style.jobTooltip, style.hidden].join(" ")
      }>
      <div>
        <h1>consumes</h1>
        <div>
          {props.job.cost.length > 0 ? (
            props.job.cost.map((cost) => (
              <span>
                <img
                  src={`${process.env.PUBLIC_URL}/usedIcons/resources/${cost.name}.png`}
                  alt={"tooltip_" + cost.name}
                />
                <p>{cost.name}</p>
              </span>
            ))
          ) : (
            <h2>Nothing at all!</h2>
          )}
        </div>
        <h1>produces</h1>
        <div>
          {props.job.product.map((prod) => (
            <span>
              <img
                src={`${process.env.PUBLIC_URL}/usedIcons/resources/${prod.name}.png`}
                alt={"tooltip_" + prod.name}
              />
              <p>{prod.name}</p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
