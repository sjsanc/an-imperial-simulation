import { find } from "./utils";
import { QuantType, ResType } from "../types";

// Takes a cost array, a resource list to reference and a modifier
// Returns the amount of times the cost array can be completed
// For structures, this would be 1
// For jobs with multiple workers, this could be 1 through n
export const costCheck = (costs: QuantType[], reslist: ResType[]) => {
  let suff = 0;
  costs.forEach((cost) => {
    let res = find(cost.name, reslist);
    if (cost.amount <= res.amount) suff++;
  });
  if (suff === costs.length) return true;
  else return false;
};
