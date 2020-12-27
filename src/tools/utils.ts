export const find = (thing: string, list: any[]) => {
  return list.find((li) => thing === li.name);
};

export const mergeData = (datalist: any[], addition: any) => {
  let out: any[] = [];
  datalist.forEach((obj) => {
    out.push({ ...obj, ...addition });
  });
  return out;
};
