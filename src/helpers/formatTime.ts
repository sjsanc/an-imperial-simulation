export const getYears = (ticks: number, yearLength: number) => {
  return Math.floor(ticks / yearLength);
};

export const getDays = (ticks: number, yearLength: number) => {
  return ticks % yearLength;
};
