import { ResourceProps } from "../classes/Resource";

const resources: ResourceProps[] = [
  // ================================================================================= //
  // RAW MATERIAL
  // ================================================================================= //
  {
    name: "wood",
    description: "Some hard wood lol",
    amount: 100,
    resourceType: "raw_material",
    iconPath: "552",
    value: 1,
  },
  {
    name: "stone",
    description: "Rough, undressed blocks of stone",
    iconPath: "549",
    resourceType: "raw_material",
    amount: 100,
    value: 1,
  },
  {
    name: "dressed stone",
    description: "",
    iconPath: "548",
    resourceType: "raw_material",
    value: 3,
  },

  // ================================================================================= //
  // RAW PERISHABLE
  // ================================================================================= //
  {
    name: "wheat",
    description: "Golden sheafs of unprocessed, inedible wheat",
    resourceType: "raw_perishable",
    iconPath: "268",
    value: 1,
  },

  // ================================================================================= //
  // GOODS
  // ================================================================================= //
  {
    name: "glass",
    description: "",
    iconPath: "418",
    resourceType: "goods_industrial",
    value: 3,
  },
  {
    name: "rivets",
    description: "",
    iconPath: "821",
    resourceType: "goods_industrial",
    value: 1,
  },
  {
    name: "machinery",
    description: "",
    iconPath: "",
    resourceType: "goods_industrial",
    value: 5,
  },
  // ================================================================================= //
  // FOOD
  // ================================================================================= //
  {
    name: "berries",
    description: "Golden sheafs of wheat",
    resourceType: "food_cheap",
    iconPath: "229",
  },
  {
    name: "bread",
    description: "Golden sheafs of wheat",
    resourceType: "food_cheap",
    iconPath: "235",
  },
  {
    name: "water",
    resourceType: "liquid_",
    description: "The liquid of life!",
    iconPath: "761",
  },
];

export default resources;
