"use client";

import React from "react";
import { TextField } from "@mui/material";

interface LabeledTextareaProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  rows?: number;
}

export default function LabeledTextarea({
  value,
  placeholder,
  onChange,
  rows = 4,
}: LabeledTextareaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      InputLabelProps={{ shrink: false }}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      multiline
      rows={rows}
      fullWidth
      variant="outlined"
      sx={textareaStyle}
    />
  );
}

const textareaStyle = {
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
