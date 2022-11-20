/* eslint-disable no-use-before-define */
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addMonths,
  addYears,
  format,
  getMonth,
  subMonths,
  subYears,
} from "date-fns";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  statisticCurrentMonthOfDayAtom,
  statisticCurrentMonthOfWeekAtom,
  statisticCurrentYearOfMonthAtom,
} from "../../atom";

const StatisticFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline: 7vw;
  margin-top: 2vh;
`;

const SelectedDate = styled.div`
  font-size: 22px;
`;

//선택된 menu옵션에 해당하는 통계페이지 footer component
function StatisticFooter({ dateUnit }) {
  return (
    <StatisticFooterContainer>{footer[dateUnit]()}</StatisticFooterContainer>
  );
}

const StatisticYearOfMonthFooter = () => {
  const [statisticCurrentYearOfMonth, setStatisticCurrentYearOfMonth] =
    useRecoilState(statisticCurrentYearOfMonthAtom);

  const prevYear = () => {
    setStatisticCurrentYearOfMonth(subYears(statisticCurrentYearOfMonth, 1));
  };
  const nextYear = () => {
    setStatisticCurrentYearOfMonth(addYears(statisticCurrentYearOfMonth, 1));
  };

  return (
    <>
      <div onClick={prevYear}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <SelectedDate>
        {format(statisticCurrentYearOfMonth, "yyyy")}년
      </SelectedDate>
      <div onClick={nextYear}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </>
  );
};

const StatisticMonthOfWeekFooter = () => {
  const [statisticCurrentMonthOfWeek, setStatisticCurrentMonthOfWeek] =
    useRecoilState(statisticCurrentMonthOfWeekAtom);

  const prevMonth = () => {
    setStatisticCurrentMonthOfWeek(subMonths(statisticCurrentMonthOfWeek, 1));
  };
  const nextMonth = () => {
    setStatisticCurrentMonthOfWeek(addMonths(statisticCurrentMonthOfWeek, 1));
  };

  return (
    <>
      <div onClick={prevMonth}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <SelectedDate>
        {`${format(statisticCurrentMonthOfWeek, "yyyy")}년 ${format(
          statisticCurrentMonthOfWeek,
          "MM"
        )}`}
        월
      </SelectedDate>
      <div onClick={nextMonth}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </>
  );
};

const StatisticMonthOfDayFooter = () => {
  const [statisticCurrentMonthOfDay, setStatisticCurrentMonthOfDay] =
    useRecoilState(statisticCurrentMonthOfDayAtom);

  const prevWeek = () => {
    setStatisticCurrentMonthOfDay(subMonths(statisticCurrentMonthOfDay, 1));
  };
  const nextWeek = () => {
    setStatisticCurrentMonthOfDay(addMonths(statisticCurrentMonthOfDay, 1));
  };
  return (
    <>
      <div onClick={prevWeek}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <SelectedDate>
        {`${format(statisticCurrentMonthOfDay, "yyyy")}년 ${
          getMonth(statisticCurrentMonthOfDay) + 1
        }월`}
      </SelectedDate>
      <div onClick={nextWeek}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </>
  );
};

const footer = {
  month: StatisticYearOfMonthFooter,
  week: StatisticMonthOfWeekFooter,
  day: StatisticMonthOfDayFooter,
};

export default StatisticFooter;
