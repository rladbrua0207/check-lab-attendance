import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/header";
import NavBar from "./components/navbar";
import CalendarPage from "./pages/CalendarPage";
import StatisticPage from "./pages/StatisticPage";
import StatusPage from "./pages/StatusPage";

const MainContainer = styled.div`
  height: 100%;
`;

function App() {
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

export default App;
