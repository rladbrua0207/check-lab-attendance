import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

const page = {
  calendar: "/",
  statistic: "/statistic",
  status: "/status",
};

function NavBar() {
  const navigate = useNavigate();

  const moveTargetPage = (arg) => {
    navigate(page[arg]);
  };

  return (
    <NavBarContainer>
      <CalendarNavBox
        className="selectedNav"
        onClick={() => moveTargetPage("calendar")}
      >
        달력
      </CalendarNavBox>
      <StatisticNavBox onClick={() => moveTargetPage("statistic")}>
        통계
      </StatisticNavBox>
      <StatusNavBox onClick={() => moveTargetPage("status")}>현황</StatusNavBox>
    </NavBarContainer>
  );
}

export default NavBar;
