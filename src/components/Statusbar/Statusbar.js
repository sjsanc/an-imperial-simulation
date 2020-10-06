import React, { useState, useEffect } from "react";
import style from "./Statusbar.module.scss";

import { useSelector } from "react-redux";

import { selectDemographics } from "../../reducers/demographicsSlice";

export default function Statusbar() {
  const demographics = useSelector(selectDemographics);
  const [visiblePanel, setVisiblePanel] = useState(null);

  // Because useSelector is async
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(demographics).length > 0) {
      setLoaded(true);
    }
  }, [demographics]);

  return (
    <div className={style.statusbar}>
      <div className={style.hudtray}>
        <div
          className={[style.hud, style.demoHud].join(" ")}
          onClick={() =>
            visiblePanel == "DEMO"
              ? setVisiblePanel(null)
              : setVisiblePanel("DEMO")
          }
        >
          <p>Population</p>
          <div className={style.demoHudStats}>
            {loaded && (
              <>
                <div>{demographics.total}</div>
                {" • "}
                <div>{demographics.able.length}</div>
                {" • "}
                <div>{demographics.employed.length}</div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={style.paneltray}>
        <div
          className={
            visiblePanel == "DEMO"
              ? [style.demoPanel, style.panelVisible].join(" ")
              : [style.demoPanel]
          }
        >
          <div
            className={
              visiblePanel == "DEMO"
                ? [
                    style.demoContent,
                    style.panelContent,
                    style.contentVisible,
                  ].join(" ")
                : style.panelContent
            }
          ></div>
        </div>
      </div>
    </div>
  );
}
