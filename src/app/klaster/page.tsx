"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";

export default function ZakazPage() {
  const router = useRouter();
  const trips = useSelector((state: RootState) => state.trips.trips); // ✅ hamma trips

  const [openCluster, setOpenCluster] = useState<string | null>(null);
  const [openAddress, setOpenAddress] = useState<number | null>(null);

  if (!trips || trips.length === 0) {
    return (
      <Box sx={{ color: "white", p: 2 }}>
        <Typography>Заказы не найдены</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "#0F0F10",
        minHeight: "100vh",
        p: 2,
        color: "white",
        fontFamily: "'Red Hat Text', sans-serif",
      }}
    >
      <Box sx={{ width: "100%", mb: 2, ml: -2 }}>
        <img src="/logo-trips.svg" alt="Logo trips" />
      </Box>

      {/* Back + Address */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <ArrowBackIosNewIcon
          fontSize="large"
          sx={{ color: "#7C69F4", ml: -1 }}
          onClick={() => router.back()}
        />
        <Typography
          sx={{ fontWeight: 700, fontSize: "16px", color: "#FDF2F2" }}
        >
          25.10.2025 ID 1231231
        </Typography>
      </Box>
      <TextField
        fullWidth
        placeholder="Найти ПВЗ или КЛСТР"
        size="small"
        InputProps={{
          sx: {
            bgcolor: "#FDF2F2",
            color: "#A9B7BD",
            borderRadius: "10px",
            height: "48px",
            px: 1,
          },
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: "#7C69F4" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 1.5,
          "& input::placeholder": { color: "#A9B7BD", opacity: 0.8 },
        }}
      />
      {/* COPY BUTTON */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: "#7C69F4",
          textTransform: "none",
          fontWeight: 500,
          fontSize: 16,
          borderRadius: "10px",
          mb: 3,
          py: 1,
          color: "#FDF2F2",
          height: "45px",
          "&:hover": { bgcolor: "#6A56E0" },
        }}
      >
        Скопировать адреса
      </Button>
      {/* CLUSTERS FROM ALL TRIPS */}
      {trips.map((trip) =>
        trip.details.map((cluster) => {
          const clusterKey = `${trip.id}-${cluster.clusterName}`;
          const isClusterOpen = openCluster === clusterKey;

          return (
            <Box key={clusterKey} sx={{ mb: 2 }}>
              {/* Cluster header */}
              <Box
                onClick={() =>
                  setOpenCluster(isClusterOpen ? null : clusterKey)
                }
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                  cursor: "pointer",
                  borderBottom: 2,
                  borderBottomColor: "#FDF2F2",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "20px",
                    color: cluster.addresses.every(
                      (a) => a.rest === 0 && a.getnot === 0 && trip.step !== 1
                    )
                      ? "#3CB371"
                      : "#FDF2F2",
                  }}
                >
                  {cluster.clusterName}
                </Typography>
                <KeyboardArrowDownIcon
                  sx={{
                    color: cluster.addresses.every(
                      (a) => a.rest === 0 && a.getnot === 0 && trip.step !== 1
                    )
                      ? "#3CB371"
                      : "#7C69F4",
                    transform: isClusterOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "0.3s",
                  }}
                  fontSize="large"
                />
              </Box>

              {/* Cluster content */}
              <Collapse in={isClusterOpen} timeout="auto">
                {cluster.addresses.map((addr) => {
                  const allReceived =
                    addr.rest === 0 && addr.getnot === 0 && trip.step !== 1;
                  const notAllReceived =
                    (addr.rest > 0 || addr.getnot > 0) && trip.step !== 1;

                  const statusColor = allReceived
                    ? "#3CB371"
                    : notAllReceived
                    ? "#FFA500"
                    : "#7C69F4";
                  const statusText = allReceived
                    ? "Все заказы получены"
                    : notAllReceived
                    ? "Не все заказы получены"
                    : "";

                  const isOpenAddress = openAddress === addr.id;

                  return (
                    <Box
                      key={addr.id}
                      sx={{
                        bgcolor: "#2B2B2B",
                        mt: 1,
                        p: 1.5,
                        borderRadius: "12px",
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
                          setOpenAddress(isOpenAddress ? null : addr.id)
                        }
                      >
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#A9B7BD",
                            maxWidth: "80%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {addr.address}
                        </Typography>
                        <KeyboardArrowDownIcon
                          sx={{
                            color: statusColor,
                            transform: isOpenAddress
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "0.3s",
                          }}
                          fontSize="large"
                        />
                        {allReceived}
                      </Box>

                      {/* 🟢 STATUS TEXT — har bir adres tagida */}
                      {statusText && (
                        <Typography
                          sx={{
                            mt: 0.5,
                            fontSize: 13,
                            color: statusColor,
                            fontWeight: 600,
                            ml: 0.5,
                          }}
                        >
                          {statusText}
                        </Typography>
                      )}

                      {/* Address details */}
                      {!(
                        addr.rest === 0 &&
                        addr.getnot === 0 &&
                        trip.step !== 1
                      ) && (
                        <Collapse in={isOpenAddress} timeout="auto">
                          <Box sx={{ mt: 1 }}>
                            {[
                              ["Кол-во адресов:", addr.numbers_adress],
                              ["Кол-во товаров:", addr.number_products],
                              ["Получено:", addr.accepted],
                              ["Осталось получить:", addr.rest],
                              ["Не получил:", addr.getnot],
                              ["Передал на склад:", addr.delivered_count],
                            ].map(([label, value], i) => (
                              <Box
                                key={i}
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "85%",
                                  mb: 0.3,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    color: "#A9B7BD",
                                    fontWeight: 500,
                                  }}
                                >
                                  {label}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    color: "#A9B7BD",
                                    fontWeight: 600,
                                  }}
                                >
                                  {value}
                                </Typography>
                              </Box>
                            ))}

                            <Button
                              sx={{
                                bgcolor: "#7C69F4",
                                textTransform: "none",
                                fontWeight: 500,
                                borderRadius: "10px",
                                color: "#FDF2F2",
                                mt: 1.5,
                                height: "45px",
                                width: "100%",
                                "&:hover": { bgcolor: "#6A56E0" },
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
                      )}
                    </Box>
                  );
                })}
              </Collapse>
            </Box>
          );
        })
      )}
    </Box>
  );
}
