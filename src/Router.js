import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/header";
import Login from "./components/login";
import NavBar from "./components/navbar";
import CalendarPage from "./pages/CalendarPage";
import StatisticPage from "./pages/StatisticPage";
import StatusPage from "./pages/StatusPage";
import { useRecoilState } from "recoil";
import { isLocationInAtom, isLoginAtom } from "./atom";
import MobileDetect from "mobile-detect";
import ReactModal from "react-modal";

const MainContainer = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
`;

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

function getDistance(lat1, lon1, lat2, lon2) {
  if (lat1 === lat2 && lon1 === lon2) return 0;

  let radLat1 = (Math.PI * lat1) / 180;
  let radLat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;
  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;

  return dist;
}

function Router() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [isLocationIn, setIsLocationIn] = useRecoilState(isLocationInAtom);
  let isMobile = /Mobi/i.test(window.navigator.userAgent);
  var md = new MobileDetect(navigator.userAgent);

  const getIsLocationIn = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const maxLat = 127.3454;
      const minLat = 127.3432;
      const minLon = 36.3655;
      const maxLon = 36.3675;

      //연구실 위도(세로): 36.366578, 경도(가로): 127.344316
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      console.log(lat);
      console.log(lon);
      // Todo 위치 안에있을경우 isLocationIn true;
      // console.log(lat >= minLat - 100000);
      // console.log(lat <= maxLat + 100000);
      // console.log(lon >= minLon - 100000);
      // console.log(lon <= maxLon + 100000);
      if (
        lat >= minLat - 100 &&
        lat <= maxLat + 100 &&
        lon >= minLon - 100 &&
        lon <= maxLon + 100
      ) {
        setIsLocationIn(true);
      } else {
        setIsLocationIn(false);
      }
    });
  };
  useEffect(() => {
    getIsLocationIn();
    setInterval(() => {
      getIsLocationIn();
    }, 5000);
    if (!isMobile && md.tablet !== null) {
    }
  }, []);

  return (
    <BrowserRouter>
      {isMobile && md.tablet() === null ? (
        isLogin ? (
          <MainContainer>
            <Header isLocationIn={isLocationIn}></Header>
            <NavBar></NavBar>
            <Routes>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/statistic" element={<StatisticPage />} />
              <Route path="/status" element={<StatusPage />} />
            </Routes>
          </MainContainer>
        ) : (
          <Login></Login>
        )
      ) : (
        <ReactModal
          isOpen={true}
          ariaHideApp={false}
          style={{
            overlay: {
              position: "fixed",
              alignItems: "center",
            },
            content: {
              fontSize: "30px",
              width: "80%",
              height: "90%",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          Please enter via mobile.
        </ReactModal>
      )}
    </BrowserRouter>
  );
}

export default Router;
