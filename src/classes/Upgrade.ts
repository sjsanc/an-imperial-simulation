import { GameEngine } from "../store/initialState";
import { DataClasses, EffectReference, Parcel } from "../types/types";

export interface UpgradeProps {
  name: string;
  description: string;
  buildCost: Parcel[];
  effects?: EffectReference[];
}

export class Upgrade {
  name: string = "";
  description: string = "";
  baseBuildCost: Parcel[] = [];
  effects: EffectReference[] = [];

  // engine: GameEngine;
  type = "upgrades" as keyof DataClasses;

  constructor(props: UpgradeProps) {
    Object.assign(this, props);
    // this.engine = engine;
  }
}
