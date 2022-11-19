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
import { userLocationAtom } from "./atom";

const MainContainer = styled.div`
  height: 100vh;
  overflow: hidden;
`;

function Router() {
  const [userLocation, setUserLocation] = useRecoilState(userLocationAtom);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      setUserLocation({ lat, lon });
    });
  }, []);

  return (
    <BrowserRouter>
      <MainContainer>
        <Header></Header>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/statistic" element={<StatisticPage />} />
          <Route path="/status" element={<StatusPage />} />
        </Routes>
      </MainContainer>
    </BrowserRouter>
  );
}

export default Router;
