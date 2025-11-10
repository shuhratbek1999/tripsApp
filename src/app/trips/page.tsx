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
      <Box sx={{ width: "100%", mb: 2, ml: -2 }}>
        <img src="/logo-trips.svg" width={101} height={44} alt="Logo trips" />
      </Box>
      {/* Title */}
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h5"
          color="#FDF2F2"
          mb={1}
          sx={{ fontSize: "24px", fontWeight: 600 }}
        >
          Мои выезды на WB
        </Typography>
      </Box>{" "}
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
