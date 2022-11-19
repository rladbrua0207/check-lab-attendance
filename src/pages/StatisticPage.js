import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { axiosGet } from "../api";
import {
  statisticCurrentMonthAtom,
  statisticCurrentWeekAtom,
  statisticCurrentYearAtom,
  statisticSelectedDateMenuAtom,
} from "../atom";
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

// 유저 본인의 선택된 옵션의 업무 달성률을 보여주는 Statistic Page
function StatisticPage() {
  const selectedDateMenu = useRecoilValue(statisticSelectedDateMenuAtom);
  const [statisticCurrentYear, setStatisticCurrentYear] = useRecoilState(
    statisticCurrentYearAtom
  );
  const [statisticCurrentMonth, setStatisticCurrentMonth] = useRecoilState(
    statisticCurrentMonthAtom
  );
  const [statisticCurrentWeek, setStatisticCurrentWeek] = useRecoilState(
    statisticCurrentWeekAtom
  );

  const [workingHoursArr, setWorkingHoursArr] = useState([1, 2]);

  const axiosGetWorkingHours = async () => {
    const sendData = { id: localStorage.getItem("id") };

    const startDate =
      selectedDateMenu === "year"
        ? format(statisticCurrentYear, "yy") + "01"
        : "month"
        ? format(statisticCurrentYear, "yy") +
          format(statisticCurrentMonth, "mm") +
          "01"
        : format(statisticCurrentYear, "yy") +
          format(statisticCurrentMonth, "mm") +
          "01";

    const endDate =
      selectedDateMenu === "year"
        ? format(statisticCurrentYear, "yy") + "01"
        : "month"
        ? format(statisticCurrentYear, "yy") +
          format(statisticCurrentMonth, "mm") +
          "31"
        : format(statisticCurrentYear, "yy") +
          format(statisticCurrentMonth, "mm") +
          "31";

    // workingHoursYear도 필요함.
    const workingHours = await axiosGet(
      selectedDateMenu === "year"
        ? "workingHoursMonthTermDate"
        : selectedDateMenu === "month"
        ? "workingHoursWeekTermDate"
        : "workingHoursDayTermDate",
      sendData,
      startDate,
      endDate
    );

    setWorkingHoursArr(workingHours);
  };
  const todos = [10, 20, 30, 45, 50, 100, 21, 43, 12, 30, 90, 60];

  useEffect(() => {
    axiosGetWorkingHours();
  }, [statisticCurrentYear, statisticCurrentMonth, statisticCurrentWeek]);

  return (
    <>
      <StatisticHeader />
      <StatisticContentsContainer>
        <StatisticContentsBox>
          <StatisticContents>
            {todos.map((val, index) => (
              <TimeGaugeBox key={index}>
                <GaugeIndex>{index + 1}</GaugeIndex>
                <TimeGauge gaugePercent={val}></TimeGauge>
              </TimeGaugeBox>
            ))}
          </StatisticContents>
          <StatisticFooter dateUnit={selectedDateMenu} />
        </StatisticContentsBox>
      </StatisticContentsContainer>
    </>
  );
}
export default StatisticPage;
