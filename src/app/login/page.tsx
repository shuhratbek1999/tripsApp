"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // RUS raqami validatsiyasi (+7XXXXXXXXXX)
  const validatePhone = (value) => {
    const cleaned = value.replace(/\D/g, ""); // faqat raqamlar
    const isValid = /^7\d{10}$/.test(cleaned);
    setIsPhoneValid(isValid);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
  };

  const handleContinue = () => {
    if (isPhoneValid) {
      setShowPasswordInput(true); // parol inputini chiqarish
    }
  };

  const handleLogin = () => {
    if (password.trim().length >= 6) {
      dispatch(login(phone));
      router.push("/trips");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        bgcolor: "#121212",
        px: 2,
      }}
    >
      <Box sx={{ mb: 6, mt: 6 }}>
        <img src="/logoo.svg" alt="Logo" width={127} height={148} />
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

        {/* Telefon input */}
        <TextField
          label="+7 (000) 000 00 00"
          variant="filled"
          fullWidth
          value={phone}
          onChange={handlePhoneChange}
          InputLabelProps={{ style: { color: "#AFB6BE" } }}
          InputProps={{
            style: { color: "#AFB6BE", backgroundColor: "#F5F3F8" },
          }}
          error={phone.length > 0 && !isPhoneValid}
          helperText={
            phone.length > 0 && !isPhoneValid
              ? "Введите корректный номер (+7XXXXXXXXXX)"
              : " "
          }
        />

        {/* Agar parol input chiqsa, u pastda ko‘rinadi */}
        {showPasswordInput && (
          <TextField
            label="Пароль"
            variant="filled"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#AFB6BE" } }}
            InputProps={{
              style: { color: "#AFB6BE", backgroundColor: "#F5F3F8" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "#7C69F4" }} />
                    ) : (
                      <Visibility sx={{ color: "#7C69F4" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={password.length > 0 && password.length < 6}
            helperText={
              password.length > 0 && password.length < 6
                ? "Минимум 6 символов"
                : " "
            }
          />
        )}

        {/* Продолжить yoki Войти tugmasi */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            py: "14px",
            bgcolor:
              showPasswordInput && password.trim().length >= 6
                ? "#7C69F4"
                : !showPasswordInput && isPhoneValid
                ? "#7C69F4"
                : "#A9B7BD",
            color:
              (showPasswordInput && password.trim().length >= 6) ||
              (!showPasswordInput && isPhoneValid)
                ? "white"
                : "#AFB6BE",
            fontWeight: 500,
            borderRadius: "10px",
            transition: "0.3s",
          }}
          disabled={
            showPasswordInput ? password.trim().length < 6 : !isPhoneValid
          }
          onClick={showPasswordInput ? handleLogin : handleContinue}
        >
          {showPasswordInput ? "Продолжить" : "Продолжить"}
        </Button>

        {/* Pastdagi qism har doim ko‘rinadi */}
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
