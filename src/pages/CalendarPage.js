import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "../components/calendar";
import CheckButton from "../components/checkButton";
import TimeGauge from "../components/timeGauge";
import { useRecoilState, useRecoilValue } from "recoil";
import { axiosGet } from "../api";
import { calendarSelectedDateAtom, monthOfDayWorkingHoursAtom } from "../atom";
import { format } from "date-fns";
import { months } from "../utils/constants";

const HorizonLine = styled.hr`
  width: 92%;
`;

const SelectedDate = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2vh;
  margin-top: calc(var(--vh, 1vh) * 2);

  margin-bottom: 10px;
`;

// 유저의 업무시간 달성률을 가시적으로 보여주는 Calendar Page
function CalendarPage() {
  const selectedDate = useRecoilValue(calendarSelectedDateAtom);
  const [selectedDateWorkingHours, setSelectedDateWorkingHours] = useState(0);

  const axiosGetWorkingHoursDayDate = async () => {
    const sendData = { id: localStorage.getItem("id") };
    const responseData = await axiosGet(
      "workingHoursDayDate",
      sendData,
      format(selectedDate, "yyMMdd")
    );
    if (responseData !== "error") {
      setSelectedDateWorkingHours(responseData.hours);
    }
  };

  useEffect(() => {
    axiosGetWorkingHoursDayDate();
  }, [selectedDate]);

  return (
    <>
      <Calendar></Calendar>
      <HorizonLine></HorizonLine>
      <SelectedDate>{`${months[format(selectedDate, "M")]} ${format(
        selectedDate,
        "dd"
      )}, ${format(selectedDate, "yyyy")}`}</SelectedDate>
      <TimeGauge marginTop={0} dayTime={selectedDateWorkingHours}></TimeGauge>
      <CheckButton></CheckButton>
    </>
  );
}

export default CalendarPage;
