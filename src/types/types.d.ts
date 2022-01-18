import { ActionTypes } from "../store/store";
import { StoreInterfaceKeys } from "./store";

interface StoreAction {
  type: ActionTypes;
  payload: {
    target: StoreInterfaceKeys;
    value: any;
    message?: string;
  };
}

export interface DataObject {
  [key: string]: {
    constructor: (props: any) => any;
    data: any[];
  };
}

export type Parcel = [string, number];

export interface DataClasses {
  jobs: Job[];
  research: Research[];
  resources: Resource[];
  upgrades: Upgrade[];
  structures: Structure[];
  effects: Effect[];
  census: Citizen[];
  statuses: Status[];
}

export type DataClass = Job | Research | Resource | Upgrade | Structure | Effect | Citizen | Status;

interface Item {
  name: string;
  description: string;
  index: number;
  // value: number;
  type: keyof DataClasses;
}

interface Buildable extends Item {
  buildCost: Parcel[];
  builtCount: number;
}

type StructureTypes =
  | "all"
  | "housing"
  | "material"
  | "crafting"
  | "civil"
  | "military"
  | "administration"
  | "defense"
  | "diplomacy"
  | "magic";

type ResourceTypes =
  | "raw_material"
  | "raw_perishable"
  | "food_cheap"
  | "food_good"
  | "food_lavish"
  | "food_magic"
  | "liquid_"
  | "goods_industrial"
  | "goods_armaments"
  | "goods_arcane"
  | "goods_religious"
  | "misc_";

interface EffectReference {
  name: string;
  amount: number;
  multipliers: Leaves<DataClasses>[];
}

interface PreReqs {
  structures?: string[];
  research?: string[];
  achievements?: string[];
}
