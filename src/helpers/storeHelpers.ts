export const sortArray = (arr: any[], sort: string) => {
  const map = new Map();
  arr.forEach((el) => {
    let type = el[sort];
    if (map.get(type)) map.set(type, [...map.get(type), el]);
    else map.set(type, [el]);
  });
  return Array.from(map);
};
