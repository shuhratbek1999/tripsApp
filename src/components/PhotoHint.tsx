"use client";

import { Box, Typography } from "@mui/material";

export default function PhotoHint() {
  return (
    <Box
      sx={{
        bgcolor: "#1E1E1E",
        borderRadius: 2,
        p: 2,
        mt: 2,
        border: "1px solid #333",
      }}
    >
      <Typography color="#A9B7BD" fontSize="14px" mb={1.5} lineHeight="20px">
        Сделайте 2–3 фото товара: 1 фото — это сам товар, 2 фото — его этикетки,
        3 фото — товар в другом ракурсе. Фото должно быть чёткое, а текст на
        этикетке считываемый.
      </Typography>

      {/* misol uchun ikki rasm */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box
          component="img"
          src="/pod1.svg"
          alt="Пример фото"
          sx={{
            width: "48%",
            borderRadius: 2,
            border: "1px solid #444",
          }}
        />
        <Box
          component="img"
          src="/pod2.svg"
          alt="Пример фото 2"
          sx={{
            width: "48%",
            borderRadius: 2,
            border: "1px solid #444",
          }}
        />
      </Box>
    </Box>
  );
}
