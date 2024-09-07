import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#9395f5",
      main: "#5d00e3",
      dark: "#5d00e3",
    },
    secondary: {
      light: "#f5f6fa",
      main: "#f4efe8",
      dark: "#9491a8",
    },
    border: {
      main: "#5d00e3",
      primary: "#5d00e3",
      scroll: "#5d00e3",
      input: "#7443C4",
    },
    icon: {
      warning: "#fcbb11",
      green: "#68B34E",
      error: "#f46a6a",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.23)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(0, 0, 0, 0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
            },
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
