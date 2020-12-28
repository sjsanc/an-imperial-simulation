import React, { useState } from "react";
import style from "../styles/CentrePanel.module.scss";
import JobContainer from "../components/JobPanel/JobContainer";
import StructureContainer from "../containers/StructureContainer";
import EmpireContainer from "../containers/EmpireContainer";
import ResearchContainer from "../components/ResearchPanel/ResearchContainer";

const tabs = [
  "jobs",
  "structures",
  "empire",
  "research",
  "military",
  "heroes",
  "map",
  "etc",
];

export default function CentrePanel(props: { time: number; paused: boolean }) {
  const [activePanel, setActivePanel] = useState<string>("jobs");
  const time = props.time;
  return (
    <div className={style.wrapper}>
      <div className={props.paused ? undefined : style.overlay}> </div>
      <div className={style.tabbar}>
        {tabs.map((tab) => (
          <h1
            key={tab}
            className={activePanel === tab ? style.active : undefined}
            onClick={() => {
              setActivePanel(tab);
            }}>
            {tab}
          </h1>
        ))}
      </div>
      {activePanel === "jobs" && <JobContainer time={time} />}
      {activePanel === "structures" && <StructureContainer time={time} />}
      {activePanel === "empire" && <EmpireContainer />}
      {activePanel === "research" && <ResearchContainer />}
    </div>
  );
}
