import { K } from "../constants";

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

export const getSeason = (time: number, year: number) => {
  let yr = year + 1;
  switch (true) {
    case time <= K.MONTH * 3:
      return "SPRING";
    case time > K.MONTH * 3 * yr && time <= K.MONTH * 6:
      return "SUMMER";
    case time > K.MONTH * 6 * yr && time <= K.MONTH * 9:
      return "AUTUMN";
    case time > K.MONTH * 12:
      return "WINTER";
    default:
      return "HELL";
  }
};
