import { ResPreType, ResAdditions } from "./../types.d";

import { mergeData } from "../tools/utils";

const additions: ResAdditions = {
  amount: 0,
};

// DIVIDE BY CATEGORY FOR EASIER STRUCTURE
const raw: ResPreType[] = [
  {
    name: "wood",
    desc: "Sturdy, naturally occuring and abundant",
    category: "raw",
  },
  {
    name: "stone",
    desc: "",
    category: "raw",
  },
  {
    name: "water",
    desc: "slipper stuff for drowning people in",
    category: "raw",
  },
  {
    name: "tannin",
    desc: "",
    category: "raw",
  },
  {
    name: "rawhide",
    desc: "",
    category: "raw",
  },
  {
    name: "cotton",
    desc: "",
    category: "raw",
  },
  {
    name: "silkthread",
    desc: "",
    category: "raw",
  },
  {
    name: "manure",
    desc: "",
    category: "",
  },
  {
    name: "wool",
    desc: "",
    category: "",
  },
  {
    name: "iron ore",
    desc: "",
    category: "",
  },
  {
    name: "coal",
    desc: "",
    category: "",
  },
  {
    name: "coke",
    desc: "",
    category: "",
  },
  {
    name: "steel ingots",
    desc: "",
    category: "",
  },
  {
    name: "iron ingots",
    desc: "cubes of metal!",
    category: "",
  },
];

const food: ResPreType[] = [
  {
    name: "raw meat",
    desc: "delicious red stuff",
    category: "food",
  },
  {
    name: "cooked meat",
    desc: "",
    category: "",
  },
  {
    name: "berries",
    desc: "tasty little berries",
    category: "food",
  },
  {
    name: "wheat",
    desc: "",
    category: "food",
  },
  {
    name: "tubers",
    desc: "",
    category: "food",
  },
  {
    name: "grapes",
    desc: "",
    category: "food",
  },
  {
    name: "apples",
    desc: "",
    category: "food",
  },
  {
    name: "stew",
    desc: "",
    category: "",
  },
  {
    name: "bread",
    desc: "",
    category: "",
  },
  {
    name: "cake",
    desc: "",
    category: "",
  },
  {
    name: "eggs",
    desc: "",
    category: "",
  },
  {
    name: "milk",
    desc: "",
    category: "",
  },
];

const fabricated: ResPreType[] = [
  {
    name: "iron nails",
    desc: "some hobnails",
    category: "fabricated",
  },
  {
    name: "iron swords",
    desc: "",
    category: "fabricated",
  },
];

const advanced: ResPreType[] = [
  {
    name: "liferoot",
    desc: "",
    category: "advanced",
  },
];

const misc: ResPreType[] = [
  {
    name: "research",
    desc: "RESEARCH!",
    category: "misc",
  },
];

const rawData = [raw, food, fabricated, misc].flat();

export const resData = mergeData(rawData, additions);
