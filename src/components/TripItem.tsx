"use client";

import { useState } from "react";
import { Box, Typography, Button, Collapse, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch } from "react-redux";
import { updateTripStep } from "@/redux/tripSlice";
import { useRouter } from "next/navigation";

// 🔹 Cluster tipini aniqlaymiz
interface Address {
  id: number;
  address: string;
  phone: string;
  numbers_adress: number;
  number_products: number;
  accepted: number;
  rest: number;
  getnot: number;
  delivered_count: number;
}

interface Cluster {
  clusterName: string;
  addresses: Address[];
}

type TripItemProps = {
  id: number;
  title: string;
  date_time: string;
  step: number;
  clusters: Cluster[];
};

export default function TripItem({
  id,
  title,
  date_time,
  step,
  clusters,
}: TripItemProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // step holatiga qarab tugma matni
  const getButtonText = () => {
    switch (step) {
      case 0:
        return "Начать";
      case 1:
        return "Завершить";
      case 2:
        return "Передать товары";
      default:
        return "Завершено";
    }
  };

  // step holatiga qarab tugma rangi
  const getButtonColor = () => {
    switch (step) {
      case 0:
        return "#FFAE00"; // yashil
      case 1:
        return "#34C759"; // orange
      case 2:
        return "#CB30E0"; // ko‘k
      default:
        return "#888"; // kulrang
    }
  };

  // 🔹 Klasterlardagi barcha adreslardan umumiy sonlarni hisoblaymiz
  const total = clusters.reduce(
    (acc, cluster) => {
      cluster.addresses.forEach((a) => {
        acc.numbers_adress += a.numbers_adress;
        acc.number_products += a.number_products;
        acc.accepted += a.accepted;
        acc.rest += a.rest;
        acc.getnot += a.getnot;
        acc.delivered_count += a.delivered_count;
      });
      return acc;
    },
    {
      numbers_adress: 0,
      number_products: 0,
      accepted: 0,
      rest: 0,
      getnot: 0,
      delivered_count: 0,
    }
  );

  return (
    <Box
      sx={{
        bgcolor: "#2D2D2D",
        borderRadius: 2,
        p: 1.5,
        mb: 2,
        cursor: "pointer",
      }}
      onClick={() => setOpen(!open)}
    >
      {/* Yuqori qism (sarlavha + status) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#A9B7BD",
          }}
        >
          {date_time}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#4C84EC",
              borderRadius: "30px",
              textTransform: "none",
              color: "white",
            }}
          >
            Запланирован
          </Button>
          <KeyboardArrowDownIcon
            sx={{
              color: "#7C69F4",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          />
        </Box>
      </Box>

      {/* Collapse (pastki qism) */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        {/* ID qismi */}
        <Box
          sx={{
            color: "#A9B7BD",
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <Typography variant="caption">ID выезда</Typography>
          <Typography
            variant="h6"
            sx={{
              mx: 1,
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            ID выезда
            <ContentCopyIcon
              sx={{
                color: "#7C69F4",
                ml: 1,
                fontSize: "16px",
              }}
            />
          </Typography>
        </Box>

        {/* Umumiy statistikalar */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mt: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Typography variant="caption" color="#A9B7BD">
              Кол-во адресов:
            </Typography>
            <Typography>{total.numbers_adress}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Typography variant="caption" color="#A9B7BD">
              Кол-во товаров:
            </Typography>
            <Typography>{total.number_products}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Typography variant="caption" color="#A9B7BD">
              Получено:
            </Typography>
            <Typography>{total.accepted}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Typography variant="caption" color="#A9B7BD">
              Осталось получить:
            </Typography>
            <Typography>{total.rest}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Typography variant="caption" color="#A9B7BD">
              Не получил:
            </Typography>
            <Typography>{total.getnot}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Typography variant="caption" color="#A9B7BD">
              Передал на склад:
            </Typography>
            <Typography>{total.delivered_count}</Typography>
          </Box>
        </Box>

        {/* Pastdagi tugmalar */}
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            variant="contained"
            sx={{
              bgcolor: getButtonColor(),
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "10px",
              color: "white",
            }}
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              dispatch(updateTripStep({ id }));
            }}
          >
            {getButtonText()}
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7C69F4",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "10px",
              color: "white",
            }}
            fullWidth
            onClick={(e) => {
              e.stopPropagation(); // collapse ochilishini to‘xtatadi
              router.push(`/trips/${id}`); // /trips/[id] sahifasiga o‘tadi
            }}
          >
            Подробнее
          </Button>
        </Stack>
      </Collapse>
    </Box>
  );
}
