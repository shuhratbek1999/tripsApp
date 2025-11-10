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
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductModal from "@/components/ProductModal";
import ProblemModal from "@/components/ProblemModal";
import { openProblemModal } from "@/redux/problemSlice";
import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";

const AddressDataPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const trip = useSelector((state: RootState) => state.trips.trips[0]);
  const addresses = trip.details[0].addresses;
  const [value, setValue] = useState("Все");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  const [openId, setOpenId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
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
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                color: "#A9B7BD",
                whiteSpace: "nowrap",
              }}
            >
              {item.phone}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: item.rest === 0 ? "#2ECC71" : "#E74C3C",
                  textTransform: "none",
                  color: "#FDF2F2",
                  height: "29px",
                  fontWeight: 400,
                  fontSize: "16px",
                  padding: "4px 12px",
                  minWidth: "139px",
                  maxWidth: "170px",
                  whiteSpace: "nowrap",
                  borderRadius: "30px",
                }}
              >
                <Typography
                  sx={{ fontSize: "16px", fontWeight: 400, color: "#FDF2F2" }}
                >
                  {item.rest === 0 ? "Все получено" : "Забрать заказы"}
                </Typography>
              </Box>
              <img
                src={open ? "/strtepa.svg" : "/strpast.svg"}
                alt="arrow"
                width={24}
                height={24}
                style={{
                  marginLeft: "6px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onClick={() => setOpen(!open)}
              />
            </Box>
          </Box>

          {/* Collapse */}
          <Collapse in={openId === item.id} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 1.5 }}>
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
                    my: 1,
                  }}
                >
                  <Box sx={{ width: "60%" }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#A9B7BD",
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#A9B7BD",
                        fontWeight: 600,
                        textAlign: "start",
                      }}
                    >
                      {value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

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
