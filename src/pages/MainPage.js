import React from "react";
import styled from "styled-components";
import Calendar from "../components/calendar";
import Header from "../components/header";
import NavBar from "../components/navbar";
import TimeGauge from "../components/timeGauge";

const MainContainer = styled.div`
  height: 100%;
`;

const HorizonLine = styled.hr`
  width: 92%;
`;

function MainPage() {
  return (
    <MainContainer>
      <Header></Header>
      <NavBar></NavBar>
      <Calendar></Calendar>
      <HorizonLine></HorizonLine>
      <TimeGauge></TimeGauge>
    </MainContainer>
  );
}
export default MainPage;
