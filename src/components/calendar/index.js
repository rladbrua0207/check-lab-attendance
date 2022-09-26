import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import styled from "styled-components";
import circleImage from "../../images/circle.png";
import { globalTheme } from "../../GlobalTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const CalendarContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 2%;
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
  width: 7%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const CalendarDays = styled.div`
  margin-bottom: 1vh;
`;

const DailyAttendanceRateImg = styled.img``;

const CalendarWeek = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vh;
`;

const SelectedMonth = styled.div`
  font-size: 22px;
`;

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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
        {format(currentMonth, "yyyy")}년 {format(currentMonth, "M")}월
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
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
          onClick={() => onDateClick(parse(cloneDay))}
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
          <DailyAttendanceRateImg src={circleImage}>
            {/**Todo 동적으로 */}
          </DailyAttendanceRateImg>
        </CalendarDaysBox>
      );
      day = addDays(day, 1);
    }
    rows.push(<CalendarWeek key={day}>{days}</CalendarWeek>);
    days = [];
  }
  return <div className="body">{rows}</div>;
};

export default Calendar;
