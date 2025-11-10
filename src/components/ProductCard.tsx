"use client";

import { Box, Typography, Button, Collapse } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateStatus, Product } from "@/redux/productsSlice";
import { showAlert } from "@/redux/alertSlice";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface Props extends Product {}

const ProductCard = ({
  id,
  name,
  article,
  barcode,
  code,
  image,
  planned,
  status,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  // Swipe value
  const x = useMotionValue(0);
  const bgColor = useTransform(
    x,
    [-100, 0, 100],
    ["#E74C3C", "#2A2A2A", "#34C759"]
  );

  // Handle swipe result
  const handleSwipeEnd = () => {
    const current = x.get();

    if (current > 100) {
      handleStatus("Получен");
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
    } else if (current < -100) {
      handleStatus("Не получил");
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
    } else {
      // qaytadi joyiga
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
    }
  };

  const handleStatus = (newStatus: Product["status"]) => {
    dispatch(updateStatus({ id, status: newStatus }));
    dispatch(
      showAlert({
        message:
          newStatus === "Получен"
            ? "Получен!"
            : newStatus === "Не получил"
            ? "Не получил!"
            : "Не определил!",
        type:
          newStatus === "Получен"
            ? "success"
            : newStatus === "Не получил"
            ? "error"
            : "warning",
      })
    );
  };

  const handleChange = () => setCheck(!check);

  const statusColor =
    status === "Получен"
      ? "#34C759"
      : status === "Не получил"
      ? "#E74C3C"
      : status === "Не определил"
      ? "#FFAE00"
      : "#7C69F4";

  return (
    <Box sx={{ mb: 2, position: "relative" }}>
      {/* Background layer (color changes) */}
      <motion.div
        style={{
          backgroundColor: bgColor as any,
          borderRadius: "10px",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
        }}
      />

      {/* Foreground draggable box */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 120 }}
        style={{
          x,
          zIndex: 1,
          position: "relative",
        }}
        onDragEnd={handleSwipeEnd}
      >
        {/* 🔶 Unplanned banner */}
        {!planned && (
          <Box
            sx={{
              backgroundColor: "#FFAE00",
              color: "#EB5757",
              p: 1,
              borderRadius: "10px 10px 0 0",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 600,
            }}
          >
            <img src="/alert.svg" alt="" /> Незапланированный товар
          </Box>
        )}

        {/* 🔷 Main Card */}
        <Box
          sx={{
            backgroundColor: "#2A2A2A",
            borderRadius: planned ? 2 : "10px",
            p: 1.5,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => setOpen(!open)}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img
                src={check ? "/check2.svg" : "/check.svg"}
                alt="arrow"
                width={28}
                height={28}
                style={{
                  marginLeft: "6px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange();
                }}
              />
              <Typography
                sx={{
                  color: "#A9B7BD",
                  fontWeight: 700,
                  fontSize: 14,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "160px",
                }}
              >
                {name}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  backgroundColor: statusColor,
                  borderRadius: "30px",
                  color: "#FDF2F2",
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                  height: "29px",
                  padding: "4px 12px",
                }}
              >
                {status === "Получить" || status === "Получен"
                  ? status
                  : "Получить"}
              </Box>
              <img
                src={!open ? "/strpast.svg" : "/strtepa.svg"}
                alt="arrow"
                width={24}
                height={24}
                style={{
                  marginLeft: "6px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange();
                }}
              />
            </Box>
          </Box>

          {/* Collapses */}
          <Collapse in={open}>
            <Box
              sx={{ my: 3, display: "flex", gap: 0.9, alignItems: "center" }}
            >
              <Image
                src={image}
                alt={name}
                width={85}
                height={85}
                style={{ borderRadius: 10 }}
              />

              {status === "Получить" && !code && (
                <Box sx={{ fontSize: 12, color: "#A9B7BD" }}>
                  <Typography>Артикул: {article}</Typography>
                  <Typography>Баркод: {barcode}</Typography>
                </Box>
              )}

              {status === "Получить" && code && (
                <>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Image
                      src="/qr.svg"
                      alt="QR"
                      width={85}
                      height={85}
                      style={{ borderRadius: 10 }}
                    />
                  </Box>
                  <Box>
                    <Typography color="#FDF2F2" fontWeight={700}>
                      Код: {code}
                    </Typography>
                    <Typography sx={{ color: "#A9B7BD" }} fontSize={12}>
                      Артикул: {article}
                    </Typography>
                    <Typography
                      sx={{ color: "#A9B7BD", whiteSpace: "nowrap" }}
                      fontSize={12}
                    >
                      Баркод: {barcode}
                    </Typography>
                  </Box>
                </>
              )}

              {status === "Получен" && (
                <Box sx={{ color: "#A9B7BD", fontSize: 13 }}>
                  {[
                    ["Кол-во товаров", 500],
                    ["Кол-во выданных товаров", 50],
                    ["Кол-во товаров с кодами", 500],
                    ["Кол-во получено", 50],
                    ["Осталось получить", 50],
                  ].map(([label, value]) => (
                    <Box
                      key={label}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "229px",
                        height: "16px",
                      }}
                    >
                      <Typography
                        sx={{ width: "90%", fontSize: "12px", fontWeight: 400 }}
                      >
                        {label}
                      </Typography>
                      <Typography
                        sx={{ width: "10%", fontSize: "12px", fontWeight: 400 }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* 🟡 “Товар не определен” collapse */}
              {status === "Не определил" && (
                <Box
                  sx={{
                    color: "#FFAE00",
                    backgroundColor: "#3A2A00",
                    borderRadius: "10px",
                    p: 1.5,
                    fontSize: 13,
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#FDF2F2",
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    Товар не определен
                  </Typography>
                  <Typography sx={{ color: "#A9B7BD", fontSize: 12 }}>
                    Этот товар требует проверки или уточнения данных.
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Buttons */}
            {status === "Получить" && !code && (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Button
                    fullWidth
                    sx={{
                      backgroundColor: "#EB5757",
                      color: "#FDF2F2",
                      borderRadius: "10px",
                      height: "45px",
                      width: "162px",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                    onClick={() => handleStatus("Не получил")}
                  >
                    Не получил
                  </Button>
                  <Button
                    fullWidth
                    sx={{
                      backgroundColor: "#34C759",
                      color: "#FDF2F2",
                      borderRadius: "10px",
                      height: "45px",
                      width: "162px",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                    onClick={() => handleStatus("Получен")}
                  >
                    Получил
                  </Button>
                </Box>
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#FFAE00",
                    color: "#FDF2F2",
                    borderRadius: "10px",
                    height: "45px",
                    width: "100%",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                  onClick={() => handleStatus("Не определил")}
                >
                  Не определил
                </Button>
              </Box>
            )}
            {status === "Получить" && code && (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Button
                    fullWidth
                    sx={{
                      backgroundColor: "#EB5757",
                      color: "#FDF2F2",
                      borderRadius: "10px",
                      height: "45px",
                      width: "162px",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                    onClick={() => handleStatus("Не получил")}
                  >
                    Не получил
                  </Button>
                  <Button
                    fullWidth
                    sx={{
                      backgroundColor: "#34C759",
                      color: "#FDF2F2",
                      borderRadius: "10px",
                      height: "45px",
                      width: "162px",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                    onClick={() => handleStatus("Получен")}
                  >
                    Получил
                  </Button>
                </Box>
              </Box>
            )}
          </Collapse>
        </Box>
      </motion.div>
    </Box>
  );
};

export default ProductCard;
