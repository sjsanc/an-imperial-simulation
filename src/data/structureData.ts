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
    name: "hut",
    desc:
      "Quaint, modest housing for your many citizens. Warm enough to keep them warm at winter, but nothing too fancy.",
    type: "housing",
    amount: 0,
    unique: false,
    available: true,
    built: false,
    cost: [{ name: "wood", amount: 150 }],
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
    cost: [{ name: "wood", amount: 350 }],
    jobs: ["farm wheat"],
  },
  {
    name: "well",
    desc:
      "A circular well built above an aquifer that continuously supplies clean water",
    type: "passive",
    amount: 0,
    unique: false,
    available: true,
    built: false,
    cost: [
      { name: "stone", amount: 100 },
      { name: "wood", amount: 50 },
    ],
    jobs: [],
  },
  {
    name: "sundial",
    desc:
      "A curious device that tells the passing of the hours. It said that many who ponder its design are struck with moments of inspiration.",
    type: "research",
    amount: 0,
    unique: true,
    available: true,
    built: false,
    cost: [{ name: "stone", amount: 50 }],
    jobs: [],
  },
  {
    name: "blacksmith",
    desc:
      "The blacksmith is the heart of any industrial empire, producing everything from crude nails to glittering blades.",
    type: "production",
    amount: 0,
    unique: true,
    available: false,
    built: false,
    cost: [
      { name: "stone", amount: 250 },
      { name: "wood", amount: 250 },
    ],
    jobs: ["blacksmith"],
  },
  {
    name: "mage tower",
    desc: "a cool tower",
    type: "faction",
    amount: 0,
    unique: true,
    available: false,
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
