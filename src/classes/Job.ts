import { DataClasses } from "./../types/types.d";
import { Item, Parcel } from "../types/types";
import { GameEngine } from "../store/initialState";

export interface JobProps {
  name: string;
  initials?: string;
  description: string;
  costs: Parcel[];
  product: Parcel[];
}

export class Job {
  name: string = "";
  initials = "";
  description: string = "";
  costs: Parcel[] = [];
  product: Parcel[] = [];
  insufficient = false;
  index: number = 0;

  workers = 0;

  // engine: GameEngine;
  type = "jobs" as keyof DataClasses;

  constructor(props: JobProps) {
    Object.assign(this, props);
    if (!props.initials) this.initials = props.name[0];
  }
}
