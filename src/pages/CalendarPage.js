import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Calendar from "../components/calendar";
import CheckButton from "../components/checkButton";
import TimeGauge from "../components/timeGauge";
import {useRecoilValue} from "recoil";
import {selectedCalendarDateAtom} from "../atom";
import {axiosGet} from "../api";

const HorizonLine = styled.hr`
  width: 92%;
`;

function CalendarPage() {
    const selectedDate = useRecoilValue(selectedCalendarDateAtom);
    const [selectedDateWorkingHours, setSelectedDateWorkingHours] = useState(0);

    const axiosGetWorkingHoursDayDate = async () => {
        const sendData = {id: localStorage.getItem("id")}
        setSelectedDateWorkingHours(await axiosGet('workingHoursDayDate', sendData, selectedDate));
    };

    useEffect(() => {
        axiosGetWorkingHoursDayDate();
    }, [selectedDate]);



    return (
        <>
            <Calendar></Calendar>
            <HorizonLine></HorizonLine>
            <TimeGauge marginTop={5} gaugePercent={selectedDateWorkingHours/* Todo 나누기몇? */}></TimeGauge>
            <CheckButton></CheckButton>
        </>
    );
}

export default CalendarPage;
