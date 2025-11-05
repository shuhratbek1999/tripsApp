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
import { showAlert } from "@/redux/alertSlice";
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // RUS raqami validatsiyasi (+7XXXXXXXXXX)
  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, ""); // faqat raqamlar
    const isValid = /^7\d{10}$/.test(cleaned);
    setIsPhoneValid(isValid);
  };

  const handlePhoneChange = (e: any) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
  };

  const handleContinue = () => {
    if (isPhoneValid) {
      setShowPasswordInput(true); // parol inputini chiqarish
    } else {
      dispatch(
        showAlert({
          message: "Номер телефона неверный. Проверьте и попробуйте снова",
          type: "error",
        })
      );
    }
  };

  const handleLogin = () => {
    if (password.trim().length >= 6) {
      if (password == "888888") {
        dispatch(login(phone));
        router.push("/trips");
      } else {
        dispatch(
          showAlert({
            message: "Пароль неверный. Проверьте пароль и попробуйте еще раз",
            type: "error",
          })
        );
      }
    } else {
      dispatch(
        showAlert({
          message: "длина пароля менее 6 символов",
          type: "error",
        })
      );
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
      <Box sx={{ mb: 5, mt: 2 }}>
        <img src="/logoo.svg" alt="Logo" width={127} height={148} />
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 375,
          bgcolor: "#2D2D2D",
          borderRadius: "30px",
          p: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          color="#FDF2F2"
          textAlign="center"
          sx={{ fontWeight: 600, fontSize: "24px", mb: 2 }}
        >
          Добро пожаловать
        </Typography>
        <Typography
          color="#A9B7BD"
          textAlign="center"
          sx={{ fontWeight: 500, fontSize: "16px", mb: 1 }}
        >
          Введите номер телефона для входа
        </Typography>

        {/* Telefon input */}
        <TextField
          placeholder="+7 (000) 000 00 00"
          fullWidth
          value={phone}
          onChange={handlePhoneChange}
          InputLabelProps={{ style: { color: "#AFB6BE" } }}
          InputProps={{
            style: {
              color: "#A9B7BD",
              backgroundColor: "#FDF2F2",
              borderRadius: "10px",
              height: "45px",
              padding: "12px",
              fontWeight: 500,
              textAlign: "center",
              textIndent: "90px",
            },
          }}
          error={phone.length > 0 && !isPhoneValid}
        />

        {/* Agar parol input chiqsa, u pastda ko‘rinadi */}
        {showPasswordInput && (
          <Box>
            <Typography
              sx={{
                color: "#FDF2F2",
                fontWeight: 500,
                fontSize: "14px",
                mt: 1,
              }}
            >
              Введите пароль
            </Typography>
            <TextField
              placeholder="Введите пароль"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: "#AFB6BE" } }}
              InputProps={{
                style: {
                  color: "#A9B7BD",
                  backgroundColor: "#FDF2F2",
                  height: "45px",
                  borderRadius: "10px",
                  padding: "12px",
                },
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
            />
          </Box>
        )}

        {/* Продолжить yoki Войти tugmasi */}
        <Button
          fullWidth
          sx={{
            mt: 1.5,
            height: "45px",
            py: "12px",
            px: "24px",
            bgcolor:
              showPasswordInput && password.trim().length >= 6
                ? "#7C69F4"
                : !showPasswordInput && isPhoneValid
                ? "#7C69F4"
                : "#A9B7BD",
            color:
              (showPasswordInput && password.trim().length >= 6) ||
              (!showPasswordInput && isPhoneValid)
                ? "#FDF2F2"
                : "#FDF2F2",
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
          color="#A9B7BD"
          textAlign="center"
          sx={{ fontSize: "16px", my: 1, fontWeight: 500 }}
        >
          или
        </Typography>

        <Button
          fullWidth
          startIcon={
            <img src="/tg.svg" alt="Telegram" width={24} height={24} />
          }
          sx={{
            color: "#A9B7BD",
            borderColor: "white",
            backgroundColor: "#FDF2F2",
            fontWeight: 500,
            height: "52px",
            py: "12px",
            px: "24px",
            borderRadius: "10px",
            fontSize: "16px",
          }}
        >
          Telegram
        </Button>
      </Box>
    </Box>
  );
}
