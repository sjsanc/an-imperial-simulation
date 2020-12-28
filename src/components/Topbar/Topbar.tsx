import React from "react";
import style from "./Topbar.module.scss";

import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { toggleStart, setRate } from "../../slices/mainloopSlice";
import { getSeason, parseTime } from "../../tools/parseTime";

// ICON IMPORTS
import EventsDisplay from "../EventsDisplay/EventsDisplay";
import { K } from "../../constants";
import PopBox from "./PopBox";

export default function Topbar(props: { time: number }) {
  const dispatch = useDispatch();
  const time = props.time;
  const { runStatus, rate } = useSelector(
    (state: RootStateOrAny) => state
  ).mainloopSlice;
  const { citizens, employed } = useSelector(
    (state: RootStateOrAny) => state
  ).populationSlice;

  return (
    <div className={style.wrapper}>
      <div>
        <h2>AN IMPERIAL SIMULATION</h2>
      </div>
      <div>
        <h1>HOW TO PLAY</h1>
        <h1>ABOUT</h1>
        <h1>FICTION</h1>
        <h1>CREDITS</h1>
      </div>
      <div
        className={style.pauseBox}
        onClick={() => {
          dispatch(toggleStart());
        }}>
        <h1 className={runStatus === false ? style.active : undefined}>
          {runStatus === false ? "PAUSED" : "PAUSE?"}
        </h1>
      </div>
      <div>
        <h1
          className={rate === 1000 ? style.active : undefined}
          onClick={() => dispatch(setRate(1000))}>
          NORMAL
        </h1>
        <h1
          className={rate === 500 ? style.active : undefined}
          onClick={() => dispatch(setRate(500))}>
          FAST
        </h1>
        <h1
          className={rate === 250 ? style.active : undefined}
          onClick={() => dispatch(setRate(250))}>
          FASTER
        </h1>
      </div>
      <div className={style.yearBox}>
        <h2>YEAR: </h2>
        <h2>
          {parseTime(time).years < 10 ? (
            <>
              00<span>{parseTime(time).years}</span>
            </>
          ) : parseTime(time).years <= 10 && parseTime(time).years > 100 ? (
            <>
              0<span>{parseTime(time).years}</span>
            </>
          ) : (
            <span>{parseTime(time).years}</span>
          )}
        </h2>
      </div>
      <div className={style.seasonBox}>
        <h2>{getSeason(time, parseTime(time).years)}</h2>
      </div>
      <PopBox citizens={citizens} employed={employed} />
      <EventsDisplay />
    </div>
  );
}
