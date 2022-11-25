import React, { useState } from "react";
import { format, addMonths, subMonths, parseISO } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import styled from "styled-components";
import { globalTheme } from "../../GlobalTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { ststusSelectedDateAtom } from "../../atom";
import { months } from "../../utils/constants";

const CalendarContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 50%;
  padding: 2%;
  margin-bottom: 15%;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0% 1% 0% 1%;
  margin-bottom: 4vh;
`;

const CalendarHeaderDaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vh;
`;

const CalendarDaysHeader = styled.div`
  text-align: center;
  width: 7%;
  margin-bottom: 1.5vh;

  &.sun {
    color: ${globalTheme.redColor};
  }

  &.sat {
    color: ${globalTheme.blueColor};
  }
`;

const CalendarDaysBox = styled.div`
  &.disabled {
    visibility: hidden;
  }
  &.selected div {
    background-color: lightgray;
    border-radius: 1000px;
  }
  width: 7%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const CalendarDays = styled.div`
  margin-bottom: 1vh;
`;

const CalendarWeek = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vh;
`;

const SelectedMonth = styled.div`
  font-size: 22px;
`;

// 구성원 현황을 알아보기 위한 캘린더 component
function StatusCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useRecoilState(
    ststusSelectedDateAtom
  ); // Todo default selectedDate 오늘날짜로, selected Date UI에 표시

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <CalendarContainer>
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </CalendarContainer>
  );
}

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <CalendarHeader>
      <div onClick={prevMonth}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <SelectedMonth>
        {`${months[format(currentMonth, "M")]}, ${format(
          currentMonth,
          "yyyy"
        )}`}
      </SelectedMonth>
      <div onClick={nextMonth}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </CalendarHeader>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <CalendarDaysHeader
        className={i === 0 ? "sun" : "" || i === 6 ? "sat" : ""}
        key={i}
      >
        {date[i]}
      </CalendarDaysHeader>
    );
  }
  return <CalendarHeaderDaysContainer>{days}</CalendarHeaderDaysContainer>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <CalendarDaysBox
          className={`${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "MM") !== format(new Date(day), "MM")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <CalendarDays
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </CalendarDays>
        </CalendarDaysBox>
      );
      day = addDays(day, 1);
    }
    rows.push(<CalendarWeek key={day}>{days}</CalendarWeek>);
    days = [];
  }
  return <div className="body">{rows}</div>;
};

export default StatusCalendar;
