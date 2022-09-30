import {useState} from "react";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import styled from "styled-components";
import Header from "./components/header";
import Login from "./components/login";
import NavBar from "./components/navbar";
import CalendarPage from "./pages/CalendarPage";
import StatisticPage from "./pages/StatisticPage";
import StatusPage from "./pages/StatusPage";

const MainContainer = styled.div`
  height: 100vh;
  overflow: hidden;
`;

function Router() {
    const [isLogin, setIsLogin] = useState(false);
    return (
        <BrowserRouter>
            <MainContainer>
                <Header></Header>
                <NavBar></NavBar>
                <Routes>
                    <Route path="/" element={<CalendarPage/>}/>
                    <Route path="/statistic" element={<StatisticPage/>}/>
                    <Route path="/status" element={<StatusPage/>}/>
                </Routes>
                {!isLogin ? <Login></Login> : <></>}
            </MainContainer>
        </BrowserRouter>
    );
}

export default Router;
