"use client";

import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";

interface LabeledInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  withScanner?: boolean;
}

export default function LabeledInput({
  label,
  value,
  placeholder,
  onChange,
  withScanner = false,
}: LabeledInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: withScanner ? (
          <InputAdornment position="end">
            <IconButton>
              <CenterFocusWeakIcon sx={{ color: "#7C69F4" }} />
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
      sx={inputStyle}
    />
  );
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#FDF2F2",
    "& fieldset": {
      borderColor: "#444",
    },
    "&:hover fieldset": {
      borderColor: "#7C69F4",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7C69F4",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#A9B7BD",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#A9B7BD",
  },
  "& .MuiInputBase-input": {
    color: "#A9B7BD",
  },
};
