import React from "react";
import style from "../styles/Topbar.module.scss";

import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  toggleStart,
  setRate,
  addYear,
  addMonth,
} from "../slices/mainloopSlice";
import { getSeason, parseTime } from "../tools/parseTime";

// ICON IMPORTS
import PersonIcon from "../assets/icons/delapouite/roman-toga.png";
import EmployedIcon from "../assets/icons/delapouite/farmer.png";
import EventsDisplay from "./EventsDisplay/EventsDisplay";
import { K } from "../constants";

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
        <h2
          style={{ clipPath: `inset(0px ${time % 75}px 0px 0px)` }}
          className={
            runStatus
              ? style.seasonBoxCover
              : [style.seasonBoxCover, style.pausedAnimation].join(" ")
          }>
          {getSeason(time)}
        </h2>
        <h2>{getSeason(time)}</h2>
      </div>
      <div className={style.popBox}>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/usedIcons/ui/people.png`}
            alt="population"
          />
          <h2>{citizens.length}</h2>
        </div>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/usedIcons/ui/employed.png`}
            alt="employed"
          />
          <h2>{employed}</h2>
        </div>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/usedIcons/ui/military.png`}
            alt="military"
          />
          <h2>0</h2>
        </div>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/usedIcons/ui/hero.png`}
            alt="heroes"
          />
          <h2>0</h2>
        </div>
      </div>
      <EventsDisplay />
    </div>
  );
}
