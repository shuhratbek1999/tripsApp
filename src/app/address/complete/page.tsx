"use client";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductModal from "@/app/new-product/page";

const CompletedAddressPage = () => {
  const router = useRouter();

  // 🔹 Redux'dan ma’lumotlar
  const trip = useSelector((state: RootState) => state.trips.trips[0]);
  const cluster = trip.details[0];

  // 🔹 Collapse uchun local holat
  const [openId, setOpenId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const toggleCollapse = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ProductModal open={open} onClose={() => setOpen(false)} />
      {/* Logo */}
      <Box sx={{ width: "100%", mb: 2, ml: -2 }}>
        <img src="/logo-trips.svg" alt="Logo trips" />
      </Box>

      {/* Address */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <ArrowBackIosNewIcon
          fontSize="small"
          sx={{ color: "#fff" }}
          onClick={() => router.back()}
        />
        <Typography sx={{ fontWeight: 500 }}>
          {cluster.addresses[0].address}
        </Typography>
      </Box>

      {/* Search */}
      <TextField
        placeholder="Найти номер"
        fullWidth
        size="small"
        InputProps={{
          sx: {
            backgroundColor: "#FDF2F2",
            color: "#A9B7BD",
            borderRadius: 1,
          },
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: "#7C69F4" }} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Select */}
      <TextField
        select
        value="Все"
        fullWidth
        InputProps={{
          sx: {
            borderRadius: 2,
            backgroundColor: "#2A2A2A",
            color: "#fff",
          },
        }}
        sx={{ mb: 2 }}
      >
        <MenuItem value="Все">Все</MenuItem>
        <MenuItem value="Забрать">Забрать</MenuItem>
        <MenuItem value="Получено">Получено</MenuItem>
      </TextField>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button
          fullWidth
          sx={{
            backgroundColor: "#FFA800",
            color: "#FFFF",
            fontWeight: 600,
            borderRadius: "10px",
            textTransform: "none",
            py: 1,
          }}
          onClick={() => setOpen(true)}
        >
          Новый товар
        </Button>
        <Button
          fullWidth
          sx={{
            backgroundColor: "#6C63FF",
            color: "#fff",
            fontWeight: 600,
            borderRadius: "10px",
            textTransform: "none",
            py: 1,
          }}
        >
          Выгрузить данные
        </Button>
      </Box>

      {/* Address list */}
      {cluster.addresses.map((addr) => (
        <Box key={addr.id} sx={{ mb: 1.5 }}>
          {/* Header */}
          <Box
            onClick={() => toggleCollapse(addr.id)}
            sx={{
              backgroundColor: "#2A2A2A",
              borderRadius: 2,
              p: 1.2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {addr.phone}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography
                sx={{
                  backgroundColor: addr.rest > 0 ? "#FF4D4F" : "#00C853",
                  color: "#fff",
                  fontSize: 12,
                  borderRadius: 1,
                  px: 1,
                  py: 0.3,
                }}
              >
                {addr.rest > 0 ? "Забрать заказы" : "Все получено"}
              </Typography>
              {openId === addr.id ? (
                <KeyboardArrowUpIcon
                  sx={{ color: addr.rest > 0 ? "#FFBABA" : "#8EFFA1" }}
                />
              ) : (
                <KeyboardArrowDownIcon
                  sx={{ color: addr.rest > 0 ? "#FFBABA" : "#8EFFA1" }}
                />
              )}
            </Box>
          </Box>

          {/* Collapse content */}
          <Collapse in={openId === addr.id}>
            <Box
              sx={{
                backgroundColor: "#1E1E1E",
                borderRadius: "0 0 12px 12px",
                p: 1.5,
                mt: 0.3,
              }}
            >
              <Typography sx={{ fontSize: 13 }}>
                Кол-во товаров: {addr.number_products}
              </Typography>
              <Typography sx={{ fontSize: 13 }}>
                Кол-во выданных товаров: {addr.accepted}
              </Typography>
              <Typography sx={{ fontSize: 13 }}>
                Кол-во товаров с кодами: {addr.numbers_adress}
              </Typography>
              <Typography sx={{ fontSize: 13 }}>
                Кол-во получено: {addr.delivered_count}
              </Typography>
              <Typography sx={{ fontSize: 13 }}>
                Осталось получить: {addr.rest}
              </Typography>

              <Button
                fullWidth
                sx={{
                  backgroundColor: "#B34EF1",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 1.5,
                  textTransform: "none",
                  py: 1,
                  mt: 1,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/address/phone/${addr.id}`);
                }}
              >
                Подробнее
              </Button>
            </Box>
          </Collapse>
        </Box>
      ))}

      {/* Bottom button */}
      <Button
        fullWidth
        sx={{
          backgroundColor: "#B34EF1",
          color: "#fff",
          fontWeight: 600,
          borderRadius: 1.5,
          textTransform: "none",
          py: 1.2,
          mt: 2,
        }}
        onClick={() => router.push("/trips")}
      >
        Закончил адрес
      </Button>
    </Box>
  );
};

export default CompletedAddressPage;
