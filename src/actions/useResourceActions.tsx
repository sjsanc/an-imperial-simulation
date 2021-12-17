import { ActionTypes, useStore } from "../store/store";
import { Parcel } from "../types/types";
import {
  checkCostArray,
  getAvailableWorkers,
  getJobIndices,
  getItem,
} from "../helpers/storeHelpers";

const useResourceActions = () => {
  const { state, dispatch } = useStore();

  const consumeCosts = (costArray: Parcel[], costIndices: number[]) => {
    costArray.forEach((cost, i) => {
      dispatch({
        type: ActionTypes.DECREASE_BY,
        payload: {
          target: `resources.${costIndices[i]}[1]`,
          value: cost[1],
          message: "Resources consumed",
        },
      });
    });
  };

  const produceResources = (prodArray: Parcel[], prodIndices: number[]) => {
    prodArray.forEach((prod, i) => {
      dispatch({
        type: ActionTypes.INCREASE_BY,
        payload: {
          target: `resources.${prodIndices[i]}[1]`,
          value: prod[1],
          message: "Resources consumed",
        },
      });
    });
  };

  return { consumeCosts, produceResources };
};

export default useResourceActions;
