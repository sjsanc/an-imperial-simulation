export const parseTime = (time: number) => {
  let days = time,
    months = Math.floor(time / 25),
    years = Math.floor(time / 300);
  return {
    days,
    months,
    years,
  };
};

export const getSeason = (time: number) => {
  switch (true) {
    case time <= 75:
      return "SPRING";
    case time > 75 && time <= 150:
      return "SUMMER";
    case time > 150 && time <= 225:
      return "AUTUMN";
    case time > 255:
      return "WINTER";
    default:
      return "HELL";
  }
};
