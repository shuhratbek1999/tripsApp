"use client";

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      background: {
        default: "#f9f9f9",
      },
    },
    shape: {
      borderRadius: 10,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
