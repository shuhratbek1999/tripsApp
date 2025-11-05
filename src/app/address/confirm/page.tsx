"use client";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ConfirmAddressPage = () => {
  const router = useRouter();
  const trip = useSelector((state: RootState) => state.trips.trips[0]); // test uchun 1-trip
  const address = trip.details[0].addresses[0]; // birinchi manzil

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Logo text */}
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
        <Typography sx={{ fontWeight: 500 }}>{address.address}</Typography>
      </Box>

      {/* Button */}
      <Button
        fullWidth
        onClick={() => router.push("/address/data")}
        sx={{
          backgroundColor: "#B34EF1",
          color: "#fff",
          fontWeight: 600,
          borderRadius: 1.5,
          textTransform: "none",
          py: 1,
        }}
      >
        Я на адресе
      </Button>
    </Box>
  );
};

export default ConfirmAddressPage;
