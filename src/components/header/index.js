import React from "react";
import styled from "styled-components";
import { globalTheme } from "../../GlobalTheme";

const HeaderContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 3vh;
  margin-top: calc(var(--vh, 1vh) * 3);
  margin-bottom: calc(var(--vh, 1vh) * 1);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  font-size: 24px;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(val) =>
    val.isLocationIn ? globalTheme.blueColor : globalTheme.redColor};
`;

// header component
function Header({ isLocationIn }) {
  return (
    <HeaderContainer>
      <HeaderTitle>DIP-lab Check</HeaderTitle>
      <Indicator isLocationIn={isLocationIn}></Indicator>
    </HeaderContainer>
  );
}

export default Header;
