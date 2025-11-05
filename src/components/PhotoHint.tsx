"use client";

import { Box, Typography } from "@mui/material";

export default function PhotoHint() {
  return (
    <Box
      sx={{
        bgcolor: "#424242",
        borderRadius: "10px",
        height: "259px",
        p: "12px",
        mt: 2,
      }}
    >
      <Typography
        color="#FDF2F2"
        fontSize="14px"
        fontWeight={500}
        lineHeight="20px"
      >
        Сделайте 2-3 фото товара, 1 фото это сам товар, 2 фото его этикетки, 3
        фото товар в другом ракурсе, фото должно быть четкое, а текст на
        этикетки считываемый пример:
      </Typography>

      {/* misol uchun ikki rasm */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box
          component="img"
          src="/pod1.svg"
          alt="Пример фото"
          sx={{
            width: "48%",
            height: "133px",
            borderRadius: 2,
          }}
        />
        <Box
          component="img"
          src="/pod2.svg"
          alt="Пример фото 2"
          sx={{
            width: "48%",
            height: "133px",
            borderRadius: 2,
          }}
        />
      </Box>
    </Box>
  );
}
