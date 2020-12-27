import React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Research, updateResearch } from "../../slices/researchSlice";
import { jobResearchReqCheck } from "../../tools/jobResearchReqCheck";
import { find } from "../../tools/utils";
import style from "./ResearchPanel.module.scss";

export default function ResearchPanel(props: {
  research: Research[];
  handleCompleteResearch: any;
}) {
  const dispatch = useDispatch();
  const research = props.research;

  const { resources } = useSelector(
    (state: RootStateOrAny) => state
  ).resourceSlice;

  const researchPoints = find("research", resources);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <h1>Research Points: {researchPoints.amount}</h1>
      </div>
      <div className={style.grid}>
        <div className={style.availableWrapper}>
          <h1>available</h1>
          {research.map((res) => {
            if (
              jobResearchReqCheck(res.prereqs, research) &&
              res.complete === false
            ) {
              return (
                <div
                  key={"research_" + res.name}
                  className={style.availableRes}>
                  <div>
                    <h2>{res.name}</h2>
                    <span>
                      <h2>cost</h2>
                      <h2>{res.cost}</h2>
                    </span>
                  </div>
                  <p>
                    Unlocks all sorts of fun stuf. Unlocks all sorts of fun
                    stuffUnlocks all sorts of fun stuffUnlocks all sorts of fun
                    stuffUnlocks all sorts of fun stuffUnlocks all sorts of fun
                    stufff
                  </p>
                  <button
                    onClick={() => {
                      props.handleCompleteResearch(
                        res,
                        dispatch,
                        researchPoints
                      );
                    }}>
                    RESEARCH
                  </button>
                </div>
              );
            } else return false;
          })}
        </div>
        <div>
          <h1>completed</h1>
          <div className={style.complete}>
            {research.map((res) => {
              if (res.complete === true) {
                return <div key={"CompleteResearch_" + res.name}></div>;
              } else return false;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
