import React from "react";
import style from "./Topbar.module.scss";

import { useDispatch, useSelector } from "react-redux";

import { selectTimeControls } from "../../reducers/timeControlsSlice";
import { selectTime } from "../../reducers/timeSlice";

// icons
import { Stop, PlayArrow, FastForward } from "@material-ui/icons";

export default function Topbar({ pause, play, fast }) {
  const dispatch = useDispatch();
  const controls = useSelector(selectTimeControls);
  const time = useSelector(selectTime);

  return (
    <div className={style.topbar}>
      <div className={style.brand}>AN IMPERIAL SIMULATION</div>
      <div className={style.links}>
        <a>HOW TO PLAY</a>
        <a>ABOUT</a>
        <a>FICTION</a>
      </div>
      <div className={style.timeControls}>
        <Stop
          fontSize="small"
          className={
            controls == "pause"
              ? [style.control, style.active].join(" ")
              : style.control
          }
          onClick={() => dispatch(pause())}
        />
        <PlayArrow
          fontSize="small"
          className={
            controls == "play"
              ? [style.control, style.active].join(" ")
              : style.control
          }
          onClick={() => dispatch(play())}
        />
        <FastForward
          fontSize="small"
          className={
            controls == "fast"
              ? [style.control, style.active].join(" ")
              : style.control
          }
          onClick={() => dispatch(fast())}
        />
      </div>
      <div className={style.timeDisplay}>
        <div className={style.ticks}>ticks: {time}</div>
        <div>
          Day {Math.floor(time / 4) % 360}, Year {Math.floor(time / 4 / 360)}
        </div>
      </div>
    </div>
  );
}
