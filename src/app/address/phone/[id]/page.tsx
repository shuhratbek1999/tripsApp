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
import ProductModal from "@/components/ProductModal";
import { showAlert } from "@/redux/alertSlice";
const PhoneDetailsPage = () => {
  const { id } = useParams();
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [openId, setOpenId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const trip = useSelector((state: RootState) => state.trips.trips[0]);

  // id orqali address topish
  const address = trip.details
    .flatMap((d) => d.addresses)
    .find((a) => a.id === Number(id));

  if (!address) return <Typography sx={{ p: 2 }}>Адрес не найден</Typography>;

  const handleCheck = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    dispatch(showAlert({ message: "Спасибо за получение!", type: "success" }));
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
          fontSize="large"
          sx={{ color: "#7C69F4", ml: -1 }}
          onClick={() => router.back()}
        />
        <Typography
          sx={{ fontSize: "16px", fontWeight: 700, color: "#FDF2F2" }}
        >
          {address.phone}
        </Typography>
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
            borderRadius: "10px",
            height: "48px",
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
        sx={{
          backgroundColor: "#424242",
          color: "#A9B7BD",
          mb: 2,
          borderRadius: "10px",
          height: "48px",
        }}
      >
        <MenuItem value="Все">Все</MenuItem>
        <MenuItem value="получен">Получен</MenuItem>
        <MenuItem value="не получен">Не получен</MenuItem>
      </Select>

      {/* Buttons */}
      <Button
        sx={{
          backgroundColor: "#FFB800",
          color: "#FDF2F2",
          fontWeight: 500,
          borderRadius: "10px",
          textTransform: "none",
          height: "45px",
          mb: 2,
          fontSize: "16px",
          width: "100%",
        }}
        onClick={() => setOpen(true)}
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
                px: `5px`,
                py: 0.3,
                borderRadius: "30px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  width: "80px",
                  textAlign: "center",
                }}
              >
                {p.status}
              </Typography>
            </Box>
            <KeyboardArrowDownIcon
              sx={{
                color: "#7C69F4",
                transform: openId === p.id ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.3s",
                fontSize: "42px",
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
                  width={85}
                  height={85}
                  style={{ borderRadius: 10 }}
                />
              )}
              <Box sx={{ fontSize: 12, color: "#A9B7BD", fontWeight: 400 }}>
                {p.code && <Typography>Код: {p.code}</Typography>}
                <Typography>Артикул: {p.article}</Typography>
                <Typography>Баркод: {p.barcode}</Typography>
              </Box>
            </Box>

            {/* Buttons */}
            {checkedIds.length === 0 && (
              <>
                <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
                  <Button
                    fullWidth
                    sx={{
                      backgroundColor: "#EB5757",
                      color: "#FDF2F2",
                      fontWeight: 500,
                      textTransform: "none",
                      borderRadius: "10px",
                      height: "45px",
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
                      dispatch(
                        showAlert({ message: "Не получил!", type: "error" })
                      );
                    }}
                  >
                    Не получил
                  </Button>

                  <Button
                    fullWidth
                    sx={{
                      backgroundColor: "#34C759",
                      color: "#FDF2F2",
                      fontWeight: 500,
                      textTransform: "none",
                      borderRadius: "10px",
                      height: "45px",
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
                      dispatch(
                        showAlert({ message: "Получил!", type: "success" })
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
                    backgroundColor: "#FFAE00",
                    color: "#FDF2F2",
                    fontWeight: 500,
                    textTransform: "none",
                    borderRadius: "10px",
                    height: "45px",
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
                    dispatch(
                      showAlert({ message: "Не определил!", type: "warning" })
                    );
                  }}
                >
                  Не определил
                </Button>
              </>
            )}
          </Collapse>
        </Box>
      ))}
      {checkedIds.length !== 0 && (
        <>
          <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
            <Button
              fullWidth
              sx={{
                backgroundColor: "#EB5757",
                color: "#FDF2F2",
                fontWeight: 500,
                textTransform: "none",
                borderRadius: "10px",
                height: "45px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(showAlert({ message: "Не получил!", type: "error" }));
              }}
            >
              Не получил
            </Button>

            <Button
              fullWidth
              sx={{
                backgroundColor: "#34C759",
                color: "#FDF2F2",
                fontWeight: 500,
                textTransform: "none",
                borderRadius: "10px",
                height: "45px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(showAlert({ message: "Получил!", type: "success" }));
              }}
            >
              Получил
            </Button>
          </Box>

          <Button
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#FFAE00",
              color: "#FDF2F2",
              fontWeight: 500,
              textTransform: "none",
              borderRadius: "10px",
              height: "45px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                showAlert({ message: "Не определил!", type: "warning" })
              );
            }}
          >
            Не определил
          </Button>
        </>
      )}
      <ProductModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default PhoneDetailsPage;
