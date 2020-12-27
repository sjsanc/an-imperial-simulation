import { JobAdditions, JobPreType } from "./../types.d";

import { mergeData } from "../tools/utils";

const additions: JobAdditions = {
  completed: 0,
  workers: 0,
  progress: 0,
  insuff: undefined,
};

const rawData: JobPreType[] = [
  {
    name: "forage",
    desc: "Scour the landscape for useful stuff.",
    cost: [],
    product: [
      { name: "berries", amount: 5 },
      { name: "wood", amount: 3 },
      { name: "stone", amount: 3 },
    ],
    parentStructure: "basic",
    duration: 1,
    research: [],
  },
  {
    name: "expert foraging",
    desc:
      "Uncover the secrets of the forest with help of many years of experience.",
    cost: [],
    product: [
      { name: "liferoot", amount: 2 },
      { name: "tannin", amount: 2 },
    ],
    parentStructure: "basic",
    duration: 4,
    research: ["esoteric botany"],
  },
  {
    name: "hunt",
    desc: "Murder the woodland critters for their meat.",
    cost: [],
    product: [
      { name: "raw meat", amount: 5 },
      { name: "rawhide", amount: 2 },
    ],
    parentStructure: "basic",
    duration: 3,
    research: [],
  },
  {
    name: "fetch water",
    desc: "Fetch some clean water from a muddy well.",
    cost: [],
    product: [{ name: "water", amount: 15 }],
    parentStructure: "basic",
    duration: 1,
    research: [],
  },
  {
    name: "blacksmith",
    desc: "make some cool stuff from iron",
    cost: [
      { name: "iron ingots", amount: 2 },
      { name: "flux", amount: 2 },
    ],
    product: [{ name: "iron nails", amount: 10 }],
    parentStructure: "blacksmith",
    duration: 3,
    research: [],
  },
  {
    name: "farm wheat",
    desc: "tend to a golden wheat farm!",
    cost: [],
    product: [
      {
        name: "grain",
        amount: 5,
      },
    ],
    parentStructure: "farmhouse",
    duration: 10,
    research: [],
  },
];

export const jobData = mergeData(rawData, additions);
