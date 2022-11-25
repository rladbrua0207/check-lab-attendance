import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { globalTheme } from "../../GlobalTheme";
import { string } from "../../utils/constants";

const NavBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 8vh;
  height: calc(var(--vh, 1vh) * 8);

  font-size: 20px;
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

// navigation bar로 다른 화면으로 navigate하기 위한 component
function NavBar() {
  const [clickedNav, setClickedNav] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setClickedNav(
      location.pathname === "/"
        ? "calendar"
        : location.pathname === "/statistic"
        ? "statistic"
        : "status" // Todo url 추가 될 경우 수정
    );
  }, [location.pathname]);

  const moveTargetPage = (arg) => {
    setClickedNav(arg);
    navigate(page[arg]);
  };

  return (
    <NavBarContainer>
      <CalendarNavBox
        className={clickedNav === "calendar" ? "selectedNav" : ""}
        onClick={() => moveTargetPage("calendar")}
      >
        {string.calendar}
      </CalendarNavBox>
      <StatisticNavBox
        className={clickedNav === "statistic" ? "selectedNav" : ""}
        onClick={() => moveTargetPage("statistic")}
      >
        {string.statistic}
      </StatisticNavBox>
      <StatusNavBox
        className={clickedNav === "status" ? "selectedNav" : ""}
        onClick={() => moveTargetPage("status")}
      >
        {string.status}
      </StatusNavBox>
    </NavBarContainer>
  );
}

export default NavBar;
