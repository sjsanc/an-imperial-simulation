import { JobProps } from "../classes/Job";

const jobs: JobProps[] = [
  {
    name: "grow wheat",
    description:
      "Cereals are the cornerstone of civilisation and will be needed in abundance as your Empire grows",
    initials: "GW",
    costs: [["water", 5]],
    product: [["food", 10]],
  },
  {
    name: "Grow sugarbeets",
    description: "Beets are the fat an sassy cousin of turnips.",
    costs: [["water", 5]],
    product: [["food", 7]],
  },
];

export default jobs;

// Product = baseProduct * worker count, per second
// e.g. (0.5 * 2)/s
// Because resources are integers, unfinished product is kept in holding
// if there's overlap then it will carry over to the next product.
// if a job is set to inactive then the unfinished product is wiped
// consumption still occurs per second
