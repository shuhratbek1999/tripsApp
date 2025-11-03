"use client";

import { Box, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");

  const handleContinue = () => {
    if (phone.trim()) {
      dispatch(login(phone)); // foydalanuvchini reduxga yozish
      router.push("/trips"); // sahifaga o‘tish
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#121212",
        px: 2,
      }}
    >
      <Box sx={{ mb: 6 }}>
        <img src="/logoo.svg" alt="Logo" width={147} height={148} />
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 375,
          bgcolor: "#2D2D2D",
          borderRadius: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          color="white"
          textAlign="center"
          sx={{ fontWeight: 600, fontSize: "28px" }}
        >
          Добро пожаловать
        </Typography>
        <Typography
          color="#A9B7BD"
          textAlign="center"
          sx={{ fontWeight: 500, fontSize: "16px" }}
        >
          Введите номер телефона для входа
        </Typography>

        <TextField
          label="+7 (000) 000 00 00"
          variant="filled"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          InputLabelProps={{ style: { color: "#AFB6BE" } }}
          InputProps={{
            style: { color: "#AFB6BE", backgroundColor: "#F5F3F8" },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            py: "14px",
            bgcolor: "#F5F3F8",
            color: "#AFB6BE",
            fontWeight: 500,
            borderRadius: "10px",
          }}
          onClick={handleContinue}
        >
          Продолжить
        </Button>

        <Typography
          variant="body2"
          color="white"
          textAlign="center"
          sx={{ mt: 1, fontSize: "18px" }}
        >
          или
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          startIcon={
            <img src="/tg.svg" alt="Telegram" width={24} height={24} />
          }
          sx={{
            color: "#AFB6BE",
            borderColor: "white",
            backgroundColor: "#F5F3F8",
            fontWeight: 500,
            height: "56px",
          }}
        >
          Telegram
        </Button>
      </Box>
    </Box>
  );
}
