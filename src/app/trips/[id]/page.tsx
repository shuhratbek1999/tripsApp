"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Collapse,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

export default function ZakazPage() {
  const router = useRouter();
  const { id } = useParams();
  const trip = useSelector((state: RootState) =>
    state.trips.trips.find((t) => t.id === Number(id))
  );

  const [openCluster, setOpenCluster] = useState<number | null>(null);
  const [openAddress, setOpenAddress] = useState<number | null>(null);

  if (!trip) {
    return (
      <Box sx={{ color: "white", p: 2 }}>
        <Typography>Заказ не найден</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#121212", minHeight: "100vh", color: "white", p: 2 }}>
      {/* LOGO */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ color: "#7C69F4", fontWeight: 700, fontSize: 20 }}>
          бери
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: 20, mt: -0.5 }}>
          выкупай
        </Typography>
      </Box>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
          cursor: "pointer",
        }}
        onClick={() => router.back()}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 20, color: "#A9B7BD" }} />
        <Typography sx={{ color: "#A9B7BD" }}>
          {trip.date_time} ID {trip.id}
        </Typography>
      </Box>

      {/* SEARCH */}
      <TextField
        fullWidth
        placeholder="Найти ПВЗ или КЛСТР"
        variant="outlined"
        sx={{
          backgroundColor: "#FDF2F2",
          color: "red",
          borderRadius: 1,
          mb: 1.5,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: "#7C69F4" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* COPY ADDRESSES */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: "#7C69F4",
          textTransform: "none",
          fontWeight: 600,
          fontSize: 16,
          borderRadius: 2,
          mb: 3,
          color: "white",
        }}
      >
        Скопировать адреса
      </Button>

      {/* CLUSTERS */}
      {trip.details.map((cluster, clusterIndex) => (
        <Box key={clusterIndex} sx={{ mb: 2 }}>
          {/* Cluster Header */}
          <Box
            onClick={() =>
              setOpenCluster(openCluster === clusterIndex ? null : clusterIndex)
            }
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: 1,
              borderBottomColor: "white",
              borderBottomWidth: 2,
              px: 2,
              py: 1,
              cursor: "pointer",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>
              {cluster.clusterName}
            </Typography>
            <KeyboardArrowDownIcon
              sx={{
                color: "#7C69F4",
                transform:
                  openCluster === clusterIndex
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                transition: "0.3s",
                width: "28px",
                height: "28px",
              }}
            />
          </Box>

          {/* Cluster Content */}
          <Collapse in={openCluster === clusterIndex} timeout="auto">
            {cluster.addresses.map((addr) => {
              const allReceived = addr.rest === 0;
              const statusColor = allReceived ? "#3CB371" : "#FFA500";
              const statusText = allReceived
                ? "Все заказы получены"
                : "Не все заказы получены";

              return (
                <Box
                  key={addr.id}
                  sx={{
                    bgcolor: "#2D2D2D",
                    mt: 1,
                    p: 1.5,
                    borderRadius: 2,
                    color: "#A9B7BD",
                  }}
                >
                  {/* Address title */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setOpenAddress(openAddress === addr.id ? null : addr.id)
                    }
                  >
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                      {addr.address}
                    </Typography>
                    <KeyboardArrowDownIcon
                      sx={{
                        color: "#7C69F4",
                        transform:
                          openAddress === addr.id
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "0.3s",
                      }}
                    />
                  </Box>

                  {/* Status */}
                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: 13,
                      color: statusColor,
                      fontWeight: 600,
                    }}
                  >
                    {statusText}
                  </Typography>

                  {/* Address details */}
                  <Collapse in={openAddress === addr.id} timeout="auto">
                    <Box sx={{ mt: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "80%",
                        }}
                      >
                        <Typography sx={{ fontSize: 13 }}>
                          Кол-во адресов:
                        </Typography>
                        <Typography>{addr.numbers_adress}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "80%",
                        }}
                      >
                        <Typography sx={{ fontSize: 13 }}>
                          Кол-во товаров:
                        </Typography>
                        <Typography>{addr.number_products}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "80%",
                        }}
                      >
                        <Typography sx={{ fontSize: 13 }}>Получено:</Typography>
                        <Typography>{addr.accepted}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "80%",
                        }}
                      >
                        <Typography sx={{ fontSize: 13 }}>
                          Осталось получить:
                        </Typography>
                        <Typography>{addr.rest}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "80%",
                        }}
                      >
                        <Typography sx={{ fontSize: 13 }}>
                          Не получил:
                        </Typography>
                        <Typography>{addr.getnot}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "80%",
                        }}
                      >
                        <Typography sx={{ fontSize: 13 }}>
                          Передал на склад:
                        </Typography>
                        <Typography>{addr.delivered_count}</Typography>
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          bgcolor: "#7C69F4",
                          textTransform: "none",
                          fontWeight: 600,
                          borderRadius: 2,
                          color: "white",
                          mt: 2,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/address/confirm`);
                        }}
                      >
                        Подробнее
                      </Button>
                    </Box>
                  </Collapse>
                </Box>
              );
            })}
          </Collapse>
        </Box>
      ))}
    </Box>
  );
}
