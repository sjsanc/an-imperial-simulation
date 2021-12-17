import { Module } from "../classes/Module";

const modules: Module[] = [
  new Module({
    name: "woodblock",
    description: "A block of wood for chopping",
    baseBuildCost: [["wood", 10]],
    modifiers: [],
  }),
];

export default modules;
