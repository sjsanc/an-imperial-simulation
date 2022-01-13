/**
 * Groups an array according to a single property
 * @param array
 * @param property
 * @returns Array<Item>
 */
export const sortArray = (array: any[], property: string) => {
  const map = new Map();
  array.forEach((el) => {
    let type = el[property];
    if (map.get(type)) map.set(type, [...map.get(type), el]);
    else map.set(type, [el]);
  });
  return Array.from(map);
};

export const getRandom = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
