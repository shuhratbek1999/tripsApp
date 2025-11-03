"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { hideAlert } from "@/redux/alertSlice";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";

export default function GlobalAlert() {
  const dispatch = useDispatch();
  const { message, type, visible } = useSelector(
    (state: RootState) => state.alert
  );

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideAlert()), 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible || !message) return null;

  const getStyle = () => {
    switch (type) {
      case "success":
        return {
          bg: "#2E7D32",
          icon: <CheckCircleIcon sx={{ color: "white" }} />,
        };
      case "error":
        return { bg: "#C62828", icon: <CancelIcon sx={{ color: "white" }} /> };
      case "warning":
        return {
          bg: "#EF6C00",
          icon: <WarningAmberIcon sx={{ color: "white" }} />,
        };
      default:
        return { bg: "#424242", icon: <InfoIcon sx={{ color: "white" }} /> };
    }
  };

  const { bg, icon } = getStyle();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        right: 40,
        zIndex: 9999,
        bgcolor: bg,
        color: "white",
        borderRadius: "12px",
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        maxWidth: "350px",
        width: "100%",
        animation: "fadeIn 0.3s ease-in-out",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(-10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      {icon}
      <Typography sx={{ fontSize: "14px", lineHeight: 1.4 }}>
        {message}
      </Typography>
    </Box>
  );
}
