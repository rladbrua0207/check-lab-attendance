import React from "react";
import styled from "styled-components";
import { globalTheme } from "../../GlobalTheme";

const NavBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 8vh;
  font-size: 24px;
  margin-bottom: 3vh;
  .selectedNav {
    border-bottom: solid 2px ${globalTheme.blueColor};
  }
`;

const CalendarNavBox = styled.div`
  margin: 1px;
  width: 33%;
  border-bottom: solid 2px #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatisticNavBox = styled.div`
  margin: 1px;
  width: 33%;
  border-bottom: solid 2px #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StatusNavBox = styled.div`
  margin: 1px;
  width: 33%;
  border-bottom: solid 2px #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NavBar() {
  return (
    <NavBarContainer>
      <CalendarNavBox className="selectedNav">달력</CalendarNavBox>
      <StatisticNavBox>통계</StatisticNavBox>
      <StatusNavBox>현황</StatusNavBox>
    </NavBarContainer>
  );
}

export default NavBar;
