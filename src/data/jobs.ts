import { Job } from "../classes/Job";

const jobs: Job[] = [
  new Job({
    name: "sleep",
    baseCost: [],
    baseProduct: [["wood", 10]],
  }),
  new Job({
    name: "produce soldiers",
    baseCost: [["wood", 10]],
    baseProduct: [["wood", 10]],
  }),
];

export default jobs;

// Product = baseProduct * worker count, per second
// e.g. (0.5 * 2)/s
// Because resources are integers, unfinished product is kept in holding
// if there's overlap then it will carry over to the next product.
// if a job is set to inactive then the unfinished product is wiped
// consumption still occurs per second
