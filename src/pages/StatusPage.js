import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { axiosGet } from "../api";
import { ststusSelectedDateAtom } from "../atom";
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

// 선택된 날짜의 유저들의 정보를 보기 위한 Status Page
function StatusPage() {
  const [selectedDate, setSelectedDate] = useRecoilState(
    ststusSelectedDateAtom
  );

  const [groupWorkingHoursArr, setGroupWorkingHoursArr] = useState([
    { name: "", workingHours: "" },
  ]);

  // Todo 요청 title 바꾸기
  const axiosGetGroupWorkingHours = async () => {
    const sendData = {
      id: "be46d857f768cb0b496f1ca83bd3bebce877e7336580db09c3478b98d2c95ee9", // 고정 hashcode
    };
    const response = await axiosGet(
      "workingHoursDayDate", // Todo 요청 URL
      sendData,
      format(selectedDate, "yyMMdd")
    );
    console.log(response);

    const objArr = [];
    const keys = Object.keys(response.hours);
    for (let i = 0; i < keys.length; i++) {
      const obj = {
        name: keys[i],
        workingHours: response.hours[keys[i]],
      };
      objArr.push(obj);
    }

    setGroupWorkingHoursArr(objArr);
    // let groupWorkingHoursObjArr = [...response];
    // // Todo  response 받은 값 확인하면서 test
    // groupWorkingHoursObjArr.forEach((element) => {
    //   element.workingHoursPercent = ""; //  Todo 값 가져오면 percent값 주기
    // });
    // setSelectedDate(response);
  };

  useEffect(() => {
    axiosGetGroupWorkingHours();
  }, [selectedDate]);

  return (
    <StatusContainer>
      <StatusCalendar></StatusCalendar>
      <StatusContentContainer>
        {groupWorkingHoursArr.map((val, index) => (
          <TimeGaugeBox key={index}>
            <GaugeIndex>{val.name}</GaugeIndex>
            <TimeGauge dayTime={val.workingHours}></TimeGauge>
          </TimeGaugeBox>
        ))}
      </StatusContentContainer>
    </StatusContainer>
  );
}
export default StatusPage;
