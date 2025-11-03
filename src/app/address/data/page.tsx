"use client";

import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Collapse,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductModal from "@/components/ProductModal";
import ProblemModal from "@/components/ProblemModal";
import { openProblemModal } from "@/redux/problemSlice";
import { useDispatch } from "react-redux";
const AddressDataPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const trip = useSelector((state: RootState) => state.trips.trips[0]);
  const addresses = trip.details[0].addresses;

  const [openId, setOpenId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [problemOpen, setProblemOpen] = useState(false);
  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        p: 2,
        color: "#fff",
      }}
    >
      {/* Header */}
      <Box sx={{ width: "100%", mb: 2, ml: -2 }}>
        <img src="/logo-trips.svg" alt="Logo trips" />
      </Box>

      {/* Back */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <ArrowBackIosNewIcon
          fontSize="small"
          sx={{ color: "#fff" }}
          onClick={() => router.back()}
        />
        <Typography>Ул Пушкина колотушкина д2 ст 55</Typography>
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
        <MenuItem value="Забрать">Забрать</MenuItem>
        <MenuItem value="Получено">Получено</MenuItem>
      </Select>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button
          fullWidth
          sx={{
            backgroundColor: "#FFB800",
            color: "#FFFF",
            fontWeight: 600,
            borderRadius: "10px",
            textTransform: "none",
          }}
          onClick={() => setOpen(true)}
        >
          Новый товар
        </Button>
        <Button
          fullWidth
          sx={{
            backgroundColor: "#7A5FFF",
            color: "#fff",
            fontWeight: 600,
            borderRadius: "10px",
            textTransform: "none",
          }}
          onClick={() => dispatch(openProblemModal())}
        >
          Выгрузить данные
        </Button>
      </Box>

      {/* Phones list */}
      {addresses.map((item) => (
        <Box
          key={item.id}
          sx={{
            backgroundColor: "#2A2A2A",
            borderRadius: "10px",
            mb: 1.5,
            cursor: "pointer",
            p: 1.5,
          }}
          onClick={() => handleToggle(item.id)}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
              {item.phone}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  backgroundColor: item.rest === 0 ? "#2ECC71" : "#E74C3C",
                  px: 1,
                  py: 0.3,
                  borderRadius: 30,
                }}
              >
                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                  {item.rest === 0 ? "Все получено" : "Забрать заказы"}
                </Typography>
              </Box>
              <KeyboardArrowDownIcon
                fontSize="medium"
                sx={{
                  transform:
                    openId === item.id ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.3s",
                  color: "#7C69F4",
                }}
              />
            </Box>
          </Box>

          {/* Collapse */}
          <Collapse in={openId === item.id} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 1.5, color: "#aaa", fontSize: 13 }}>
              {[
                ["Кол-во адресов:", item.numbers_adress],
                ["Кол-во товаров:", item.number_products],
                ["Кол-во принятых:", item.accepted],
                ["Кол-во доставлено:", item.delivered_count],
                ["Осталось получить:", item.rest],
              ].map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "80%",
                  }}
                >
                  <Typography>{label}</Typography>
                  <Typography>{value}</Typography>
                </Box>
              ))}
            </Box>

            <Button
              fullWidth
              sx={{
                mt: 1.5,
                backgroundColor: "#7A5FFF",
                color: "#fff",
                fontWeight: 600,
                borderRadius: 1,
                textTransform: "none",
              }}
              onClick={(e) => {
                e.stopPropagation();
                router.push("/address/complete");
              }}
            >
              Подробнее
            </Button>
          </Collapse>
        </Box>
      ))}
      <ProductModal open={open} onClose={() => setOpen(false)} />
      <ProblemModal />
    </Box>
  );
};

export default AddressDataPage;
