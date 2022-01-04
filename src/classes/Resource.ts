import { GameEngine } from "../store/initialState";
import { DataClasses, ResourceTypes } from "../types/types";

export interface ResourceProps {
  name: string;
  description: string;
  amount?: number;
  iconPath?: string;
  resourceType: ResourceTypes;
}
export class Resource {
  name: string = "";
  description: string = "";
  iconPath: string = "";
  index: number = 0;

  resourceType = "";
  category = "";
  type = "resources" as keyof DataClasses;
  // engine: GameEngine;
  amount: number = 0;

  constructor(props: ResourceProps) {
    Object.assign(this, props);
    this.category = this.resourceType.match(/^.*?(?=_)/)[0];
  }
}
