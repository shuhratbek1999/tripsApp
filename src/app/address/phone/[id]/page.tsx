"use client";

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Collapse,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { updateProductStatus } from "@/redux/tripSlice";

const PhoneDetailsPage = () => {
  const { id } = useParams();
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [openId, setOpenId] = useState<number | null>(null);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const trip = useSelector((state: RootState) => state.trips.trips[0]);

  // id orqali address topish
  const address = trip.details
    .flatMap((d) => d.addresses)
    .find((a) => a.id === Number(id));

  if (!address) return <Typography sx={{ p: 2 }}>Адрес не найден</Typography>;
  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const handleCheck = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  return (
    <Box sx={{ width: "100%", borderRadius: 2, p: 2, color: "#fff" }}>
      {/* Header */}
      <Box sx={{ width: "100%", mb: 2, ml: -2 }}>
        <img src="/logo-trips.svg" alt="Logo trips" />
      </Box>

      {/* Back */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <ArrowBackIosNewIcon
          fontSize="small"
          sx={{ color: "#fff", cursor: "pointer" }}
          onClick={() => router.back()}
        />
        <Typography>{address.phone}</Typography>
      </Box>

      {/* Search */}
      <TextField
        placeholder="Найти артикул/баркод"
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
      <Select
        fullWidth
        defaultValue="Все"
        size="small"
        sx={{
          backgroundColor: "#2A2A2A",
          color: "#fff",
          mb: 2,
          borderRadius: 1,
        }}
      >
        <MenuItem value="Все">Все</MenuItem>
        <MenuItem value="получен">Получен</MenuItem>
        <MenuItem value="не получен">Не получен</MenuItem>
      </Select>

      {/* Buttons */}
      <Button
        fullWidth
        sx={{
          backgroundColor: "#FFB800",
          color: "#fff",
          fontWeight: 600,
          borderRadius: "10px",
          textTransform: "none",
          mb: 2,
        }}
      >
        Новый товар
      </Button>

      {/* Products list */}
      {address.products?.map((p) => (
        <Box
          key={p.id}
          sx={{
            backgroundColor: "#2A2A2A",
            borderRadius: 2,
            mb: 1.5,
            p: 1.5,
            cursor: "pointer",
          }}
          onClick={() => setOpenId(openId === p.id ? null : p.id)}
        >
          {/* Title */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={checkedIds.includes(p.id)}
              onClick={(e) => e.stopPropagation()} // collapse ishlamasin
              onChange={() => handleCheck(p.id)}
              sx={{
                color: "#7C69F4",
                mr: 1,
                "&.Mui-checked": { color: "#7C69F4" },
                p: 0,
              }}
            />
            <Typography sx={{ fontSize: 14, fontWeight: 500, width: "80%" }}>
              {p.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                backgroundColor:
                  p.status === "Получен"
                    ? "#34C759"
                    : p.status === "Не получил"
                    ? "#E74C3C"
                    : "#7C69F4",
                px: 1,
                py: 0.3,
                borderRadius: 2,
              }}
            >
              <Typography sx={{ fontSize: 12 }}>{p.status}</Typography>
            </Box>
            <KeyboardArrowDownIcon
              sx={{
                color: "#7C69F4",
                transform: openId === p.id ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.3s",
              }}
            />
          </Box>

          {/* Collapse */}
          <Collapse in={openId === p.id} timeout="auto" unmountOnExit>
            <Box
              sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 2 }}
            >
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.title}
                  width={60}
                  height={60}
                  style={{ borderRadius: 8 }}
                />
              )}
              <Box sx={{ fontSize: 13, color: "#aaa" }}>
                {p.code && <Typography>Код: {p.code}</Typography>}
                <Typography>Артикул: {p.article}</Typography>
                <Typography>Баркод: {p.barcode}</Typography>
              </Box>
            </Box>

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
              <Button
                fullWidth
                sx={{
                  backgroundColor: "#E74C3C",
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "10px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    updateProductStatus({
                      addressId: address.id,
                      productId: p.id,
                      status: "Не получил",
                    })
                  );
                }}
              >
                Не получил
              </Button>
              <Button
                fullWidth
                sx={{
                  backgroundColor: "#2ECC71",
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "10px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    updateProductStatus({
                      addressId: address.id,
                      productId: p.id,
                      status: "Получен",
                    })
                  );
                }}
              >
                Получил
              </Button>
            </Box>
            <Button
              fullWidth
              sx={{
                mt: 1,
                backgroundColor: "#FFA800",
                color: "#FFFF",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "10px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  updateProductStatus({
                    addressId: address.id,
                    productId: p.id,
                    status: "Не получил",
                  })
                );
              }}
            >
              Не определил
            </Button>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default PhoneDetailsPage;
