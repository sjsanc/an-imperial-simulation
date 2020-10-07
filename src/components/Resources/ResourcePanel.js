import React, { useState, useEffect } from "react";
import style from "./ResourcePanel.module.scss";
import { useSelector } from "react-redux";
import { selectGameData } from "../../reducers/gameDataSlice";
import * as utils from "../../utils/utils";

export default function Resources({ informInfobox }) {
  const resources = useSelector(selectGameData);

  return (
    <div className={style.resourcePanel}>
      <h1>RESOURCES</h1>
      {resources &&
        resources.map((res, index) =>
          res.quantity > 0 ? (
            <div
              onClick={() => informInfobox(res)}
              className={style.resourceEntry}
              id={`_${res.name}`}
              key={index}
            >
              <div>
                <img
                  src={`./src/assets/Icons/Pack 1A/icon_${index + 10}.png`}
                ></img>
              </div>
              <p>{utils.cap(res.name)}</p>
              <p>{res.quantity}</p>
            </div>
          ) : null
        )}
    </div>
  );
}
