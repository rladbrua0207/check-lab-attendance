import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/header";
import Login from "./components/login";
import NavBar from "./components/navbar";
import CalendarPage from "./pages/CalendarPage";
import StatisticPage from "./pages/StatisticPage";
import StatusPage from "./pages/StatusPage";
import { useRecoilState } from "recoil";
import { isLocationInAtom, isLoginAtom, userLocationAtom } from "./atom";

const MainContainer = styled.div`
  height: 100vh;
  overflow: hidden;
`;

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

  const getIsLocationIn = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const maxLat = 127.3454;
      const minLat = 127.3432;
      const minLon = 36.3655;
      const maxLon = 36.3675;

      //연구실 위도(세로): 36.366578, 경도(가로): 127.344316
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      // Todo 위치 안에있을경우 isLocationIn true;
      // console.log(lat >= minLat - 100000);
      // console.log(lat <= maxLat + 100000);
      // console.log(lon >= minLon - 100000);
      // console.log(lon <= maxLon + 100000);
      if (
        lat >= minLat - 100000 &&
        lat <= maxLat + 100000 &&
        lon >= minLon - 100000 &&
        lon <= maxLon + 100000
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
  }, []);

  return (
    <BrowserRouter>
      {isLogin ? (
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
      )}
    </BrowserRouter>
  );
}

export default Router;
