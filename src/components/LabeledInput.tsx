"use client";

import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";

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

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      fullWidth
      InputLabelProps={{ shrink: false }} // ✅ labelni butunlay yo‘q qiladi
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
    height: "45px",
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
  "& .MuiInputBase-input": {
    color: "#A9B7BD",
    height: "45px",
  },
};
