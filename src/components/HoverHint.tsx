"use client";

import React, { useState } from "react";
import { Box, Fade } from "@mui/material";

interface HoverHintProps {
  children: React.ReactNode; // Hover qilinadigan element
  hintContent: React.ReactNode; // Tooltip ichidagi komponent (rasm, matn, va h.k.)
}

export default function HoverHint({ children, hintContent }: HoverHintProps) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const tooltipWidth = 260; // tooltip eni
    const padding = 8;

    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    let top = rect.bottom + padding;

    // Ekrandan chiqmasligi uchun tekshiramiz
    if (left + tooltipWidth > window.innerWidth - 8) {
      left = window.innerWidth - tooltipWidth - 8;
    }
    if (left < 8) {
      left = 8;
    }

    setPos({ top, left });
    setVisible(true);
  };

  const handleMouseLeave = () => setVisible(false);

  return (
    <>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          gap: 1,
        }}
      >
        {children}
      </Box>

      <Fade in={visible} timeout={150}>
        <Box
          sx={{
            display: visible ? "block" : "none",
            position: "fixed",
            top: pos.top,
            left: pos.left,
            zIndex: 9999,
            bgcolor: "#1E1E1E",
            color: "white",
            border: "1px solid #444",
            borderRadius: "10px",
            p: 2,
            width: 260,
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          {hintContent}
        </Box>
      </Fade>
    </>
  );
}
