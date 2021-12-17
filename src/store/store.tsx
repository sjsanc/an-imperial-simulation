import React, { createContext, useContext } from "react";
import { set, get } from "lodash/fp";
import { g, GameEngine } from "./initialState";

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

type DotNestedKeys<T> = (
  T extends object
    ? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<
        keyof T,
        symbol
      >]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

export type DocumentUpdate<T> = Partial<{ [key in DotNestedKeys<T>]: any & T }> & Partial<T>;
// const update = {} as DocumentUpdate<StoreInterface>;

type StoreInterfaceKeys = DotNestedKeys<GameEngine> | (string & {});

export enum ActionTypes {
  INCREASE_BY = "increase_by",
  DECREASE_BY = "decrease_by",
  CLEAR = "clear",
  SET = "set",
  CREATE = "create",
  PUSH = "push",
}

interface StoreAction {
  type: ActionTypes;
  payload: {
    target: StoreInterfaceKeys;
    value: any;
    message?: string;
  };
}

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
      const target = get(payload.target, state);
      target.push(payload.value);
      return (state = set(payload.target, target, state));
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

// NOTES
// Events on the UI will trigger a HANDLER
// Handlers will call ACTIONS
// Actions will mutate the store in same way, such as "build structure"
// But the Action will do this via range of CRUD primitives
// So the store only interacts with these primitives
