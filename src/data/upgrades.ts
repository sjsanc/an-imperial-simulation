import { UpgradeProps } from "../classes/Upgrade";

const upgrades: UpgradeProps[] = [
  {
    name: "ensorcelled beehives",
    description: "Magical bees that require no tending!",
    buildCost: [
      ["wood", 25],
      ["berries", 25],
    ],
    // effects: [["produceResource", 5, "honey"]],
  },
];

export default upgrades;
