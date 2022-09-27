import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import StatisticFooter from "../components/statisticFooter";
import TimeGauge from "../components/timeGauge";
import { globalTheme } from "../GlobalTheme";

const StatisticHeader = styled.div`
  height: 5vh;
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

const StatisticContent = styled.div`
  margin: 0 auto;
  margin-top: 3vh;
  border: solid 1px ${globalTheme.blueColor};
  width: 95vw;
  max-height: 66%;
  border-radius: 10px;
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

function StatisticPage() {
  return (
    <>
      <StatisticHeader>
        <DateUnitMenu>year</DateUnitMenu>
        <CheckAverageInOutContainer>
          <CheckAverageInBox>
            <CheckAverageIn>07 : 10</CheckAverageIn>
            <div>avg in</div>
          </CheckAverageInBox>
          <CheckAverageOutBox>
            <CheckAverageOut>17 : 50</CheckAverageOut>
            <div>avg out</div>
          </CheckAverageOutBox>
        </CheckAverageInOutContainer>
      </StatisticHeader>
      <StatisticContent>
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
      </StatisticContent>
      <StatisticFooter DateUnit={"year"} />
    </>
  );
}
export default StatisticPage;
