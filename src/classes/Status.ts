import { DataClasses } from "../types/types";
import { Effect } from "./Effect";

export interface StatusProps {
  name: string;
  duration: number;
  message: React.ReactNode;
  effects: string[];
  statusType: "warning" | "timed_event";
}

export class Status {
  name: string = "";
  duration: number = 0;
  index: number = 0;
  message: string = "";
  effects: Effect[] = [];
  isActive: boolean = false;
  timeElapsed: number = 0;
  affectedItems: string[];
  iconPath: string = "803";

  type = "status" as keyof DataClasses;
  statusType = "";

  constructor(props: StatusProps) {
    Object.assign(this, props);
  }
}

// Such as "lowFood", "Global Plague" etc
// A status is a global state notification.
// It can produce a Message when it starts or ends.
// It has associated Effects which alter store state for its duraiton
// Statuses are predefined and thus loaded as data

// Status vs Effect
// A status is some state that affects a job, or any event.
// An effect is a modifier that alters the outcome of a particular job or event
// A status is a collection of effects
