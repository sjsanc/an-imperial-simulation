import { Research } from "../slices/researchSlice";

export const jobResearchReqCheck = (
  prereqs: string[],
  researchEntities: any
) => {
  let complete = 0;
  Object.values(researchEntities).forEach((res: any) => {
    if (prereqs.includes(res.name) && res.complete) complete++;
  });
  if (complete === prereqs.length) return true;
  else return false;
};
