import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jobData } from "../data/jobData";

type PerformPayloadType = {
  jobname: string;
  type: "progress" | "complete";
};

type AssignPayloadType = {
  jobname: string;
  amount: number;
  type: "inc" | "desc";
};

type InsuffPayloadType = {
  jobname: string;
  bool: boolean;
};

const initialState = {
  jobs: jobData,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setInsufficient: (state, action: PayloadAction<InsuffPayloadType>) => {
      state.jobs.find((job) => job.name === action.payload.jobname)!.insuff =
        action.payload.bool;
    },
    performJob: (state, action: PayloadAction<PerformPayloadType>) => {
      switch (action.payload.type) {
        case "progress":
          state.jobs.find(
            (job) => job.name === action.payload.jobname
          )!.progress += 1;
          break;
        case "complete":
          state.jobs.find(
            (job) => job.name === action.payload.jobname
          )!.progress = 0;
          state.jobs.find(
            (job) => job.name === action.payload.jobname
          )!.completed += 1;

          break;
        default:
          console.error("Could not perform job");
          break;
      }
    },
    assignWorker: (state, action: PayloadAction<AssignPayloadType>) => {
      switch (action.payload.type) {
        case "inc":
          state.jobs.find(
            (job) => job.name === action.payload.jobname
          )!.workers += action.payload.amount;
          break;
        case "desc":
          state.jobs.find(
            (job) => job.name === action.payload.jobname
          )!.workers -= action.payload.amount;
      }
    },
  },
});

export const { performJob, assignWorker, setInsufficient } = jobsSlice.actions;
export default jobsSlice.reducer;
