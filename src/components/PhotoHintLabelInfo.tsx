"use client";

import { Box, Typography } from "@mui/material";

export default function PhotoHintLabelInfo() {
  return (
    <Box
      sx={{
        bgcolor: "#424242",
        borderRadius: "10px",
        p: "12px",
        mt: 2,
      }}
    >
      <Typography
        color="#FDF2F2"
        fontSize="14px"
        fontWeight={500}
        mb={1.5}
        lineHeight="20px"
      >
        Обычно, на этикетке к товару есть информация, по которой мы можем
        идентифицировать товар. Пожалуйста, внимательно изучите этикетку и
        выпишите максимально доступную информацию.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box>
          <Typography color="white" fontSize="14px" mb={0.5}>
            Артикул
          </Typography>
          <Box
            component="img"
            src="/pod3.svg"
            alt="Пример артикула"
            sx={{
              width: "100%",
              borderRadius: 2,
              border: "1px solid #444",
            }}
          />
        </Box>

        <Box>
          <Typography color="white" fontSize="14px" mb={0.5}>
            Бренд
          </Typography>
          <Box
            component="img"
            src="/pod4.svg"
            alt="Пример бренда"
            sx={{
              width: "100%",
              borderRadius: 2,
              border: "1px solid #444",
            }}
          />
        </Box>

        <Box>
          <Typography color="white" fontSize="14px" mb={0.5}>
            Баркод
          </Typography>
          <Box
            component="img"
            src="/pod5.svg"
            alt="Пример баркода"
            sx={{
              width: "100%",
              borderRadius: 2,
              border: "1px solid #444",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
