import { EffectReference, Parcel } from "../types/types";
import { Effect } from "./Effect";

export class Research {
  name: string = "";
  description: string = "";
  researchCost: Parcel[] = [];
  effects: EffectReference[] = [];
  index: number = 0;

  constructor(init: Partial<Research>) {
    Object.assign(this, init);
  }
}
