import React, { useState, useEffect } from "react";
import style from "./global_styles/App.module.scss";

// data
import Dataset from "./data/data";

// components
import Topbar from "./components/Topbar/Topbar";
import Statusbar from "./components/Statusbar/Statusbar";

// redux imports
import { useSelector, useDispatch } from "react-redux";

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

// logic
import {
  demographicBreakdown,
  createChild,
  birthCohort,
} from "./logic/population";

// DEBUG
console.log(Dataset);

export default function App() {
  // WARNING: App refreshed once per {speed} so don't put expensive stuff in here

  // App level states
  const [speed, setSpeed] = useState(1000);

  // redux
  const dispatch = useDispatch();

  // redux states
  const time = useSelector(selectTime);
  const controls = useSelector(selectTimeControls);
  const population = useSelector(selectPopulation);
  const demographics = useSelector(selectDemographics);

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

        // PER 1/4 YEAR
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

  return (
    <div className={style.wrapper}>
      <Topbar
        pause={timeControlsActions.pause}
        play={timeControlsActions.play}
        fast={timeControlsActions.fast}
      />
      <Statusbar />

      <div className={style.centerWrapper}>
        <div className={style.leftPanel}></div>
        <div className={style.centerPanel}>
          <h1>
            Time: {time} / Controls: {controls} / Speed: {speed}
          </h1>
        </div>
        <div className={style.rightPanel}></div>
      </div>
      <div className={style.botbar}></div>
    </div>
  );
}
