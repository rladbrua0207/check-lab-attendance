/* eslint-disable no-use-before-define */
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addMonths,
  addWeeks,
  addYears,
  format,
  getMonth,
  getWeek,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import getWeekOfMonth from "date-fns/getWeekOfMonth";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  statisticCurrentMonthAtom,
  statisticCurrentWeekAtom,
  statisticCurrentYearAtom,
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

const StatisticYearFooter = () => {
  const [statisticCurrentYear, setStatisticCurrentYear] = useRecoilState(
    statisticCurrentYearAtom
  );

  const prevYear = () => {
    setStatisticCurrentYear(subYears(statisticCurrentYear, 1));
  };
  const nextYear = () => {
    setStatisticCurrentYear(addYears(statisticCurrentYear, 1));
  };

  return (
    <>
      <div onClick={prevYear}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <SelectedDate>{format(statisticCurrentYear, "yyyy")}년</SelectedDate>
      <div onClick={nextYear}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </>
  );
};

const StatisticMonthFooter = () => {
  const [statisticCurrentMonth, setStatisticCurrentMonth] = useRecoilState(
    statisticCurrentMonthAtom
  );

  const prevMonth = () => {
    setStatisticCurrentMonth(subMonths(statisticCurrentMonth, 1));
  };
  const nextMonth = () => {
    setStatisticCurrentMonth(addMonths(statisticCurrentMonth, 1));
  };

  return (
    <>
      <div onClick={prevMonth}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <SelectedDate>{format(statisticCurrentMonth, "MM")}월</SelectedDate>
      <div onClick={nextMonth}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </>
  );
};

const StatisticWeekFooter = () => {
  const [statisticCurrentWeek, setStatisticCurrentWeek] = useRecoilState(
    statisticCurrentWeekAtom
  );

  const prevWeek = () => {
    setStatisticCurrentWeek(subWeeks(statisticCurrentWeek, 1));
  };
  const nextWeek = () => {
    setStatisticCurrentWeek(addWeeks(statisticCurrentWeek, 1));
  };
  return (
    <>
      <div onClick={prevWeek}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <SelectedDate>
        {getMonth(statisticCurrentWeek) +
          1 +
          "월 " +
          getWeekOfMonth(statisticCurrentWeek)}
        주차
      </SelectedDate>
      <div onClick={nextWeek}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </>
  );
};

const footer = {
  year: StatisticYearFooter,
  month: StatisticMonthFooter,
  week: StatisticWeekFooter,
};

export default StatisticFooter;
