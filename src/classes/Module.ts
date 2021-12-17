import { Parcel } from "../types/types";

export class Module {
  name: string = "";
  description: string = "";
  baseBuildCost: Parcel[] = [];
  modifiers: any = [];

  constructor(init: Partial<Module>) {
    Object.assign(this, init);
  }
}
