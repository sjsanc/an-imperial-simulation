import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ThemeProvider } from "styled-components";

// import { ContextProvider } from "./store/store";
import { theme } from "./styles/theme";
import { ContextProvider } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
