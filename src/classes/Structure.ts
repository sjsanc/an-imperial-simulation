import { Parcel } from "../types/types";
import { Job } from "./Job";
import * as data from "../data";
import { Module } from "./Module";

interface StructureProps {
  name: string;
  description: string;
  jobNames: string[];
  //   moduleNames: string[];
}

export class Structure {
  name: string;
  description: string;

  baseBuildCost: Parcel[] = [];
  jobs: Job[] = [];
  modules: Module[] = [];

  _reportStatus: any = null;
  _builtCount: number = 0;

  constructor(props: StructureProps) {
    this.name = props.name;
    this.description = props.description;
    // this.jobs = this.buildRef(props.jobNames, "jobs");
  }

  getTotalWorkers() {
    // loop through workers on all jobs
    return null;
  }

  //   buildRefs(nameList: string[], type: keyof DataClasses) {
  //     return data[type].filter((j) => nameList.includes(j.name));
  //   }
}

// Structure A has 2 active jobs
// Job 1 produces 5 wood and consume 2 gold per tick
// Job 2 produces 10 wood and consumes 3 food per tick
// Each tick, the jobs send a report to the structure
// The structure combines like resources into a display
