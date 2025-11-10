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
  const getStep = () => {
    switch (step) {
      case 0:
        return "Запланирован";
      case 1:
        return "Процесс передачи";
      default:
        return "Запланирован";
        break;
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
        p: "12px",
        my: 2,
        cursor: "pointer",
        width: "100%",
      }}
      onClick={() => setOpen(!open)}
    >
      {/* Yuqori qism (sarlavha + status) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "29px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#A9B7BD",
            maxWidth: "130px",
            whiteSpace: "nowrap",
          }}
        >
          {date_time}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              bgcolor: step == 1 ? "#FFAE00" : "#4C84EC",
              borderRadius: "30px",
              textTransform: "none",
              color: "#FDF2F2",
              height: "29px",
              fontWeight: 400,
              fontSize: "16px",
              padding: "4px 12px",
              minWidth: "139px",
              maxWidth: "170px",
              whiteSpace: "nowrap",
            }}
          >
            {getStep()}
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
            width: "100%",
            height: "24px",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography
              sx={{ fontWeight: 700, fontSize: "16px", color: "#A9B7BD" }}
            >
              ID выезда
            </Typography>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 700,
                fontSize: "16px",
                color: "#A9B7BD",
              }}
            >
              ID выезда
              <ContentCopyIcon
                sx={{
                  color: "#7C69F4",
                  ml: 1,
                  fontSize: "18px",
                }}
              />
            </Typography>
          </Box>
        </Box>

        {/* Umumiy statistikalar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            mt: 1,
            maxWidth: "337px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "24px",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                variant="caption"
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 500 }}
              >
                Кол-во адресов
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 700 }}
              >
                {total.numbers_adress}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "24px",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                variant="caption"
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 500 }}
              >
                Кол-во товаров
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 700 }}
              >
                {total.number_products}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "24px",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                variant="caption"
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 500 }}
              >
                Получено
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 700 }}
              >
                {total.accepted}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "24px",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                variant="caption"
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 500 }}
              >
                Осталось получить
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 700 }}
              >
                {total.rest}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "24px",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                variant="caption"
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 500 }}
              >
                Не получил
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 700 }}
              >
                {total.getnot}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "24px",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                variant="caption"
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 500 }}
              >
                Передал на склад
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                color="#A9B7BD"
                sx={{ fontSize: "16px", fontWeight: 700 }}
              >
                {total.delivered_count}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Pastdagi tugmalar */}
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            sx={{
              bgcolor: getButtonColor(),
              fontSize: "16px",
              fontWeight: 500,
              textTransform: "none",
              borderRadius: "10px",
              color: "#FDF2F2",
              height: "45px",
              padding: "12px 24px",
              width: "162.5px",
              whiteSpace: "nowrap",
            }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(updateTripStep({ id }));
            }}
          >
            {getButtonText()}
          </Button>

          <Button
            sx={{
              backgroundColor: "#7C69F4",
              fontSize: "16px",
              fontWeight: 500,
              textTransform: "none",
              borderRadius: "10px",
              color: "#FDF2F2",
              width: "162.5px",
              height: "45px",
              py: "12px",
              px: "24px",
              whiteSpace: "nowrap",
            }}
            fullWidth
            onClick={(e) => {
              e.stopPropagation(); // collapse ochilishini to‘xtatadi
              router.push(`/klaster`); // /trips/[id] sahifasiga o‘tadi
            }}
          >
            Подробнее
          </Button>
        </Stack>
      </Collapse>
    </Box>
  );
}
