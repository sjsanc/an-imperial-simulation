import React, { createContext, useContext } from "react";
import { set, get } from "lodash/fp";
import { GameEngine, mainDataObject } from "./initialState";
import { concat } from "lodash";
import { StoreAction } from "../types/types";

export enum ActionTypes {
  INCREASE_BY = "increase_by",
  DECREASE_BY = "decrease_by",
  CLEAR = "clear",
  SET = "set",
  CREATE = "create",
  PUSH = "push",
}

export const g = new GameEngine(mainDataObject);

export type AppState = typeof g;

const logger = (action: StoreAction, message: string) => {
  if (message) console.log("ACTION:", action.type, "MSG:", message);
};

export const Store = createContext<{
  state: AppState;
  dispatch: React.Dispatch<StoreAction>;
}>({ state: g, dispatch: () => {} });

const storeReducer = (state: AppState, action: StoreAction) => {
  const { type } = action;
  const { payload } = action;

  switch (type) {
    case ActionTypes.INCREASE_BY:
      return (state = set(payload.target, get(payload.target, state) + payload.value, state));
    case ActionTypes.DECREASE_BY:
      return (state = set(payload.target, get(payload.target, state) - payload.value, state));
    case ActionTypes.SET:
      return (state = set(payload.target, payload.value, state));
    case ActionTypes.PUSH:
      return (state = set(
        payload.target,
        concat(get(payload.target, state), payload.value),
        state
      ));
    default:
      return state;
  }
};

const useReducerWithMiddleware = (
  reducer: (state: AppState, action: StoreAction) => GameEngine,
  initialState: GameEngine,
  middleware: any
): [GameEngine, React.Dispatch<StoreAction>] => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const dispatchWithMiddleware = (action: StoreAction) => {
    middleware(action, action.payload.message);
    state.dispatchCount++;
    dispatch(action);
  };

  return [state, dispatchWithMiddleware];
};

export const ContextProvider = (props: any) => {
  const [state, dispatch] = useReducerWithMiddleware(storeReducer, g, logger);

  return <Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>;
};

export const useStore = () => {
  return useContext(Store);
};
