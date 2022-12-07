import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { globalTheme } from "../../GlobalTheme";
import { axiosGet, axiosPut } from "../../api";
import { isLoginAtom } from "../../atom";
import { useRecoilState } from "recoil";
import ReactModal from "react-modal";

const LoginContainer = styled.div`
  width: 95vw;
  height: 25vh;
  height: calc(var(--vh, 1vh) * 25);

  border: solid 1px ${globalTheme.blueColor};
  border-radius: 20px;
  position: absolute;
  bottom: 45%;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const LoginTitle = styled.div`
  margin-bottom: 3vh;
  margin-bottom: calc(var(--vh, 1vh) * 3);
`;

const LoginInput = styled.input`
  font-size: inherit;
  width: 70vw;
  height: 4vh;
  height: calc(var(--vh, 1vh) * 4);

  border: solid 1px ${globalTheme.blueColor};
  border-radius: 5px;
`;

const LoginButton = styled.div`
  margin-top: 3vh;
  margin-top: calc(var(--vh, 1vh) * 3);
`;

// login component
function Login() {
  const [username, setUsername] = useState();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [isOpenAlreadyExistsNameErrModal, setIsOpenAlreadyExistsNameErrModal] =
    useState(false);
  useEffect(() => {
    if (localStorage.getItem("id")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  const clickModalOutSide = (e) => {
    if (
      isOpenAlreadyExistsNameErrModal &&
      e.target.id !== "outOfRangeErrModal"
    ) {
      setIsOpenAlreadyExistsNameErrModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutSide);
    return () => {
      document.removeEventListener("mousedown", clickModalOutSide);
    };
  }, [isOpenAlreadyExistsNameErrModal]);

  const handleLogin = async () => {
    console.log(1);
    const hData = await axiosGet("hashcode");
    console.log(hData);
    localStorage.setItem("id", hData.hashcode);
    const sendData = { id: localStorage.getItem("id"), name: username };
    const uData = await axiosPut("user", sendData, null, null);
    console.log(uData);
    if (uData === "error") {
      setIsOpenAlreadyExistsNameErrModal(true);
      setIsLogin(false);
      localStorage.removeItem("id");
    } else {
      setIsLogin(true);
    }
  };
  return !isLogin ? (
    <LoginContainer>
      <ReactModal
        id="alreadyExistsName"
        isOpen={isOpenAlreadyExistsNameErrModal}
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
        This name already exists Please enter a different name.
      </ReactModal>
      <LoginTitle>Please enter a name.</LoginTitle>
      <LoginInput onChange={(e) => setUsername(e.target.value)}></LoginInput>
      <LoginButton onClick={handleLogin}>OK</LoginButton>
    </LoginContainer>
  ) : (
    <></>
  );
}

export default Login;
