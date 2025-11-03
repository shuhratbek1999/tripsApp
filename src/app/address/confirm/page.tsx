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
        backgroundColor: "#1E1E1E",
        borderRadius: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Logo text */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "#B34EF1", lineHeight: 1 }}
        >
          бери
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          выкупай
        </Typography>
      </Box>

      {/* Back + Address */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <ArrowBackIosNewIcon fontSize="small" sx={{ color: "#fff" }} />
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
