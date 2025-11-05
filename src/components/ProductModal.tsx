"use client";

import { Dialog } from "@mui/material";
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
      {/* ProductForm ichiga onClose uzatamiz */}
      <ProductForm onClose={onClose} />
    </Dialog>
  );
}
