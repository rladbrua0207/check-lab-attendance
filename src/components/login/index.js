import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {globalTheme} from "../../GlobalTheme";
import {axiosGet, axiosPut} from "../../api";

const LoginContainer = styled.div`
  width: 95vw;
  height: 25vh;
  border: solid 1px ${globalTheme.blueColor};
  border-radius: 20px;
  position: absolute;
  bottom: 45%;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const LoginTitle = styled.div`
  margin-bottom: 3vh;
`;

const LoginInput = styled.input`
  font-size: inherit;
  width: 70vw;
  height: 4vh;
  border: solid 1px ${globalTheme.blueColor};
  border-radius: 5px;
`;

const LoginButton = styled.div`
  margin-top: 3vh;
`;

function Login() {
    const [username, setUsername] = useState();
    const [isLogin, setIsLogin] = useState(false);


    useEffect(() => {
        if (localStorage.getItem("id")) {
            setIsLogin(true);
        }
    }, []);

    const handleLogin = async () => {
        const hData = await axiosGet("hashcode");
        localStorage.setItem("id", hData.hashcode);
        console.log(localStorage.getItem("id"));
        const sendData = {id: localStorage.getItem("id"), name: username}
        const uData = await axiosPut("user", sendData, null, null);
        setIsLogin(true);
    }
    return (
        (!isLogin ? <LoginContainer>
            <LoginTitle>이름을 입력하시오.</LoginTitle>
            <LoginInput onChange={(e) => setUsername(e.target.value)}></LoginInput>
            <LoginButton onClick={handleLogin}>OK</LoginButton>
        </LoginContainer> : <></>)
    )
}

export default Login;
