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
    value: 50,
    volume: 5,
    effects: [
      {
        name: "raisePopCap",
        amount: 3,
        multipliers: ["structures.0.builtCount"],
      },
    ],
    buildCost: [["wood", 50]],
  },
  {
    name: "cottage",
    description: "A cosy, familial home centered around a cheerful hearth.",
    structureType: "housing",
    value: 60,
    volume: 12,
    upgrades: [],
    prereqs: {
      structures: ["hut"],
    },
    buildCost: [
      ["wood", 75],
      ["stone", 25],
    ],
  },
  {
    name: "townhouse",
    structureType: "housing",
    description:
      "A modest home with enough space for a hardworking city family and perhaps a servant or two.",
    value: 55,
    volume: 20,
    upgrades: [],
    prereqs: {
      structures: ["cottage"],
      research: ["scaffolding", "city planning"],
    },
    buildCost: [
      ["wood", 100],
      ["stone", 70],
      ["rivets", 30],
    ],
  },
  {
    name: "insulae",
    structureType: "housing",
    description:
      "A densely packed rise of apartments. Efficient use of space; low quality of living. Attracts firebugs.",
    value: 70,
    volume: 10,
    prereqs: {
      structures: ["cottage"],
      research: ["scaffolding", "city planning"],
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
    value: 80,
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
    value: 5,
    volume: 30,
    description:
      "The agricultural building blocks of any budding empire. Produces a range of essential goods.",
    jobs: ["grow wheat", "farm beets"],
    structureType: "material",
    upgrades: ["ensorcelled beehives"],
    buildCost: [
      ["wood", 30],
      ["stone", 15],
    ],
  },
  {
    name: "ranger's lodge",
    description: "",
    structureType: "material",
    jobs: ["forage", "hunt woodland beasts", "hunt bog beasts", "hunt darkwood beasts"],
    upgrades: [],
    buildCost: [],
  },
  {
    name: "quarry",
    description:
      "A place to pull raw minerals from the earth. An unpleasant place to be after it rains.",
    structureType: "material",
    value: 20,
    volume: 50,
    jobs: ["quarry stone", "quarry clay", "quarry marble"],
    prereqs: {
      structures: ["farmstead"],
      research: ["scaffolding"],
    },
    buildCost: [
      ["wood", 80],
      ["stone", 50],
    ],
  },
  {
    name: "mine",
    description: "",
    structureType: "material",
    value: 20,
    volume: 30,
    jobs: ["mine coal", "mine ore", "mine gemstones", "mine crystals"],
    upgrades: ["heatshields", "immortal canaries", "trog guides"],
    prereqs: {
      structures: ["farmstead"],
      research: ["scaffolding"],
    },
    buildCost: [
      ["wood", 100],
      ["stone", 50],
    ],
  },
  // ================================================================================= //
  // Crafting
  // ================================================================================= //
  {
    name: "smelter",
    description: "",
    structureType: "crafting",
    value: 25,
    volume: 20,
    jobs: [
      "smelt iron ingots",
      "smelt steel ingots",
      "smelt gold ingots",
      "smelt silver ingots",
      "smelt mithril ingots",
      "smelt dragonscale ingots",
    ],
    upgrades: ["goblin techniques", "dwarven hammers", "arcanotrolysis"],
    prereqs: {
      structures: ["mine"],
      research: ["metallurgy"],
    },
    buildCost: [
      ["wood", 120],
      ["stone", 50],
      ["clay", 200],
    ],
  },
  {
    name: "forge",
    description: "A place to make iron nails and some such",
    structureType: "crafting",
    jobs: ["forge rivets", "forge rebar"],
    upgrades: ["enchanted anvils"],
    prereqs: {
      structures: ["smelter"],
    },
    buildCost: [
      ["wood", 30],
      ["stone", 15],
      ["iron ingots", 30],
    ],
  },
  {
    name: "armoury",
    description: "",
    structureType: "crafting",
    jobs: [
      "forge iron blades",
      "forge steel blades",
      "forge mithril blades",
      "forge iron armor",
      "forge steel armor",
      "forge mithril armor",
    ],
    upgrades: [""],
    prereqs: {
      structures: ["forge"],
    },
  },
  {
    name: "stonecutter",
    structureType: "crafting",
    jobs: ["cut stone blocks", "cut marble blocks"],
    prereqs: {
      structures: ["quarry"],
    },
    buildCost: [
      ["wood", 30],
      ["stone", 15],
      ["iron ingots", 20],
    ],
  },
  {
    name: "tannery",
    structureType: "crafting",
    jobs: ["tan hides"],
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

// JOBS?
// Jobs might have configurable properties to make them more interesting.
// For example, late game, "forge iron sword" becomes a bit useless if the progression is standard iron => steel
// Instead, "forge sword" with configurable resource consumption might be better from a gameplay standpoint
// "Forge blades" => producing 1 iron blade, 1 steel and 1 mithril per turn?
