import React from "react";
import styled from "styled-components";
import StatusCalendar from "../components/statusCalendar";
import TimeGauge from "../components/timeGauge";
import { globalTheme } from "../GlobalTheme";

const StatusContainer = styled.div`
  height: 80%;
`;

const StatusContentContainer = styled.div`
  margin: 0 auto;
  border: solid 1px ${globalTheme.blueColor};
  border-radius: 20px;
  width: 90vw;
  overflow: auto;
  height: 45%;
`;

const TimeGaugeBox = styled.div`
  margin: 1.1vh auto;
  padding-inline: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GaugeIndex = styled.div`
  margin: 0 0 1vh 5vw;
  width: 10vw;
  font-size: 1.3rem;
`;

function StatusPage() {
  return (
    <StatusContainer>
      <StatusCalendar></StatusCalendar>
      <StatusContentContainer>
        <TimeGaugeBox>
          <GaugeIndex>adnan</GaugeIndex>
          <TimeGauge></TimeGauge>
        </TimeGaugeBox>
        <TimeGaugeBox>
          <GaugeIndex>yugyeom</GaugeIndex>
          <TimeGauge></TimeGauge>
        </TimeGaugeBox>
        <TimeGaugeBox>
          <GaugeIndex>kwanghee</GaugeIndex>
          <TimeGauge></TimeGauge>
        </TimeGaugeBox>
        <TimeGaugeBox>
          <GaugeIndex>jaeheon</GaugeIndex>
          <TimeGauge></TimeGauge>
        </TimeGaugeBox>
        <TimeGaugeBox>
          <GaugeIndex>dasom</GaugeIndex>
          <TimeGauge></TimeGauge>
        </TimeGaugeBox>
      </StatusContentContainer>
    </StatusContainer>
  );
}
export default StatusPage;
