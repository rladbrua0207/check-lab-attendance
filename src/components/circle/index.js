import React from "react";
import styled from "styled-components";
import {globalTheme} from "../../GlobalTheme";

const CircleContainer = styled.svg`  
  display: block;
  margin: 10px auto;
  max-width: 80%;
  max-height: 250px;
  

  //position: relative;
  //border: 5px solid;
  //width: 100px;
  //height: 100px;
  //border-radius: 50%;
  //border-color: yellow yellow transparent transparent;
  //transform: rotate(70deg);
  //filter:hue-rotate(360deg);
`;

const Path = styled.path`
  stroke: #4CC790;
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }
`;

// const CircleBox = styled.div`
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   width: 10vw;
//   height: 10vw;
//   transform: translate(-50%, -50%);
//
//   .circle {
//     position: relative;
//     overflow: hidden;
//     height: 50%;
//     width: 50%;
//   }
//
//   .circle:after {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 8vw;
//     height: 8vw;
//     box-sizing: border-box;
//     border-radius: 50%;
//     border:2px solid transparent;
//   }
// `;
//
// const CircleTop = styled.div`
//   &:after {
//     border-top-color: ${globalTheme.blueColor} !important;
//     border-left-color: ${globalTheme.blueColor} !important;
//   }
//
// `;
//
// const CircleBottom = styled.div`
//   &:after {
//     border-top-color: ${globalTheme.blueColor} !important;
//     border-left-color: ${globalTheme.blueColor} !important;
//   }
// `;

function Circle() {
    return (<CircleContainer viewBox={"0 0 36 36"}>
        <Path stroke-dasharray={"60, 100"}
              d={"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"}></Path>
        {/*<CircleBox>*/}
        {/*    <CircleTop className={"circle"}></CircleTop>*/}
        {/*    <CircleBottom className={"circle"}></CircleBottom>*/}
        {/*</CircleBox>*/}
    </CircleContainer>);
}

export default Circle;
