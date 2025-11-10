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
          icon: (
            <img src={"/success.svg"} alt="success" width={24} height={24} />
          ),
        };
      case "error":
        return {
          bg: "#EB5757E5",
          icon: <img src={"/error.svg"} alt="error" width={24} height={24} />,
        };
      case "warning":
        return {
          bg: "#EF6C00",
          icon: <img src={"/error.svg"} alt="error" width={24} height={24} />,
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
        zIndex: 9999,
        bgcolor: bg,
        color: "white",
        borderRadius: "12px",
        py: "12px",
        px: "20px",
        display: "flex",
        alignItems: "center",
        gap: 2,
        boxShadow: "0 0 32px rgba(0,0,0,0.6)",
        width: "100%",
        minHeight: "60px",
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
