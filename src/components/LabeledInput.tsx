"use client";

import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";

interface LabeledInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  withScanner?: boolean;
}

export default function LabeledInput({
  value,
  placeholder,
  onChange,
  withScanner = false,
}: LabeledInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const BarcodeScanIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Chetlardagi yumaloq kamonlar — sal ichkariga tortilgan */}
      <path
        d="M6 8C6 6.34315 7.34315 5 9 5M15 5C16.6569 5 18 6.34315 18 8M18 16C18 17.6569 16.6569 19 15 19M9 19C7.34315 19 6 17.6569 6 16"
        stroke="#7C69F4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* O‘rtadagi chiziq — biroz uzunroq */}
      <path
        d="M7 12H17"
        stroke="#7C69F4"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <TextField
      variant="filled"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      fullWidth
      InputProps={{
        disableUnderline: true,
        endAdornment: withScanner ? (
          <InputAdornment position="end">
            <IconButton disableRipple sx={{ p: 0 }}>
              <BarcodeScanIcon />
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
      sx={inputStyle}
    />
  );
}

const inputStyle = {
  "& .MuiFilledInput-root": {
    borderRadius: "10px",
    backgroundColor: "#FDF2F2",
    height: "48px",
    border: "none !important",
    boxShadow: "none !important",
    outline: "none !important",
    "&:before, &:after": {
      display: "none !important",
    },
  },
  "& .MuiInputBase-input": {
    color: "#A9B7BD",
    fontSize: "16px",
    padding: "0 14px",
    "::placeholder": {
      color: "#A9B7BD",
      opacity: 1,
    },
  },
};
