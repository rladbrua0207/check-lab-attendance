import React from "react";
import styled from "styled-components";
import Calendar from "../components/calendar";
import CheckButton from "../components/checkButton";
import TimeGauge from "../components/timeGauge";

const HorizonLine = styled.hr`
  width: 92%;
`;

function CalendarPage() {
  return (
    <>
      <Calendar></Calendar>
      <HorizonLine></HorizonLine>
      <TimeGauge marginTop={5}></TimeGauge>
      <CheckButton></CheckButton>
    </>
  );
}
export default CalendarPage;
