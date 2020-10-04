import React, { useState } from "react";
import style from "./HelloWorld.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectCount } from "./HelloWorldSlice";

export default function HelloWorld() {
  const [mult, setMult] = useState(false);
  const [divide, setDivide] = useState(false);

  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  const enableMult = () => {
    setMult(!mult);
  };

  const enableDivide = () => {
    setDivide(!divide);
  };

  return (
    <div className={style.rect}>
      <button className={mult ? style.mult : null} onClick={enableMult}>
        Mult
      </button>
      <button className={divide ? style.divide : null} onClick={enableDivide}>
        Divide
      </button>
      <button
        className={style.hello}
        onClick={() =>
          mult
            ? dispatch(actions.multiply())
            : divide
            ? dispatch(actions.divide())
            : dispatch(actions.increment())
        }
        onContextMenu={(e) => {
          e.preventDefault();
          dispatch(actions.decrement());
        }}
      >
        Hello World. Click me!
      </button>
      <div>{count}</div>
    </div>
  );
}
