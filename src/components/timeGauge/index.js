import React from "react";
import styled from "styled-components";
import { globalTheme } from "../../GlobalTheme";

const TimeGaugeContainer = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: ${(props) => props.marginTop}vh;
  width: 75vw;
  height: 4vh;
  border: 1px solid ${globalTheme.blueColor};
  border-radius: 10vh;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const CurrentTimeGauge = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${globalTheme.blueColor};
`;

const CurrentTimeGaugeText = styled.div`
  position: absolute;
  margin-left: 5vw;
`;

function TimeGauge({ marginTop = 0, gaugePercent = 0 }) {
  const handleTimeFormat = (timeArg) => {
    const time = new Date(timeArg);
    return `${time.getHours()}h : ${time.getMinutes(0)}m (20%)`;
  };
  return (
    <TimeGaugeContainer marginTop={marginTop}>
      <CurrentTimeGauge width={gaugePercent}></CurrentTimeGauge>
      <CurrentTimeGaugeText>
        {handleTimeFormat(1663851112537 /** 시간받기*/)}
      </CurrentTimeGaugeText>
    </TimeGaugeContainer>
  );
}

export default TimeGauge;
