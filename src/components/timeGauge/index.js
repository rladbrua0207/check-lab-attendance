import React from "react";
import styled from "styled-components";
import { globalTheme } from "../../GlobalTheme";

const TimeGaugeContainer = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: ${(props) => props.marginTop}vh;
  width: 75vw;
  height: 4vh;
  height: calc(var(--vh, 1vh) * 4);
  border: 1px solid ${globalTheme.blueColor};
  border-radius: 10vh;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const CurrentTimeGauge = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${(props) =>
    props.width >= 100 ? "#87D5AA" : `${globalTheme.blueColor}`};
`;

const CurrentTimeGaugeText = styled.div`
  position: absolute;
  margin-left: 5vw;
`;

const monthWorkingHoursToPercent = (time) => {
  return Math.floor((Number(time) / (22 * 8)) * 100);
};
const weekWorkingHoursToPercent = (time) => {
  return Math.floor((Number(time) / (5 * 8)) * 100);
};
const dayWorkingHoursToPercent = (time) => {
  return Math.floor((Number(time) / 8) * 100);
};

function TimeGauge({
  marginTop = 0,
  dayTime = -1,
  weekTime = -1,
  monthTime = -1,
}) {
  const handleDayTimeFormat = (time) => {
    const splitTime = time.split(".");
    if (splitTime[1] !== undefined) {
      return `${Number(splitTime[0]).toString().padStart(2, "0")}h ${Math.floor(
        Number("0." + splitTime[1]) * 60
      )
        .toString()
        .padStart(2, "0")}m (${dayWorkingHoursToPercent(time)}%)`;
    } else {
      return `${Number(splitTime[0])
        .toString()
        .padStart(2, "0")}h 00m (${dayWorkingHoursToPercent(time)}%)`;
    }
  };
  const handleMonthTimeFormat = (time) => {
    const splitTime = time.split(".");
    if (splitTime[1] !== undefined) {
      return `${Number(splitTime[0]).toString().padStart(3, "0")}h ${Math.floor(
        Number("0." + splitTime[1]) * 60
      )
        .toString()
        .padStart(2, "0")}m (${monthWorkingHoursToPercent(time)}%)`;
    } else {
      return `${Number(splitTime[0])
        .toString()
        .padStart(3, "0")}h 00m (${monthWorkingHoursToPercent(time)}%)`;
    }
  };

  const handleWeekTimeFormat = (time) => {
    const splitTime = time.split(".");
    if (splitTime[1] !== undefined) {
      return `${Number(splitTime[0]).toString().padStart(2, "0")}h ${Math.floor(
        Number("0." + splitTime[1]) * 60
      )
        .toString()
        .padStart(2, "0")}m (${weekWorkingHoursToPercent(time)}%)`;
    } else {
      return `${Number(splitTime[0])
        .toString()
        .padStart(2, "0")}h 00m (${weekWorkingHoursToPercent(time)}%)`;
    }
  };

  return (
    <TimeGaugeContainer marginTop={marginTop}>
      <CurrentTimeGauge
        width={
          dayTime !== -1
            ? dayWorkingHoursToPercent(dayTime)
            : weekTime !== -1
            ? weekWorkingHoursToPercent(weekTime)
            : monthWorkingHoursToPercent(monthTime)
        }
      ></CurrentTimeGauge>
      <CurrentTimeGaugeText>
        {dayTime !== -1
          ? handleDayTimeFormat(dayTime.toString() /** 시간받기*/)
          : weekTime !== -1
          ? handleWeekTimeFormat(weekTime.toString())
          : handleMonthTimeFormat(monthTime.toString())}
      </CurrentTimeGaugeText>
    </TimeGaugeContainer>
  );
}

export default TimeGauge;
