import { Parcel } from "../types/types";
import { Modifier } from "./Modifier";

export class Research {
  name: string = "";
  description: string = "";
  researchCost: Parcel[] = [];
  modifiers: Modifier[] = [];

  constructor(init: Partial<Research>) {
    Object.assign(this, init);
  }
}
