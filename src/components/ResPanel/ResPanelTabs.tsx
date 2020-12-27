import React from "react";
import style from "./ResPanel.module.scss";

export default function ResPanelTabs(props: {
  categories: string[];
  handleCategoryClick: any;
  activeCategory: string;
}) {
  return (
    <div className={style.categories}>
      {props.categories.map((cat) => (
        <div
          key={cat}
          onClick={() => {
            props.handleCategoryClick(cat, "cat");
          }}>
          <h1
            className={props.activeCategory === cat ? style.active : undefined}>
            {cat}
          </h1>
        </div>
      ))}
    </div>
  );
}
