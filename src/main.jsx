import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProviderWrapper } from "./context/auth.context";
import { BoardProviderWrapper } from "./context/board.context";
import { ThemeProviderWrapper } from "./context/theme.context";
import { ViewportProviderWrapper } from "./context/viewport.context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <AuthProviderWrapper>
      <ThemeProviderWrapper>
        <BoardProviderWrapper>
          <ViewportProviderWrapper>
            <App />
          </ViewportProviderWrapper>
        </BoardProviderWrapper>
      </ThemeProviderWrapper>
    </AuthProviderWrapper>
  </Router>
);
