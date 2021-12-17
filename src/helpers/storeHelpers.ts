import { Resource } from "./../classes/Resource";
import { StoreInterface } from "../store/initialState";
import { Parcel } from "../types/types";

/**
 * Checks if every item in a cost array is sufficient. Returns false if any resource is insufficent
 * @param resources
 * @param costArray
 * @returns boolean
 */

export const checkCostArray = (costArray: Parcel[], resources: Resource[]) => {
  return costArray.every((cost) => cost[1] <= resources.find((x) => x.name === cost[0])!.amount);
};

export function getItem<T extends { name: string }>(
  name: string,
  collection: T[]
): [number, T | undefined] {
  const index = collection.findIndex((s) => s.name === name);
  return [index, collection[index]];
}

export function getIndices(list: Parcel[], collection: any[]) {
  const indices = list.map((s) => collection.findIndex((y) => y.name === s[0]));
  if (indices.every((i) => i > -1)) return indices;
  else throw new ReferenceError("Unable to find an item");
}

export function getJobIndices(nameList: string[], collection: any[]) {
  const indices = nameList.map((s) => collection.findIndex((y) => y.name === s));
  if (indices.every((i) => i > -1)) return indices;
  else return [];
}

export const getAvailableWorkers = (store: Pick<StoreInterface, "population">) => {
  return store.population.total - (store.population.workers + store.population.soldiers);
};

export const getFlatList = <T>(collection: T[], listProperty: keyof T, condition: any) => {
  return collection.filter(condition).flatMap((c) => c[listProperty]);
};
