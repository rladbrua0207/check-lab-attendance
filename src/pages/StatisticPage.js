import { format, getWeek, weeksToDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { axiosGet } from "../api";
import {
  avgCheckedInAtom,
  avgCheckedOutAtom,
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
  position: relative;
  margin: 0 auto;
  margin-top: 3vh;
  border: solid 1px ${globalTheme.blueColor};
  width: 95vw;
  max-height: 65%;
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
  height: 73%;
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

  const [avgCheckedIn, setAvgCheckedIn] = useRecoilState(avgCheckedInAtom);
  const [avgCheckedOut, setAvgCheckedOut] = useRecoilState(avgCheckedOutAtom);

  const [workingHoursArr, setWorkingHoursArr] = useState([]);

  const handleArrayAvgCalculate = (array) => {
    let sum = 0;
    const length = array.length;

    array.forEach((element) => {
      sum += element;
    });

    return sum / length;
  };

  const axiosGetWorkingHours = async (startDate, endDate) => {
    const sendData = { id: localStorage.getItem("id") };
    console.log(startDate);
    console.log(endDate);
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
    console.log(response.hours);
    setWorkingHoursArr(response.hours);
  };

  const axiosGetAvgCheckedIn = async (startDate, endDate) => {
    startDate = startDate.length === 4 ? startDate + "01" : startDate;
    endDate = endDate.length === 4 ? endDate + "31" : endDate;
    const sendData = { id: localStorage.getItem("id") };
    const response = await axiosGet(
      "checkinsTermDate",
      sendData,
      startDate,
      endDate
    );
    console.log(response);

    // Todo
    if (response.errcode === 0) {
      setAvgCheckedIn(new Date(handleArrayAvgCalculate(response.timestamp)));
    } else if (response.errcode === 4) {
      setAvgCheckedIn(new Date("0000/01/01 00:00:00"));
      console.log(response.errorMessage);
    }
  };

  const axiosGetAvgCheckedOut = async (startDate, endDate) => {
    const sendData = { id: localStorage.getItem("id") };
    console.log(startDate);
    console.log(endDate);
    startDate = startDate.length === 4 ? startDate + "01" : startDate;
    endDate = endDate.length === 4 ? endDate + "31" : endDate;
    const response = await axiosGet(
      "checkoutsTermDate",
      sendData,
      startDate,
      endDate
    );
    console.log(response);

    // Todo
    if (response.errcode === 0) {
      setAvgCheckedOut(new Date(handleArrayAvgCalculate(response.timestamp)));
    } else if (response.errcode === 4) {
      setAvgCheckedOut(new Date("0000/01/01 00:00:00"));
      console.log(response.errorMessage);
    }
  };

  useEffect(() => {
    let startDate;
    let endDate;

    if (selectedDateMenu === "month") {
      startDate = format(statisticCurrentYearOfMonth, "yy") + "01";
      endDate = format(statisticCurrentYearOfMonth, "yy") + "12";
    } else if (selectedDateMenu === "week") {
      startDate =
        format(statisticCurrentMonthOfWeek, "yy") +
        format(statisticCurrentMonthOfWeek, "MM") +
        "01";
      endDate =
        format(statisticCurrentMonthOfWeek, "yy") +
        format(statisticCurrentMonthOfWeek, "MM") +
        new Date(
          statisticCurrentMonthOfWeek.getFullYear(),
          statisticCurrentMonthOfWeek.getMonth() + 1,
          0
        ).getDate();
    } else {
      startDate =
        format(statisticCurrentMonthOfDay, "yy") +
        format(statisticCurrentMonthOfDay, "MM") +
        "01";
      endDate =
        format(statisticCurrentMonthOfDay, "yy") +
        format(statisticCurrentMonthOfDay, "MM") +
        new Date(
          statisticCurrentMonthOfDay.getFullYear(),
          statisticCurrentMonthOfDay.getMonth() + 1,
          0
        ).getDate();
    }

    axiosGetWorkingHours(startDate, endDate);
    axiosGetAvgCheckedIn(startDate, endDate);
    axiosGetAvgCheckedOut(startDate, endDate);
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
