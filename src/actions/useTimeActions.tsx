import { ActionTypes, useStore } from "../store/store";

const useTimeActions = () => {
  const { dispatch } = useStore();

  const tick = () => {
    dispatch({
      type: ActionTypes.INCREASE_BY,
      payload: {
        target: "currentTick",
        value: 1,
      },
    });
  };

  const pause = () => {
    dispatch({
      type: ActionTypes.SET,
      payload: {
        target: "gameLoopRunning",
        value: false,
        message: "Game paused",
      },
    });
  };

  const play = () => {
    dispatch({
      type: ActionTypes.SET,
      payload: {
        target: "gameLoopRunning",
        value: true,
        message: "Game started",
      },
    });
  };

  return { tick, pause, play };
};

export default useTimeActions;
