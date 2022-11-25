import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { axiosGet } from "../../api";
import {
  avgCheckedInAtom,
  avgCheckedOutAtom,
  statisticSelectedDateMenuAtom,
} from "../../atom";
import { globalTheme } from "../../GlobalTheme";

const StatisticHeaderContainer = styled.div`
  height: 5%;
  display: flex;
  justify-content: space-between;
  padding-inline: 5vw;
`;

const DateUnitMenu = styled.div`
  width: 30vw;
  border: solid 1px ${globalTheme.blueColor};
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckAverageInOutContainer = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CheckAverageInBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CheckAverageOutBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CheckAverageIn = styled.div``;

const CheckAverageOut = styled.div``;

const fadeOut = keyframes`
  0% {
    width: 30%;
    color: white;
    opacity: 0;
    display: flex;
  }
  10% {
    color: white;
  }
  100% {
    width: 90%;
    color: black;
    opacity: 1;
  }
`;
const fadeIn = keyframes`
  0% {
    /* width: 90%; */
    color: black;
    opacity: 1;
  }
  100% {
    /* width: 30%; */
    color: white;
    opacity: 0;
  }
`;

const weekFadeIn = keyframes`
  0% {
  }
  50%{
    transform: translateX(0vw);
  }
  100% {
    transform: translateX(-35vw);
  }
`;
const dayFadeIn = keyframes`
  0% {
  }
  100% {
    transform: translateX(-70vw);
  }
`;

const DateUnitMenuBar = styled.div`
  position: absolute;
  width: 90vw;
  height: 5%;
  border-radius: 100px;
  display: flex;
  visibility: ${({ isOpenMenuBar }) => (isOpenMenuBar ? "visible" : "hidden")};
  justify-content: space-between;
  background-color: white;
  align-items: center;
  z-index: 1;
  animation: ${({ isOpenMenuBar }) => (isOpenMenuBar ? fadeOut : fadeIn)} 0.5s
    ease-out forwards;
  transition: visibility 0.5s linear;

  .week {
    animation: ${({ isOpenMenuBar }) => (isOpenMenuBar ? fadeOut : weekFadeIn)}
      0.5s linear forwards;
  }
  .day {
    animation: ${({ isOpenMenuBar }) => (isOpenMenuBar ? fadeOut : dayFadeIn)}
      0.5s linear forwards;
  }
`;

const MenuBarItem = styled.div`
  display: flex;
  height: 100%;
  max-width: 30%;
  min-width: 30%;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: solid 1px ${globalTheme.blueColor};
  border-radius: 100px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
`;

// statistic 페이지 header component
function StatisticHeader() {
  const [selectedDateMenu, setSelectedDateMenu] = useRecoilState(
    statisticSelectedDateMenuAtom
  );
  const [isOpenMenuBar, setIsOpenMenuBar] = useState(false);
  const [avgCheckedIn, setAvgCheckedIn] = useRecoilState(avgCheckedInAtom);
  const [avgCheckedOut, setAvgCheckedOut] = useRecoilState(avgCheckedOutAtom);

  const openDateMenu = () => {
    setIsOpenMenuBar(true);
  };

  const changeSelectedMenu = (type) => {
    setSelectedDateMenu(type);
    setIsOpenMenuBar(false);
  };

  return (
    <StatisticHeaderContainer>
      <DateUnitMenu onClick={openDateMenu}>{selectedDateMenu}</DateUnitMenu>
      <DateUnitMenuBar isOpenMenuBar={isOpenMenuBar}>
        <MenuBarItem
          className="month"
          onClick={() => changeSelectedMenu("month")}
        >
          month
        </MenuBarItem>
        <MenuBarItem
          className="week"
          onClick={() => changeSelectedMenu("week")}
        >
          week
        </MenuBarItem>
        <MenuBarItem className="day" onClick={() => changeSelectedMenu("day")}>
          day
        </MenuBarItem>
      </DateUnitMenuBar>

      <CheckAverageInOutContainer>
        <CheckAverageInBox>
          <CheckAverageIn>
            {avgCheckedIn.getHours().toString().padStart(2, "0")} :{" "}
            {avgCheckedIn.getMinutes().toString().padStart(2, "0")}
          </CheckAverageIn>
          <div>avg in</div>
        </CheckAverageInBox>
        <CheckAverageOutBox>
          <CheckAverageOut>
            {avgCheckedOut.getHours().toString().padStart(2, "0")} :{" "}
            {avgCheckedOut.getMinutes().toString().padStart(2, "0")}
          </CheckAverageOut>
          <div>avg out</div>
        </CheckAverageOutBox>
      </CheckAverageInOutContainer>
    </StatisticHeaderContainer>
  );
}

export default StatisticHeader;
