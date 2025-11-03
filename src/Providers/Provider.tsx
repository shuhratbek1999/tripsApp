"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#2D2D2D",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A9B7BD",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    allVariants: {
      textTransform: "none",
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
