import { DataObject, EffectReference } from "./../types/types.d";
import { Job } from "../classes/Job";
import { Upgrade } from "../classes/Upgrade";
import { Resource } from "../classes/Resource";
import { Structure } from "../classes/Structure";
import * as data from "../data";
import { DataClass, DataClasses, Item, Parcel } from "../types/types";
import * as _ from "lodash";
import { Effect } from "../classes/Effect";
import { Citizen } from "../classes/Citizen";
import { Message } from "../classes/Message";
import { Status } from "../classes/Status";
import React from "react";
import { set, get } from "lodash/fp";

const classes = new Map(
  Object.entries({
    structures: Structure,
    upgrades: Upgrade,
    jobs: Job,
    resources: Resource,
    effects: Effect,
    statuses: Status,
  })
);

const compiledData = (classes: Map<string, any>) => {
  if (classes.size !== _.size(data)) {
    console.error(
      "Warning! A data class is missing from the list of compiled classes. Check for any errors."
    );
  }

  const compile = (cls, k) => {
    return { constructor: (x) => new cls(x), data: data[k] };
  };
  return Object.fromEntries(
    Object.entries(Object.fromEntries(classes)).map(([k, v], i) => [k, compile(v, k)])
  );
};

export const mainDataObject: DataObject = compiledData(classes);

export class GameEngine {
  name = "";
  dispatchCount = 0;
  state = {
    isRunning: false,
    currentTick: 0,
    empire: {
      populationCap: 0,
      sanitation: 0,
      fertility: 5,
      loyalty: 0,
      piety: 0,
      constitution: 0,
      learnedness: 0,
    },
    // globalStatuses: [] as Status[],
    messages: [] as Message[],
  };
  config = {
    yearLength: 120,
    gameSpeed: 1000,
    startPop: 5,
  };
  data = {} as DataClasses;

  constructor(data: any) {
    this.name = "Steven's Game";
    this.data = this._buildClasses(data);
    this._validateData();
  }

  _buildClasses(data: DataObject): DataClasses {
    let output: { [key: string]: any } = {};

    for (const [key, value] of Object.entries(data)) {
      output[key] = value.data.map((v, index) => value.constructor({ ...v, ...{ index } }));
    }

    output["census"] = Array.from(Array(this.config.startPop)).map((x) => new Citizen({}));
    return output as DataClasses;
  }
  _validateData() {
    const datakeys = Object.keys(this.data);
    const errors = new Map();

    for (const [key, val] of Object.entries(this.data)) {
      val.forEach((item: Item) => {
        datakeys.forEach((k) => {
          if (_.has(item, k)) {
            item[k].forEach((ref) => {
              if (!this.data[k as keyof DataClasses].find((x: Item) => x.name === ref)) {
                if (!errors.get(k)) errors.set(k, []);
                errors.set(k, [...errors.get(k), ref]);
              }
            });
          }
        });
      });
    }

    if (_.size(errors) > 0) {
      let message =
        "These Items are missing corresponding references. Check they exist, or aren't typos, to continue: \n";

      for (const [key, val] of errors.entries()) {
        message += `${key}:[${val.map((v) => v.name || v)}] \n`;
      }

      console.error(errors);
      // throw new ReferenceError(message);
    }
  }

  /**
   * Generic function that returns a single data item via its name
   * @param type
   * @param name
   * @returns Item
   */
  getDatum(type: keyof DataClasses, name: string) {
    return this.data[type].find((x) => x.name === name);
  }

  /**
   * Generic function that returns the index of a single data item in its parent array
   * @param type
   * @param itemName
   * @returns number
   */
  getIndex(type: keyof DataClasses, itemName: string): number {
    return this.data[type].findIndex((x) => x.name === itemName);
  }

  /**
   * Generic function that returns an array of items that pass a conditional, from a single data class
   * @param type
   * @param condition
   * @returns Array<Item>
   */
  getData<T>(type: keyof DataClasses, condition?: (x: T) => boolean) {
    if (!condition) return this.data[type];
    else return this.data[type].filter((x) => condition(x));
  }

  getReduced(type: keyof DataClasses, prop?: string): number {
    return this.data[type].reduce((a, b) => ({ [prop]: a[prop] + b[prop] }))[prop];
  }

  getCountByPropValue(type: keyof DataClasses, prop: string, value: string) {
    return this.data[type].map(({ prop }) => prop === value).length;
  }

  getList(item: DataClass, dataKey: keyof DataClasses): DataClass[] {
    const target = item[dataKey as keyof DataClass];
    if (_.isArray(target) && this.data[dataKey]) {
      return this.data[dataKey].filter((x) => target.includes(x.name)) || [];
    } else return [];
  }

  costCheck(costs: Parcel[]) {
    let pass = true;
    costs.forEach((cost) => {
      const res = this.getDatum("resources", cost[0]);
      if (!res) console.error(`Unable to find resource '${cost[0]}' - check if it exists.`);
      else if (res.amount < cost[1]) pass = false;
    });
    return pass;
  }

  checkPrereqs(str: Structure) {
    // checks if str prereqs are met
    let buildable = true;
    if (str.prereqs.structures.length > 0) {
      str.prereqs.structures.forEach((s) => {
        if (this.getDatum("structures", s).builtCount === 0) buildable = false;
      });
    }
    return buildable;
  }

  getJobs(str: Structure): Job[] {
    return this.data.jobs.filter((job: Job) => str.jobs.includes(job.name)) || [];
  }

  getEmployedCount(): number {
    return this.data.jobs.reduce((a, b) => ({ workers: a.workers + b.workers })).workers;
  }

  getResources() {
    return this.data.resources;
  }

  getActiveStructures() {
    const strs = this.data.structures.filter((str: Structure) => str.builtCount > 0);
    return strs.filter((str: Structure) =>
      this.getList(str, "jobs").some((job: Job) => job.workers > 0)
    );
  }

  getFoods() {
    return this.data.resources.filter((res: Resource) => res.resourceType.includes("food"));
  }

  // Checks to see if a status is active
  checkStatus(statusName: string): boolean {
    return this.data.statuses.find((status: Status) => status.isActive);
  }
}
