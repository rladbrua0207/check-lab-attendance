import React from "react";
import styled, { keyframes } from "styled-components";
import { globalTheme } from "../../GlobalTheme";

const CircleContainer = styled.svg`
  display: block;
  margin: 0 auto;
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
  stroke: #4cc790;
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  /* animation: progress 3s ease-out forwards;
  -webkit-animation: progress 3s ease-out forwards;
  -moz-animation: progress 3s ease-out forwards;
  -ms-animation: progress 3s ease-out forwards;
  -o-animation: progress 3s ease-out forwards; */
  stroke-dasharray: ${(props) => props.progress} 100;

  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
    100% {
      stroke-dasharray: ${(props) => props.progress} 100;
    }
  }
  @-webkit-keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
    100% {
      stroke-dasharray: ${(props) => props.progress} 100;
    }
  }
  @-moz-keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
    100% {
      stroke-dasharray: ${(props) => props.progress} 100;
    }
  }
  @-ms-keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
    100% {
      stroke-dasharray: ${(props) => props.progress} 100;
    }
  }
  @-o-keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
    100% {
      stroke-dasharray: ${(props) => props.progress} 100;
    }
  }
`;

// 사용자가 일을 한 만큼 date마다의 원을 채워주기 위한 component
function Circle({ progress }) {
  // console.log(progress);
  return (
    <CircleContainer viewBox={"0 0 36 36"}>
      <Path
        stroke-dasharray={"60, 100"}
        progress={progress}
        d={
          "M18 2.0845 a 15.9155 15.9155 1 0 0 0 31.831 a 15.9155 15.9155 1 0 0 0 -31.831"
        }
      ></Path>
    </CircleContainer>
  );
}

export default Circle;
