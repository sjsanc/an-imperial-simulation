import { Parcel } from "../types/types";

export class Job {
  name: string = "";
  description: string = "";
  baseProduct: Parcel[] = [];
  baseCost: Parcel[] = [];

  assignedWorkerCount = 0;
  _isAssignable? = false;

  constructor(init: Partial<Job>) {
    Object.assign(this, init);
  }

  isActive() {
    if (this.assignedWorkerCount > 0) return true;
    else return false;
  }
}
