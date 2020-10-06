import React, { useState, useEffect } from "react";
import style from "./global_styles/App.module.scss";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

// data
import dataset from "./data/data";
import { popSeed } from "./data/popSeed";

// components
import Topbar from "./components/Topbar/Topbar";
import Statusbar from "./components/Statusbar/Statusbar";
import ResourcePanel from "./components/Resources/ResourcePanel";
import Infobox from "./components/Infobox/Infobox";

// reducers
import { timeActions, selectTime } from "./reducers/timeSlice";
import {
  timeControlsActions,
  selectTimeControls,
} from "./reducers/timeControlsSlice";
import {
  selectPopulation,
  populationActions,
} from "./reducers/populationSlice";
import {
  demographicsActions,
  selectDemographics,
} from "./reducers/demographicsSlice";

import { gameDataActions, selectGameData } from "./reducers/gameDataSlice";

// logic
import {
  demographicBreakdown,
  createChild,
  birthCohort,
  naturalDeath,
} from "./logic/population";

// DEBUG
console.log(dataset);

export default function App() {
  // WARNING: App refreshed once per {speed} so don't put expensive stuff in here

  // App level states
  const [speed, setSpeed] = useState(1000);
  const [devTools, toggleDevTools] = useState(false);
  const [infobox, setInfobox] = useState(null);

  // redux
  const dispatch = useDispatch();

  // redux states
  const time = useSelector(selectTime);
  const controls = useSelector(selectTimeControls);
  const population = useSelector(selectPopulation);
  const demographics = useSelector(selectDemographics);
  const gameData = useSelector(selectGameData);

  // On game load
  useEffect(() => {
    console.log("Game loading...");
    dispatch(populationActions.initialisePop(popSeed));
    dispatch(gameDataActions.initialiseGame(dataset));
    console.log("Game started! Have fun!");
  }, []);

  // game speeds
  useEffect(() => {
    switch (controls) {
      case "play":
        setSpeed(1000);
        break;
      case "pause":
        setSpeed(0);
        break;
      case "fast":
        setSpeed(1);
        break;
      default:
        setSpeed(1000);
        break;
    }
  }, [controls]);

  // main game loop
  // https://github.com/facebook/react/issues/14409
  useEffect(() => {
    const interval = setInterval(() => {
      // Phase 1: update informative states
      if (controls != "pause") {
        dispatch(timeActions.incrementTick());
        dispatch(
          demographicsActions.updateDemographics(
            demographicBreakdown(population, time, { retirementAge: 45 })
          )
        );
        dispatch(populationActions.reIndex());

        // PER DAY
        // natural death every day
        if (time % 4 == 0) {
          if (demographics.elders != null) {
            let condemned = naturalDeath(demographics.elders);
            if (condemned.length > 0) {
              condemned.forEach((x) => {
                dispatch(populationActions.death(x));
              });
            }
          }
        }

        // PER 1/4 YEAR
        // childbirth cycles every 90 days
        if (demographics.adults != null && (time / 4) % 90 == 0) {
          let cohortSize = birthCohort(demographics.adults, {
            fertilityRate: 0.5,
          });
          for (let i = 0; i < cohortSize; i++) {
            dispatch(populationActions.birth(createChild()));
          }
        }

        // PER YEAR
        if ((time / 4) % 360 == 0) {
          dispatch(populationActions.incrementAge());
        }
      }
    }, speed);

    return () => clearInterval(interval);
  });

  // INFOBOX CLICK HANDLER
  const informInfobox = (tooltip) => {
    setInfobox(tooltip);
  };

  return (
    <div className={style.wrapper}>
      <Topbar
        pause={timeControlsActions.pause}
        play={timeControlsActions.play}
        fast={timeControlsActions.fast}
      />
      <Statusbar />

      <div className={style.centerWrapper}>
        <div className={style.leftPanel}>
          <ResourcePanel gameData={gameData} informInfobox={informInfobox} />
        </div>
        <div className={style.centerPanel}>
          <Infobox infobox={infobox} />
        </div>
        <div className={style.rightPanel}></div>
      </div>
      <div className={style.botbar}>
        <button
          className={style.devToolsBtn}
          onClick={() => toggleDevTools(!devTools)}
        >
          {devTools ? "HIDE" : "SHOW"}
        </button>
      </div>
      <div
        className={
          devTools
            ? [style.devtools, style.devtoolsShow].join(" ")
            : style.devtools
        }
      ></div>
    </div>
  );
}
