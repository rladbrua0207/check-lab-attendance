import React from "react";
import ReactDOM from "react-dom";
import App from "./Router";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { globalTheme } from "./GlobalTheme";
import Router from "./Router";

ReactDOM.render(
  <React.StrictMode>
    {/* theme 설정을 위해 작성 */}
    <ThemeProvider theme={globalTheme}>
      {/** 전역 스타일 적용을 위해 작성 */}
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
