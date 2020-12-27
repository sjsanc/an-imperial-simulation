import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import style from "./ResPanel.module.scss";

// RES IMPORTS
import { customDispatch, ResType } from "../../types";

import { setPinlist } from "../../slices/resourceSlice";
import ResPanelTabs from "./ResPanelTabs";
import Res from "./Res";

const categoryList = [
  "all",
  "raw",
  "food",
  "fabricated",
  "advanced",
  "rare",
  "misc",
  "pinned",
];

export default function ResPanel(props: {
  resources: any;
  dispatchHandler: any;
}) {
  const [cat, setCat] = useState<string>("all");

  const dispatch = useDispatch();
  const resources: ResType[] = props.resources;

  const { pinlist } = useSelector(
    (state: RootStateOrAny) => state
  ).resourceSlice;

  const handleSetCat = (cat: string) => {
    setCat(cat);
  };

  return (
    <div className={style.wrapper}>
      <ResPanelTabs
        categories={categoryList}
        handleCategoryClick={handleSetCat}
        activeCategory={cat}
      />
      <div className={style.overflowWrapper}>
        {cat !== "all" && cat !== "pinned" ? (
          resources
            .filter((res) => res.category === cat && res.amount > 0)
            .map((res: ResType) => (
              <Res
                ctx={res}
                dispatchHandler={props.dispatchHandler}
                dispatch={dispatch}
                pinlist={pinlist}
              />
            ))
        ) : cat === "pinned" && pinlist.length > 0 ? (
          resources
            .filter((res) => pinlist.includes(res.name))
            .map((res: ResType) => (
              <Res
                key={res.name}
                ctx={res}
                dispatchHandler={props.dispatchHandler}
                dispatch={dispatch}
                pinlist={pinlist}
              />
            ))
        ) : cat === "pinned" && pinlist.length === 0 ? (
          <div className={style.pinlistPlaceholder}>
            click the
            <img
              alt="pinIcon"
              src={`${process.env.PUBLIC_URL}/usedIcons/ui/pin.png`}></img>
            pin icon to add a resource
          </div>
        ) : (
          resources.map((res: ResType) => {
            if (res.amount > 0) {
              return (
                <Res
                  key={res.name}
                  ctx={res}
                  dispatchHandler={props.dispatchHandler}
                  dispatch={dispatch}
                  pinlist={pinlist}
                />
              );
            } else return null;
          })
        )}
      </div>
    </div>
  );
}
