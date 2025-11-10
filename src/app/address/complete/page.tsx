"use client";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Collapse,
  SelectChangeEvent,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductModal from "@/components/ProductModal";

const CompletedAddressPage = () => {
  const router = useRouter();

  // 🔹 Redux'dan ma’lumotlar
  const trip = useSelector((state: RootState) => state.trips.trips[0]);
  const cluster = trip.details[0];
  const [value, setValue] = useState("Все");
  // 🔹 Collapse uchun local holat
  const [openId, setOpenId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const toggleCollapse = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100vh",
      }}
    >
      <ProductModal open={open} onClose={() => setOpen(false)} />
      {/* Logo */}
      <Box sx={{ width: "100%", mb: 2, ml: -2 }}>
        <img src="/logo-trips.svg" alt="Logo trips" />
      </Box>

      {/* Address */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <img
          src="/exit.svg"
          alt="exit img"
          width={12.9}
          height={24}
          onClick={() => router.back()}
        />
        <Typography
          sx={{ fontWeight: 700, color: "#FDF2F2", fontSize: "16px" }}
        >
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

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button
          sx={{
            backgroundColor: "#FFB800",
            color: "#FDF2F2",
            fontWeight: 500,
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "16px",
            height: "45px",
            width: "40%",
          }}
          onClick={() => setOpen(true)}
        >
          Новый товар
        </Button>
        <Button
          sx={{
            backgroundColor: "#7A5FFF",
            color: "#FDF2F2",
            fontWeight: 500,
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "16px",
            height: "45px",
            width: "60%",
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
                  color: "#FDF2F2",
                  fontSize: "16px",
                  borderRadius: "30px",
                  fontWeight: 400,
                  px: 1,
                  py: 0.3,
                }}
              >
                {addr.rest > 0 ? "Забрать заказы" : "Все получено"}
              </Typography>
              {openId === addr.id ? (
                <KeyboardArrowUpIcon
                  sx={{
                    color: addr.rest > 0 ? "#7C69F4" : "#7C69F4",
                  }}
                  fontSize="large"
                />
              ) : (
                <KeyboardArrowDownIcon
                  sx={{
                    color: addr.rest > 0 ? "#7C69F4" : "#7C69F4",
                  }}
                  fontSize="large"
                />
              )}
            </Box>
          </Box>

          {/* Collapse content */}
          <Collapse in={openId === addr.id} timeout="auto" unmountOnExit>
            <Box
              sx={{
                bgcolor: "#2D2D2D",
                borderRadius: "0 0 12px 12px",
                mt: -1,
                p: 1,
              }}
            >
              {[
                ["Кол-во адресов:", addr.numbers_adress],
                ["Кол-во товаров:", addr.number_products],
                ["Кол-во принятых:", addr.accepted],
                ["Кол-во доставлено:", addr.delivered_count],
                ["Осталось получить:", addr.rest],
              ].map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "80%",
                    my: 1,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "14px", color: "#A9B7BD", fontWeight: 500 }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", color: "#A9B7BD", fontWeight: 600 }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}

              <Button
                sx={{
                  mt: 1.5,
                  backgroundColor: "#7A5FFF",
                  color: "#FDF2F2",
                  fontWeight: 500,
                  borderRadius: "10px",
                  textTransform: "none",
                  height: "45px",
                  width: "100%",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/address/phone`);
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
        sx={{
          backgroundColor: "#CB30E0",
          color: "#fff",
          fontWeight: 600,
          height: "45px",
          borderRadius: "10px",
          textTransform: "none",
          py: 1.2,
          position: "absolute",
          bottom: "50px",
          ml: 0.5,
          width: "90%",
        }}
        onClick={() => router.push("/trips")}
      >
        Закончил адрес
      </Button>
    </Box>
  );
};

export default CompletedAddressPage;
