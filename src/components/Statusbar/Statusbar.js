import React from "react";
import style from "./Statusbar.module.scss";

import { useSelector } from "react-redux";

import { selectDemographics } from "../../reducers/demographicsSlice";

export default function Statusbar() {
  const demographics = useSelector(selectDemographics);

  return (
    <div className={style.statusbar}>
      <div className={style.demographicStats}>
        CITIZENRY:
        <span className={style.demoTotal}>
          {demographics != null ? demographics.total : "--"}
        </span>
        {" / "}
        <span className={style.demoAble}>
          {demographics.able != null ? demographics.able.length : "--"}
        </span>
        {" / "}
        <span className={style.demoEmploy}>
          {demographics.employed != null ? demographics.employed.length : "--"}
        </span>
      </div>
    </div>
  );
}
