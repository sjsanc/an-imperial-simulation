import * as _ from "lodash";

export const padArray = (array: any, cols: number) => {
  const len = array.length;
  if (len % cols !== 0) return _.concat(array, Array.from("x".repeat(cols - (len % cols))));
  else if (len === 0) return Array.from("x".repeat(cols));
  else return array;
};

export const getInitials = (word: string) => {
  return word.split(/\s/).reduce((res, w) => (res += w.slice(0, 1)), "");
};
