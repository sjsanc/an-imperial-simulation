import { Job } from "../classes/Job";
import { checkCostArray, getIndices, getItem, getFlatList } from "../helpers/storeHelpers";
import { useStore } from "../store/store";
import useResourceActions from "./useResourceActions";

const useJobActions = () => {
  const { state } = useStore();
  const { consumeCosts, produceResources } = useResourceActions();

  const performActiveJobs = () => {
    const activeStructures = state.structures.filter((s) => s.builtCount > 0);
    // const activeJobsS = getFlatList(activeStructures, "jobNames", (job: Job) => job.isActive());

    console.log(state.structures);

    // console.log(activeJobsS);

    const activeJobs = state.jobs.filter((j) => j.isActive());

    activeJobs.forEach((job) => {
      let sufficient = checkCostArray(job.baseCost, state.resources);
      // const jobIndex = state.jobs.indexOf(job);

      if (sufficient) {
        let costIndices = getIndices(job.baseCost, state.resources);
        console.log(costIndices);

        if (costIndices.length > 0) {
          consumeCosts(job.baseCost, costIndices);
        }

        const prodIndices = getIndices(job.baseProduct, state.resources);
        if (prodIndices.length > 0) {
          produceResources(job.baseProduct, prodIndices);
        }

        // generateReport(job);
      }
    });
  };

  return { performActiveJobs };
};

export default useJobActions;

// Each structure must display the total input/output of each job running on it
// To do this, send a "report" to each parent structure at the end of every performance cycle.
