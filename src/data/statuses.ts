import { StatusProps } from "../classes/Status";

export const statuses: StatusProps[] = [
  {
    name: "insufficientFood",
    duration: 0,
    statusType: "warning",
    message: "You're running low on food. You have enough for {{value}} days.",
    effects: [],
  },
  {
    name: "lowResources",
    duration: 0,
    statusType: "warning",
    message: "Some of your jobs can't be finished due to insufficient resources.",
    effects: [],
  },
];

export default statuses;
