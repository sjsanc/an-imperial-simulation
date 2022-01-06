import { getInitials } from "../helpers/displayHelpers";
import {
  Buildable,
  DataClasses,
  EffectReference,
  Parcel,
  PreReqs,
  StructureTypes,
} from "../types/types";

export interface StructureProps {
  name: string;
  structureType: StructureTypes;

  description?: string;
  jobs?: string[];
  upgrades?: string[];
  buildCost?: Parcel[];
  effects?: EffectReference[];
  prereqs?: PreReqs;
  value?: number;
  volume?: number;
  initials?: string;
}

export class Structure implements Buildable {
  name = "";
  initials = "";
  description: string = "placeholder description";
  type = "structures" as keyof DataClasses;
  index: number = 0;

  value: number = 0; // for calc empire value
  volume: number = 0; // how much space it takes up

  buildCost: Parcel[] = [];

  jobs: string[] = [];
  upgrades: string[] = [];
  effects: EffectReference[] = [];

  structureType = ""; // subdivision i.e. "housing"

  // Allows for the structure to be built, even if prereqs are no longer met
  // Useful for debugging, but also allow for space clearence in late game
  isBuildable: false;

  isFrozen: false; // whether the jobs are running
  builtCount: number = 0;

  prereqs: PreReqs = {
    structures: [],
    achievements: [],
    research: [],
  };

  productionReport: any = {
    consumption: [],
    production: [],
  };

  constructor(props: StructureProps) {
    Object.assign(this, props);
    if (!props.initials) this.initials = getInitials(props.name);
  }

  isActive() {
    // Determines whether the structure CAN be built
    return true;
  }

  hasJobs() {
    if (this.jobs.length > 0) return true;
    else return false;
  }

  isBuilt() {
    if (this.builtCount > 0) return true;
    else return false;
  }
}

// Structure A has 2 active jobs
// Job 1 produces 5 wood and consume 2 gold per tick
// Job 2 produces 10 wood and consumes 3 food per tick
// Each tick, the jobs send a report to the structure
// The structure combines like resources into a display
