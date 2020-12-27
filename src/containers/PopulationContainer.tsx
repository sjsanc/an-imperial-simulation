import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { birth, ageUp, expireNaturally } from "../slices/populationSlice";
import { PopulationType, birthCohort } from "../slices/populationSlice";
import { parseTime } from "../tools/parseTime";
import { K } from "../constants";

export default function PopulationContainer(props: { time: number }) {
  const dispatch = useDispatch();
  const time = props.time;

  const { empire } = useSelector((state: RootStateOrAny) => state).empireSlice;

  const { citizens, employed } = useSelector(
    (state: RootStateOrAny) => state
  ).populationSlice;

  // Age up once per year
  useEffect(() => {
    if (time > 0) {
      if (parseTime(time).days % K.YEAR === 0) {
        dispatch(ageUp());
        dispatch(expireNaturally(65 + empire.vitality));
      }
      if ((parseTime(time).days % K.MONTH) * 6 === 0) {
        dispatch(birthCohort(new Array(empire.fertility).fill(0)));
      }
    }
  }, [time, dispatch, empire]);

  return null;
}
