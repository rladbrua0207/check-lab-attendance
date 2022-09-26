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
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import React from "react";
import { useState } from "react";
import styled from "styled-components";

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

function StatisticFooter({ DateUnit }) {
  return (
    <StatisticFooterContainer>{footer[DateUnit]()}</StatisticFooterContainer>
  );
}

const StatisticYearFooter = () => {
  const [currentYear, setCurrentYear] = useState(new Date());

  const prevYear = () => {
    setCurrentYear(subYears(currentYear, 1));
  };
  const nextYear = () => {
    setCurrentYear(addYears(currentYear, 1));
  };
  return (
    <>
      <div onClick={prevYear}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <SelectedDate>{format(currentYear, "yyyy")}년</SelectedDate>
      <div onClick={nextYear}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </>
  );
};

const StatisticMonthFooter = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  return (
    <>
      <div onClick={prevMonth}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <SelectedDate>{format(currentMonth, "MM")}월</SelectedDate>
      <div onClick={nextMonth}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </>
  );
};

const StatisticWeekFooter = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const prevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };
  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };
  return (
    <>
      <div onClick={prevWeek}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <SelectedDate>{format(currentWeek, "MM")}월</SelectedDate>
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
