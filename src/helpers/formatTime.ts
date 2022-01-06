export const getYears = (ticks: number, yearLength: number) => {
  return Math.floor(ticks / yearLength);
};

export const getDays = (ticks: number, yearLength: number) => {
  return ticks % yearLength;
};

export const getMonth = (ticks: number, yearLength: number) => {
  const months = ["Aprimay", "Jugust", "Septober", "Decembary"];
  if (ticks < yearLength / 4) return months[0];
  else if (ticks < yearLength / 3) return months[1];
  else if (ticks < yearLength / 2) return months[2];
  else return months[3];
};
