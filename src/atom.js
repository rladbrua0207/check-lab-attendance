import { atom } from "recoil";

export const calendarSelectedDateAtom = atom({
  key: "calendarSelectedDate",
  default: new Date(),
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
  default: "month",
});

export const statisticCurrentYearOfMonthAtom = atom({
  key: "statisticCurrentYearOfMonth",
  default: new Date(),
});

export const statisticCurrentMonthOfWeekAtom = atom({
  key: "statisticCurrentMonthOfWeek",
  default: new Date(),
});

export const statisticCurrentMonthOfDayAtom = atom({
  key: "statisticCurrentMonthOfDay",
  default: new Date(),
});

export const ststusSelectedDateAtom = atom({
  key: "statusSelectedDate",
  default: new Date(),
});

export const monthOfDayWorkingHoursAtom = atom({
  key: "monthOfDayWorkingHours",
  default: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
});
