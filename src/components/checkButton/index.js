import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { axiosGet, axiosPost } from "../../api";
import { isLocationInAtom } from "../../atom";
import { globalTheme } from "../../GlobalTheme";

const CheckButtonContainer = styled.div`
  margin-top: 3%;
  height: 5%;
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
  const [isOpenOutOfRangeErrModal, setIsOpenOutOfRangeErrModal] =
    useState(false);
  const modalOverlay = useRef();
  const axiosGetIsCurrentCheck = async () => {
    const sendData = { id: localStorage.getItem("id") };
    const responseData = await axiosGet("status", sendData);
    console.log(responseData);
    if (responseData.errcode === 0) {
      responseData.status === "q" ? setIsChecked(false) : setIsChecked(true);
    }
  };

  const clickModalOutSide = (e) => {
    if (isOpenOutOfRangeErrModal && e.target.id !== "outOfRangeErrModal") {
      console.log(1);
      setIsOpenOutOfRangeErrModal(false);
    }
  };

  useEffect(() => {
    axiosGetIsCurrentCheck();

    document.addEventListener("mousedown", clickModalOutSide);
    return () => {
      document.removeEventListener("mousedown", clickModalOutSide);
    };
  }, [isOpenOutOfRangeErrModal]);

  const handleAttendancecheck = async () => {
    if (isLocationIn === false) {
      setIsOpenOutOfRangeErrModal(true);
      return;
    }
    let responseData;
    const sendData = { id: localStorage.getItem("id") };

    if (isChecked) {
      responseData = await axiosPost("checkout", sendData);
      console.log(responseData);
      if (responseData.errcode === 0) setIsChecked(false);
    } else {
      responseData = await axiosPost("checkin", sendData);
      console.log(responseData);
      if (responseData.errcode === 0) setIsChecked(true);
    }
  };
  console.log(isChecked);

  return (
    <CheckButtonContainer>
      <ReactModal
        id="outOfRangeErrModal"
        isOpen={isOpenOutOfRangeErrModal}
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            alignItems: "center",
          },
          content: {
            fontSize: "22px",
            width: "70%",
            height: "20%",
            borderRadius: "15px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: "150%",
          },
        }}
      >
        Your location is outside the area, Go into the area and try.
      </ReactModal>
      <CheckButtonBox onClick={handleAttendancecheck}>
        {isChecked ? "check out" : "check in"}
      </CheckButtonBox>
    </CheckButtonContainer>
  );
}

export default CheckButton;
