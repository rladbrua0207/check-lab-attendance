import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "../components/calendar";
import CheckButton from "../components/checkButton";
import TimeGauge from "../components/timeGauge";
import { useRecoilValue } from "recoil";
import { selectedCalendarDateAtom } from "../atom";
import { axiosGet } from "../api";

const HorizonLine = styled.hr`
  width: 92%;
`;

// 유저의 업무시간 달성률을 가시적으로 보여주는 Calendar Page
function CalendarPage() {
  const selectedDate = useRecoilValue(selectedCalendarDateAtom);
  const [selectedDateWorkingHours, setSelectedDateWorkingHours] = useState(0);

  const axiosGetWorkingHoursDayDate = async () => {
    const sendData = { id: localStorage.getItem("id") };
    const responseData = await axiosGet(
      "workingHoursDayDate",
      "a2ff08fef3bd9249ae2d12038daf93620cb3da0673c355d8783ede8d6ed87f37",
      selectedDate
    );
    if (responseData != null) {
      setSelectedDateWorkingHours(responseData);
    }
  };

  useEffect(() => {
    axiosGetWorkingHoursDayDate();
  }, [selectedDate]);

  return (
    <>
      <Calendar></Calendar>
      <HorizonLine></HorizonLine>
      <TimeGauge
        marginTop={5}
        gaugePercent={selectedDateWorkingHours /* Todo 나누기몇? */}
      ></TimeGauge>
      <CheckButton></CheckButton>
    </>
  );
}

export default CalendarPage;
