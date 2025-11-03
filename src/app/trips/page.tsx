"use client";

import { Box, Typography } from "@mui/material";
import TripItem from "@/components/TripItem";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function TripsPage() {
  // Redux’dan trips ma’lumotlarini olamiz
  const trips = useSelector((state: RootState) => state.trips.trips);

  return (
    <Box sx={{ minHeight: "100vh", p: 2, bgcolor: "#121212" }}>
      {/* Logo */}
      <Box sx={{ width: "100%", mb: 2 }}>
        <img src="/logo-trips.svg" alt="Logo trips" />
      </Box>

      {/* Title */}
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h5"
          color="white"
          mb={1}
          sx={{ fontSize: "28px", fontWeight: 700 }}
        >
          Мои выезды на WB
        </Typography>
        <Typography
          variant="body1"
          color="#A9B7BD"
          mb={3}
          sx={{ fontSize: "16px" }}
        >
          Тут он будет видеть информацию по его выездам
        </Typography>
      </Box>

      {/* Trips list */}
      {trips.length === 0 ? (
        <Typography color="#A9B7BD">Выездов пока нет</Typography>
      ) : (
        trips.map((trip) => (
          <TripItem
            key={trip.id}
            id={trip.id}
            title={trip.title}
            date_time={trip.date_time}
            // faqat kerak bo'lsa Cluster[] yuboramiz
            clusters={trip.details}
            step={trip.step}
          />
        ))
      )}
    </Box>
  );
}
