import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";
import Providers from "./providers/Providers";
import { ThemeProvider } from "./providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Providers>
        <App />
      </Providers>
    </ThemeProvider>
  </React.StrictMode>
);
