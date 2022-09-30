import React from "react";
import styled from "styled-components";
import {globalTheme} from "../../GlobalTheme";

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

function CheckButton() {
    return (
        <CheckButtonContainer>
            <CheckButtonBox>출석하기</CheckButtonBox>
        </CheckButtonContainer>
    );
}

export default CheckButton;
