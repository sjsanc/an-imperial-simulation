import _ from "lodash";
import { Citizen } from "../classes/Citizen";
import { Job } from "../classes/Job";
import { Message } from "../classes/Message";
import { Resource } from "../classes/Resource";
import { Structure } from "../classes/Structure";
import { useStore, ActionTypes } from "../store/store";
import { Buildable, Parcel } from "../types/types";

// ==============================================================//
// GAME ENGINE
// Dispatch calls must be wrapped in a hook, so we call this hook in our app
// otherwise React won't redraw when the store changes
//
// There's value in having descriptive function names.
// ==============================================================//

export const useGameEngine = () => {
  const { state, dispatch } = useStore();

  const flip = (target: string, value: boolean) => {
    dispatch({
      type: ActionTypes.SET,
      payload: {
        target,
        value,
        message: `${target} value flipped`,
      },
    });
  };

  const push = (target: string, value: any) => {
    dispatch({
      type: ActionTypes.PUSH,
      payload: {
        target,
        value,
      },
    });
  };

  const pause = () => {
    dispatch({
      type: ActionTypes.SET,
      payload: {
        target: "state.isRunning",
        value: false,
        message: "Game paused",
      },
    });
  };

  const play = () => {
    dispatch({
      type: ActionTypes.SET,
      payload: {
        target: "state.isRunning",
        value: true,
        message: "Game started",
      },
    });
  };

  const tick = () => {
    dispatch({
      type: ActionTypes.INCREASE_BY,
      payload: {
        target: "state.currentTick",
        value: 1,
      },
    });
  };

  const setWorkers = (job: Job, amount: number, eventType: React.MouseEvent) => {
    const event = eventType.button === 0 ? "ADD" : eventType.button === 1 ? "REMOVE" : null;

    if (eventType) {
      if (event === "ADD") {
        // Check for available workers first
        const employed = state.getEmployedCount();
        const totalWorkers = state.getCountByPropValue("census", "role", "worker");

        if (employed < totalWorkers) {
          dispatch({
            type: ActionTypes.INCREASE_BY,
            payload: {
              target: `data.jobs.${job.index}.workers`,
              value: amount,
              message: `${job.name} assigned ${amount} workers`,
            },
          });
        }
      } else if (event === "REMOVE") {
        if (job.workers - amount >= 0) {
          dispatch({
            type: ActionTypes.DECREASE_BY,
            payload: {
              target: `data.jobs.${job.index}.workers`,
              value: amount,
              message: `${job.name} removed ${amount} workers`,
            },
          });
          if (job.workers - amount === 0) flip(`data.jobs.${job.index}.insufficient`, false);
        }
      }
    }
  };

  const build = (item: Buildable, amount: number) => {
    if (state.costCheck(item.buildCost)) {
      _consume(item.buildCost);
      dispatch({
        type: ActionTypes.INCREASE_BY,
        payload: {
          target: `data.${item.type}.${item.index}.builtCount`,
          value: amount,
          message: `${item.type} built`,
        },
      });
      postMessage({ type: "warning", body: "You've built something" });
    } else {
      console.error("INSUFFICENT RESOURCE");
    }
  };

  const destroy = (item: Buildable, amount: number) => {
    dispatch({
      type: ActionTypes.DECREASE_BY,
      payload: {
        target: `data.${item.type}.${item.index}.builtCount`,
        value: amount,
        message: `${item.type} destroyed by ${amount}`,
      },
    });
  };

  const _modify = (parcels: Parcel[], modifiers?: { workers: number }): Parcel[] => {
    let output = parcels;
    if (modifiers?.workers) output = output.map((x) => [x[0], x[1] * modifiers?.workers]);
    return output;
  };

  const _consume = (costs: Parcel[]) => {
    costs.forEach((cost) => {
      const i = state.getIndex("resources", cost[0]);
      dispatch({
        type: ActionTypes.DECREASE_BY,
        payload: {
          target: `data.resources.${i}.amount`,
          value: cost[1],
          message: `Consumed ${cost[1]} ${cost[0]}`,
        },
      });
    });
  };

  const _produce = (prods: Parcel[]) => {
    prods.forEach((prods) => {
      const i = state.getIndex("resources", prods[0]);
      dispatch({
        type: ActionTypes.INCREASE_BY,
        payload: {
          target: `data.resources.${i}.amount`,
          value: prods[1],
        },
      });
    });
  };

  const performJobs = () => {
    const activeStructures = state.getActiveStructures();

    activeStructures.forEach((str: Structure) => {
      const jobs = state.getData<Job>("jobs", (job) => job.workers > 0);

      const consumption = new Map();
      const production = new Map();

      jobs.forEach((job: Job) => {
        const { costs, product, workers } = job;

        const modCost = _modify(costs, { workers });
        const modProd = _modify(product, { workers });

        if (state.costCheck(modCost)) {
          if (job.insufficient) {
            flip(`data.jobs.${job.index}.insufficient`, false);
          }

          _consume(modCost);
          _produce(modProd);

          modCost.forEach((cost) => {
            if (consumption.get(cost[0]))
              consumption.set(cost[0], consumption.get(cost[0]) + cost[1]);
            else consumption.set(cost[0], cost[1]);
          });

          modProd.forEach((prod) => {
            if (production.get(prod[0])) production.set(prod[0], production.get(prod[0]) + prod[1]);
            else production.set(prod[0], prod[1]);
          });
        } else if (!job.insufficient) {
          flip(`data.jobs.${job.index}.insufficient`, true);
          // console.log(state);
        }
      });

      dispatch({
        type: ActionTypes.SET,
        payload: {
          target: `data.structures.${str.index}.productionReport`,
          value: {
            production: Array.from(production),
            consumption: Array.from(consumption),
          },
        },
      });
    });
  };

  const calcBirths = () => {
    // Births
    // per 60 ticks, there is a chance for birth based on the settlements fertility,
    if (Math.random() * 100 <= state.state.empire.fertility) {
      const newCitizen = new Citizen({ role: "worker", birthTick: state.state.currentTick });
      dispatch({
        type: ActionTypes.PUSH,
        payload: {
          target: `data.census`,
          value: newCitizen,
          message: "Birth has occured!",
        },
      });
    }
  };

  const postMessage = ({ type, body }: { type: string; body: string }) => {
    push(`state.messages`, new Message({ type, body, tick: state.state.currentTick }));
  };

  const feedPop = () => {
    const foods = state.getFoods();
    const census = state.data.census;

    census.forEach((citizen) => {
      const food: Resource = foods[Math.floor(Math.random() * foods.length)];

      const cost: Parcel = [food.name, 1];

      if (state.costCheck([cost])) {
        dispatch({
          type: ActionTypes.DECREASE_BY,
          payload: {
            target: `data.resources.${food.index}.amount`,
            value: 1,
          },
        });
      } else {
        if (!state.checkStatus("insufficientFood")) {
          const statusIndex = state.getIndex("statuses", "insufficientFood");
          postMessage({ type: "warning", body: "You're running low on food!" });
          flip(`data.statuses.${statusIndex}.isActive`, true);
        }
      }
    });
  };

  return {
    performJobs,
    tick,
    play,
    flip,
    pause,
    build,
    destroy,
    setWorkers,
    calcBirths,
    feedPop,
    postMessage,
  };
};
