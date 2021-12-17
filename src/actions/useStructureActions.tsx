import { checkCostArray, getAvailableWorkers, getIndices, getItem } from "../helpers/storeHelpers";
import { ActionTypes, useStore } from "../store/store";
import useResourceActions from "./useResourceActions";

const useStructureActions = () => {
  const { state, dispatch } = useStore();
  const { consumeCosts } = useResourceActions();

  // const setWorker = (jobname: string) => {
  //   const [jobIndex, job] = getItem(jobname, state.jobs);
  //   if (job) {
  //     if (getAvailableWorkers(state) > 0) {
  //       dispatch({
  //         type: ActionTypes.INCREASE_BY,
  //         payload: {
  //           target: `jobs.${jobIndex}.assignedWorkerCount`,
  //           value: 1,
  //           message: "Worker assigned to job",
  //         },
  //       });
  //       dispatch({
  //         type: ActionTypes.INCREASE_BY,
  //         payload: {
  //           target: `population.workers`,
  //           value: 1,
  //         },
  //       });
  //     } else {
  //       console.log("No available workers");
  //     }
  //   }
  // };

  // const removeWorker = (jobname: string) => {
  //   const [jobIndex, job] = getItem(jobname, state.jobs);
  //   if (job) {
  //     dispatch({
  //       type: ActionTypes.DECREASE_BY,
  //       payload: {
  //         target: `jobs.${jobIndex}.assignedWorkerCount`,
  //         value: 1,
  //         message: "Worker assigned to job",
  //       },
  //     });
  //     dispatch({
  //       type: ActionTypes.DECREASE_BY,
  //       payload: {
  //         target: `population.workers`,
  //         value: 1,
  //       },
  //     });
  //   }
  // };

  // const buildModule = (name: string) => {
  //   const [modIndex, mod] = getItem(name, state.modules);
  //   if (mod && checkCostArray(mod.baseBuildCost, state.resources)) {
  //     let costIndices = getIndices(mod.baseBuildCost, state.resources);
  //     consumeCosts(mod.baseBuildCost, costIndices);
  //   }
  // };

  // const buildStructure = (name: string) => {
  //   // get target structure and structure index
  //   const [strIndex, str] = getItem(name, state.structures);
  //   if (str) {
  //     // get indicies of all required costs
  //     const costIndices = getIndices(str.baseBuildCost, state.resources);

  //     // check if build job passes resource requirements
  //     // and pass typo check
  //     if (costIndices && checkCostArray(str.baseBuildCost, state.resources)) {
  //       // perform consumption job per cost
  //       consumeCosts(str.baseBuildCost, costIndices);

  //       // build structure
  //       dispatch({
  //         type: ActionTypes.INCREASE_BY,
  //         payload: {
  //           target: `structures.${strIndex}.builtCount`,
  //           value: 1,
  //           message: `${str.name} built.`,
  //         },
  //       });
  //     } else {
  //       console.log("Insufccient resources");
  //     }
  //   } else {
  //     console.log("Unable to find building");
  //   }
  // };

  // const destroyStructure = (name: string) => {
  //   const [strIndex, str] = getItem(name, state.structures);
  //   if (str && str.builtCount > 0) {
  //     dispatch({
  //       type: ActionTypes.DECREASE_BY,
  //       payload: {
  //         target: `structures.${strIndex}.builtCount`,
  //         value: 1,
  //         message: `${str.name} destroyed`,
  //       },
  //     });
  //   } else {
  //     console.log("builtCount is too low");
  //   }
  // };

  // return { buildStructure, destroyStructure, buildModule, setWorker, removeWorker };
  return {};
};

export default useStructureActions;
