import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProviderWrapper } from "./context/auth.context";
import { BoardProviderWrapper } from "./context/board.context";
import { ThemeProviderWrapper } from "./context/theme.context";
import { ViewportProviderWrapper } from "./context/viewport.context";
import { SidebarProviderWrapper } from "./context/sidebar.context";
import { ModalProviderWrapper } from "./context/modal.context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <AuthProviderWrapper>
      <ThemeProviderWrapper>
        <BoardProviderWrapper>
          <ViewportProviderWrapper>
            <SidebarProviderWrapper>
              <ModalProviderWrapper>
                <App />
              </ModalProviderWrapper>
            </SidebarProviderWrapper>
          </ViewportProviderWrapper>
        </BoardProviderWrapper>
      </ThemeProviderWrapper>
    </AuthProviderWrapper>
  </Router>
);
