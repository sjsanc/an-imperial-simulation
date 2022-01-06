import { getInitials } from "../helpers/displayHelpers";
import { GameEngine } from "../store/initialState";
import { Buildable, DataClasses, EffectReference, Parcel, PreReqs } from "../types/types";

export interface UpgradeProps {
  name: string;
  description: string;
  initials?: any;
  buildCost: Parcel[];
  effects?: EffectReference[];
}

export class Upgrade implements Buildable {
  name: string = "";
  description: string = "";
  initials = "";
  index = 0;

  buildCost: Parcel[] = [];
  effects: EffectReference[] = [];

  type = "upgrades" as keyof DataClasses;
  isBuildable = false;
  builtCount = 0;

  prereqs: PreReqs = {
    structures: [],
    achievements: [],
    research: [],
  };

  constructor(props: UpgradeProps) {
    Object.assign(this, props);
    if (!props.initials) this.initials = getInitials(props.name);
  }
}
