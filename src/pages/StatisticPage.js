import { format, getWeek, weeksToDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { axiosGet } from "../api";
import {
  statisticCurrentMonthOfDayAtom,
  statisticCurrentMonthOfWeekAtom,
  statisticCurrentYearOfMonthAtom,
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
  max-height: 65vh;
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 0);
`;

// 유저 본인의 선택된 옵션의 업무 달성률을 보여주는 Statistic Page
function StatisticPage() {
  const selectedDateMenu = useRecoilValue(statisticSelectedDateMenuAtom);
  const [statisticCurrentYearOfMonth, setStatisticCurrentYearOfMonth] =
    useRecoilState(statisticCurrentYearOfMonthAtom);
  const [statisticCurrentMonthOfWeek, setStatisticCurrentMonthOfWeek] =
    useRecoilState(statisticCurrentMonthOfWeekAtom);
  const [statisticCurrentMonthOfDay, setStatisticCurrentMonthOfDay] =
    useRecoilState(statisticCurrentMonthOfDayAtom);

  const [workingHoursArr, setWorkingHoursArr] = useState([]);

  const axiosGetWorkingHours = async () => {
    const sendData = { id: localStorage.getItem("id") };

    const startDate =
      selectedDateMenu === "month"
        ? format(statisticCurrentYearOfMonth, "yy") + "01"
        : selectedDateMenu === "week"
        ? format(statisticCurrentMonthOfWeek, "yy") +
          format(statisticCurrentMonthOfWeek, "MM") +
          "01"
        : format(statisticCurrentMonthOfDay, "yy") +
          format(statisticCurrentMonthOfDay, "MM") +
          "01";

    const endDate =
      selectedDateMenu === "month"
        ? format(statisticCurrentYearOfMonth, "yy") + "12"
        : selectedDateMenu === "week"
        ? format(statisticCurrentMonthOfWeek, "yy") +
          format(statisticCurrentMonthOfWeek, "MM") +
          "31"
        : format(statisticCurrentMonthOfDay, "yy") +
          format(statisticCurrentMonthOfDay, "MM") +
          "31";

    // workingHoursYear도 필요함.
    const response = await axiosGet(
      selectedDateMenu === "month"
        ? "workingHoursMonthTermDate"
        : selectedDateMenu === "week"
        ? "workingHoursWeekTermDate"
        : "workingHoursDayTermDate",
      sendData,
      startDate,
      endDate
    );
    setWorkingHoursArr(response.hours);
    console.log(response.hours);
  };

  useEffect(() => {
    axiosGetWorkingHours();
  }, [
    statisticCurrentYearOfMonth,
    statisticCurrentMonthOfWeek,
    statisticCurrentMonthOfDay,
    selectedDateMenu,
  ]);
  return (
    <>
      <StatisticHeader />
      <StatisticContentsContainer>
        <StatisticContentsBox>
          <StatisticContents>
            {workingHoursArr.map((val, index) => (
              <TimeGaugeBox key={index}>
                <GaugeIndex>{index + 1}</GaugeIndex>
                <TimeGauge
                  monthTime={selectedDateMenu === "month" ? val : -1}
                  weekTime={selectedDateMenu === "week" ? val : -1}
                  dayTime={selectedDateMenu === "day" ? val : -1}
                ></TimeGauge>
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
