import React from "react";
import styled from "styled-components";
import StatisticFooter from "../components/statisticFooter";
import StatisticHeader from "../components/statisticHeader";
import TimeGauge from "../components/timeGauge";
import { globalTheme } from "../GlobalTheme";

const StatisticContents = styled.div`
  margin: 0 auto;
  margin-top: 3vh;
  border: solid 1px ${globalTheme.blueColor};
  width: 95vw;
  max-height: 66%;
  border-radius: 20px;
  overflow: auto;
`;

const TimeGaugeBox = styled.div`
  margin: 1.1vh auto;
  padding-inline: 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GaugeIndex = styled.div`
  width: 10vw;
  font-size: 1.3rem;
`;

const StatisticContentsContainer = styled.div`
  position: relative;
  height: 73vh;
`;

const StatisticContentsBox = styled.div`
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 0);
`;

function StatisticPage() {
  return (
    <>
      <StatisticHeader />
      <StatisticContentsContainer>
        <StatisticContentsBox>
          <StatisticContents>
            <TimeGaugeBox>
              <GaugeIndex>1</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
            <TimeGaugeBox>
              <GaugeIndex>2</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
            <TimeGaugeBox>
              <GaugeIndex>3</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
            <TimeGaugeBox>
              <GaugeIndex>4</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
            <TimeGaugeBox>
              <GaugeIndex>5</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
            <TimeGaugeBox>
              <GaugeIndex>6</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
            <TimeGaugeBox>
              <GaugeIndex>7</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
            <TimeGaugeBox>
              <GaugeIndex>8</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
            <TimeGaugeBox>
              <GaugeIndex>9</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
            <TimeGaugeBox>
              <GaugeIndex>10</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
            <TimeGaugeBox>
              <GaugeIndex>11</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
            <TimeGaugeBox>
              <GaugeIndex>12</GaugeIndex>
              <TimeGauge></TimeGauge>
            </TimeGaugeBox>
          </StatisticContents>
          <StatisticFooter DateUnit={"year"} />
        </StatisticContentsBox>
      </StatisticContentsContainer>
    </>
  );
}
export default StatisticPage;
