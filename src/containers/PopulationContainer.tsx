import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { birth, ageUp, expireNaturally } from "../slices/populationSlice";
import { PopulationType, birthCohort } from "../slices/populationSlice";
import { parseTime } from "../tools/parseTime";
import { K } from "../constants";
import { emitMessage, MsgSelector } from "../slices/messengerSlice";
import store from "../store/store";

export default function PopulationContainer(props: { time: number }) {
  const dispatch = useDispatch();
  const time = props.time;

  const { empire } = useSelector((state: RootStateOrAny) => state).empireSlice;

  const { citizens, employed } = useSelector(
    (state: RootStateOrAny) => state
  ).populationSlice;

  const calcMaxLifeExpectancy = (vitality: number) => {
    return 45 + vitality + Math.floor((Math.random() * vitality) / 2);
  };
  const messages = MsgSelector.selectAll(store.getState());

  // Age up once per year
  useEffect(() => {
    if (time > 0) {
      if (parseTime(time).days % (K.MONTH * 6) === 0) {
        dispatch(ageUp());
        const deathToll = citizens.filter(
          (c: number) => c < calcMaxLifeExpectancy(empire.vitality)
        ).length;
        dispatch(
          emitMessage({
            id: messages.length,
            type: "deathReport",
            typeFK: 0,
            ctx: deathToll,
          })
        );
        dispatch(expireNaturally(deathToll));
      }
      if ((parseTime(time).days % K.MONTH) * 6 === 0) {
        dispatch(
          birthCohort(
            new Array(Math.floor(Math.random() * empire.fertility)).fill(0)
          )
        );
      }
    }
  }, [time, dispatch, empire]);

  return null;
}
