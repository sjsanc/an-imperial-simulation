import { StructureProps } from "../classes/Structure";

const structures: StructureProps[] = [
  // ================================================================================= //
  // HOUSING
  // ================================================================================= //
  {
    name: "hut",
    description:
      "A primitive shelter made from sticks and mud, yet crucial for hiding from the harsh elements.",
    structureType: "housing",
    value: 1,
    volume: 5,
    effects: [
      {
        name: "raisePopCap",
        amount: 3,
        multipliers: ["structures.0.builtCount"],
      },
    ],
    buildCost: [["wood", 25]],
  },
  {
    name: "cottage",
    description: "A cosy, familial home centered around a cheerful hearth.",
    structureType: "housing",
    value: 3,
    volume: 12,
    upgrades: [],
    prereqs: {
      structures: ["hut"],
    },
    buildCost: [
      ["wood", 50],
      ["stone", 25],
    ],
  },
  {
    name: "insulae",
    structureType: "housing",
    description:
      "A densely packed rise of apartments. Efficient use of space; low quality of living. Attracts firebugs.",
    value: 15,
    volume: 10,
    prereqs: {
      structures: ["cottage"],
      research: ["scaffolding"],
    },
    buildCost: [
      ["wood", 120],
      ["stone", 50],
      ["rivets", 25],
    ],
  },
  {
    name: "city manor",
    description:
      "A well-situated, lavishly appointed property. These manors serve as the residences of your city's finest.",
    structureType: "housing",
    volume: 35,
    value: 25,
    prereqs: {
      structures: ["insulae"],
      research: ["arches & vaults"],
    },
    buildCost: [
      ["wood", 120],
      ["dressed stone", 55], //548
      ["rivets", 100],
      ["glass", 25], //418
    ],
  },

  // ================================================================================= //
  // Industry
  // ================================================================================= //
  {
    name: "farmstead",
    initials: "FS",
    description:
      "The agricultural building blocks of any budding empire. Produces a range of essential goods.",
    jobs: ["grow wheat", "farm beets"],
    structureType: "industry",
    upgrades: ["crop rotation"],
    buildCost: [
      ["wood", 1000],
      ["stone", 15],
    ],
  },
  {
    name: "quarry",
    structureType: "industry",
    jobs: ["extract stone", "quarry clay", "extract marble"],
  },
  {
    name: "mine",
    structureType: "industry",
    jobs: ["mine coal", "mine iron ore", "mine gold", "mine silver", "mine gemstones"],
  },
  {
    name: "smelter",
    structureType: "industry",
    jobs: ["smelt iron", "smelt gold", "smelt silver", "smelt steel"],
  },

  // ================================================================================= //
  // Manufacturing
  // ================================================================================= //
  {
    name: "blacksmith",
    description: "A place to make iron nails and some such",
    jobs: ["forge nails", "forge rebar"],
    structureType: "crafting",
    upgrades: ["enchanted anvils"],
    buildCost: [["wood", 20]],
  },
  {
    name: "stonecutter",
    jobs: ["cut stone blocks", "cut marble blocks"],
    structureType: "crafting",
  },

  // ================================================================================= //
  // Civil
  // ================================================================================= //
  {
    name: "library",
    description: "A black to keep books!",
    structureType: "civil",
    // Enables Research
  },
  {
    name: "bureau of census",
    structureType: "civil",
    // Enables Census
  },
  {
    name: "embassy",
    structureType: "civil",
    // Enables Allegiances
  },

  // ================================================================================= //
  // Magic
  // ================================================================================= //
  {
    name: "arcanisterium",
    structureType: "magic",
  },
];

export default structures;
