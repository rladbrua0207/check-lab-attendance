import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 90%;
  margin: 5%;
  margin-top: 3vh;
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
  background-color: tomato;
`;

// header component
function Header() {
  return (
    <HeaderContainer>
      <HeaderTitle>출석체크</HeaderTitle>
      <Indicator>{/** Todo 동적으로 색 바뀌도록 */}</Indicator>
    </HeaderContainer>
  );
}

export default Header;
