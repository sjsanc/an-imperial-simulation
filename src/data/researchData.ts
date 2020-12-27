import { Research } from "../slices/researchSlice";

export const researchData: Research[] = [
  {
    name: "esoteric botany",
    prereqs: [],
    complete: false,
    cost: 1000,
  },
  {
    name: "science",
    prereqs: [],
    complete: false,
    cost: 1000,
  },
  {
    name: "glassblowing",
    prereqs: ["science"],
    complete: false,
    cost: 1000,
  },
];
