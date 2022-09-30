import React from "react";
import styled from "styled-components";
import {globalTheme} from "../../GlobalTheme";

const StatisticHeaderContainer = styled.div`
  height: 5vh;
  display: flex;
  justify-content: space-between;
  padding-inline: 5vw;
`;

const DateUnitMenu = styled.div`
  width: 30vw;
  border: solid 1px ${globalTheme.blueColor};
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckAverageInOutContainer = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CheckAverageInBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CheckAverageOutBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CheckAverageIn = styled.div``;

const CheckAverageOut = styled.div``;

function StatisticHeader() {
    return (
        <StatisticHeaderContainer>
            <DateUnitMenu>year</DateUnitMenu>
            <CheckAverageInOutContainer>
                <CheckAverageInBox>
                    <CheckAverageIn>07 : 10</CheckAverageIn>
                    <div>avg in</div>
                </CheckAverageInBox>
                <CheckAverageOutBox>
                    <CheckAverageOut>17 : 50</CheckAverageOut>
                    <div>avg out</div>
                </CheckAverageOutBox>
            </CheckAverageInOutContainer>
        </StatisticHeaderContainer>
    );
}

export default StatisticHeader;
