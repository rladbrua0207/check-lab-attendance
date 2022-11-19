import { atom } from "recoil";
import { format } from "date-fns";

export const selectedCalendarDateAtom = atom({
  key: "selectedCalendarDate",
  default: format(new Date(), "yyMMdd"),
});

export const userLocationAtom = atom({
  key: "userLocation",
  default: { lat: 0, lon: 0 },
});

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const statisticSelectedDateMenuAtom = atom({
  key: "statisticSelectedDateMenu",
  default: "year",
});

export const statisticCurrentYearAtom = atom({
  key: "statisticCurrentYear",
  default: new Date(),
});

export const statisticCurrentMonthAtom = atom({
  key: "statisticCurrentMonth",
  default: new Date(),
});

export const statisticCurrentWeekAtom = atom({
  key: "statisticCurrentWeek",
  default: new Date(),
});

export const ststusSelectedDateAtom = atom({
  key: "statusSelectedDate",
  default: new Date(),
});
