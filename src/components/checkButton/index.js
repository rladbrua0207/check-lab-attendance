import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { axiosGet, axiosPost } from "../../api";
import { isLocationInAtom } from "../../atom";
import { globalTheme } from "../../GlobalTheme";

const CheckButtonContainer = styled.div`
  margin-top: 4vh;
  height: 5vh;
  align-items: center;
`;

const CheckButtonBox = styled.div`
  border: solid 1px ${globalTheme.blueColor};
  border-radius: 100px;
  margin: 0 auto;
  height: 100%;
  width: 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 춠석체크를 위한 component
function CheckButton() {
  const [isLocationIn, setIsLocationIn] = useRecoilState(isLocationInAtom);
  const [isChecked, setIsChecked] = useState(false);

  const axiosGetIsCurrentCheck = async () => {
    const sendData = { id: localStorage.getItem("id") };
    const responseData = await axiosGet("status", sendData);

    responseData.status === "q" ? setIsChecked(false) : setIsChecked(true);
  };

  useEffect(() => {
    axiosGetIsCurrentCheck();
  }, []);

  const handleAttendancecheck = async () => {
    if (isLocationIn === false) {
      alert("err: out of range");
      return;
    }
    let responseData;
    const sendData = { id: localStorage.getItem("id") };

    if (isChecked) {
      responseData = await axiosPost("checkout", sendData);
      if (responseData.errcode === 0) setIsChecked(false);
    } else {
      responseData = await axiosPost("checkin", sendData);
      if (responseData.errcode === 0) setIsChecked(true);
    }

  };

  return (
    <CheckButtonContainer>
      <CheckButtonBox onClick={handleAttendancecheck}>
        {isChecked ? "퇴근하기" : "출석하기"}
      </CheckButtonBox>
    </CheckButtonContainer>
  );
}

export default CheckButton;
