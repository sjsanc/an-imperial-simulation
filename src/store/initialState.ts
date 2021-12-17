import { Job } from "../classes/Job";
import { Module } from "../classes/Module";
import { Research } from "../classes/Research";
import { Resource } from "../classes/Resource";
import { Structure } from "../classes/Structure";
import * as data from "../data";
import { DataClasses } from "../types/types";

interface DataObject {
  [key: string]: {
    constructor: (d: any) => any;
    data: any[];
  };
}

const mainDataObject: DataObject = {
  structures: {
    constructor: (d) => new Structure(d),
    data: [{ name: "house", description: "LOL", jobNames: ["sleep"] }],
  },
};

export class GameEngine {
  name = "";
  state = {
    isRunning: false,
    currentTick: 0,
    population: {
      total: 10,
      workers: 0,
      soldiers: 0,
    },
  };
  config = {
    yearLength: 120,
  };
  data: any;

  constructor(data: any) {
    this.name = "Steven's Game";
    this.data = this.buildClasses(data);
  }

  buildClasses(data: DataObject) {
    for (const [key, value] of Object.entries(data)) {
      this[key as keyof GameEngine] = value.data.map((v) => value.constructor(v));
    }

    for (const [key, value] of Object.entries(data)) {
      (this[key as keyof GameEngine] as Array<any>).forEach((item) => {
        this.buildRefs(item);
      });
    }
  }

  buildRefs(item: any) {
    const nameListsKeys = Object.keys(item).filter((key) => key.includes("Names"));
    const itemKeys = nameListsKeys.map((n) => n.replace("Names", ""));
    itemKeys.forEach((k) => {
      item[k] = this.data[k].filter((i) => nameListsKeys.includes(i.name));
    });
  }
}

export const g = new GameEngine(mainDataObject);
