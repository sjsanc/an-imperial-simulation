import { Research } from "../slices/researchSlice";

export const researchData: Research[] = [
  {
    name: "esoteric botany",
    desc:
      "Enables Expert Foraging, allowing your foragers to pry from the forest floor even the rarest of secrets.",
    prereqs: [],
    complete: false,
    cost: 2500,
  },
  {
    name: "well-drilling",
    desc:
      "Allows you to build Wells. Digging wholes that won't collapse can hard, as is finding clean aquifers.",
    prereqs: [],
    complete: false,
    cost: 500,
  },
];
