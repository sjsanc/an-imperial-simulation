import { StructureType } from "./../types.d";

export const structureData: StructureType[] = [
  // BASIC is a special structure
  {
    name: "basic",
    desc: "the essentials of empire management",
    type: "base",
    amount: 1,
    unique: true,
    available: false,
    built: true,
    cost: [],
    jobs: ["forage", "hunt", "fetch water"],
  },
  {
    name: "house",
    desc:
      "Quaint, modest housing for your many citizens. Warm enough to keep them warm at winter, but nothing too fancy.",
    type: "base",
    amount: 0,
    unique: false,
    available: true,
    built: false,
    cost: [
      { name: "wood", amount: 100 },
      { name: "iron nails", amount: 15 },
    ],
    jobs: [],
  },
  {
    name: "farmhouse",
    desc:
      "These self-sufficient manors employ your people to till their earth and nurture a range of crops.",
    type: "production",
    amount: 0,
    unique: false,
    available: true,
    built: false,
    cost: [
      {
        name: "wood",
        amount: 6,
      },
    ],
    jobs: ["farm wheat"],
  },
  {
    name: "blacksmith",
    desc: "a quaint smithy",
    type: "production",
    amount: 0,
    unique: true,
    available: true,
    built: false,
    cost: [
      {
        name: "wood",
        amount: 25,
      },
    ],
    jobs: ["blacksmith"],
  },
  {
    name: "mage tower",
    desc: "a cool tower",
    type: "faction",
    amount: 0,
    unique: true,
    available: true,
    built: false,
    cost: [
      {
        name: "wood",
        amount: 100,
      },
    ],
    jobs: [],
  },
];
