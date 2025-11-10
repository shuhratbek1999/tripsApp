"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProductCard from "@/components/ProductCard";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import ProblemModal from "@/components/ProblemModal";
import { openProblemModal } from "@/redux/problemSlice";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Collapse,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = useState("Все");
  const [open, setOpen] = useState(false);
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  return (
    <Box sx={{ p: 2, background: "#141414", minHeight: "100vh" }}>
      <Box sx={{ width: "100%", mb: 2, ml: -2 }}>
        <img src="/logo-trips.svg" alt="Logo trips" />
      </Box>
      {/* Back */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <img
          src="/exit.svg"
          alt="exit img"
          width={12.9}
          height={24}
          onClick={() => router.back()}
        />
        <Typography
          sx={{ fontWeight: 700, fontSize: "16px", color: "#FDF2F2" }}
        >
          Ул Пушкина колотушкина д2 ст 55
        </Typography>
      </Box>
      {/* Search */}
      <TextField
        fullWidth
        placeholder="Найти номер"
        variant="outlined"
        size="small"
        InputProps={{
          sx: {
            backgroundColor: "#FDF2F2",
            color: "#A9B7BD",
            borderRadius: "10px",
            height: "48px",
            fontWeight: 500,
            fontSize: "16px",
            px: 1.5,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // ❌ obvodka yo‘q
            },
          },
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: "#7C69F4" }} />
            </InputAdornment>
          ),
        }}
        inputProps={{
          sx: {
            "&::placeholder": {
              color: "#A9B7BD",
              opacity: 1, // rang tiniq chiqsin
            },
          },
        }}
        sx={{
          mb: 2,
        }}
      />
      <Box sx={{ position: "relative", mb: 2 }}>
        <FormControl fullWidth variant="outlined">
          <Select
            value={value}
            onChange={handleChange}
            displayEmpty
            IconComponent={() => null}
            sx={{
              backgroundColor: "#424242",
              color: "#A9B7BD",
              borderRadius: "10px",
              height: "48px",
              fontWeight: 500,
              fontSize: "16px",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              paddingRight: "40px", // ikon uchun joy
            }}
          >
            <MenuItem value="Все">Все</MenuItem>
            <MenuItem value="Забрать">Забрать</MenuItem>
            <MenuItem value="Получено">Получено</MenuItem>
          </Select>
        </FormControl>
        <img
          src="/str2.svg"
          alt="strelkaa"
          style={{
            position: "absolute",
            right: 12,
            top: 12,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </Box>
      {/* Buttons */}
      <Button
        fullWidth
        sx={{
          backgroundColor: "#FFB800",
          color: "#FDF2F2",
          fontWeight: 500,
          borderRadius: "10px",
          textTransform: "none",
          fontSize: "16px",
          height: "45px",
          my: 2,
        }}
        onClick={() => setOpen(true)}
      >
        Новый товар
      </Button>
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
      <ProblemModal />
    </Box>
  );
}
