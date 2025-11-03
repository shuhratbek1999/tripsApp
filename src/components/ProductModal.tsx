"use client";

import React from "react";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductForm from "@/components/ProductForm";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProductModal({ open, onClose }: ProductModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: "#1E1E1E",
          borderRadius: 30,
          position: "relative",
          overflow: "visible",
          width: "90%",
        },
      }}
    >
      {/* Close tugmasi */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "#B5B5B5",
          "&:hover": { color: "white" },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* ProductForm ichiga onClose uzatamiz */}
      <ProductForm onClose={onClose} />
    </Dialog>
  );
}
