"use client";

import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  updateField,
  addPhoto,
  removePhoto,
  clearProduct,
} from "@/redux/productSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LabeledInput from "./LabeledInput";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
}

export default function ProductForm({ open, onClose }: ProductFormProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const product = useSelector((state: RootState) => state.product);

  const handleChange = (
    key: Exclude<keyof typeof product, "photos">,
    value: string
  ) => {
    dispatch(updateField({ key, value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            dispatch(addPhoto(reader.result));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = () => {
    console.log("🟣 Yangi tovar:", product);
    dispatch(clearProduct());
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(6px)",
      }}
    >
      <Box
        sx={{
          bgcolor: "#2D2D2D",
          borderRadius: "20px",
          width: { xs: "95%", sm: "600px", md: "800px" },
          maxHeight: "90vh",
          overflowY: "auto",
          p: 3,
          outline: "none",
        }}
      >
        <Typography color="#FDF2F2" fontWeight={600} fontSize="24px" mb={1}>
          Новый товар
        </Typography>

        <Typography color="#FDF2F2" fontWeight={500} fontSize="16px" mb={2}>
          Очень жаль что вы столкнулись с какой-то проблемой. Опишите,
          пожалуйста, что произошло и прикрепите фото товара и его этикетки.
        </Typography>

        <Typography
          color="#FDF2F2"
          fontWeight={700}
          mb={1}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          Прикрепите фото
          <HelpOutlineIcon sx={{ color: "#DCDCDC", fontSize: 20 }} />
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
          {product.photos.map((photo, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: 90,
                height: 90,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid #555",
              }}
            >
              <img
                src={photo}
                alt={`photo-${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                size="small"
                onClick={() => dispatch(removePhoto(index))}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "#FDF2F2",
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}

          {/* upload tugmasi */}
          <label htmlFor="file-upload">
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: 2,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#7C69F4",
                bgcolor: "#1B1A2033",
              }}
            ></Box>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageUpload}
            />
          </label>
        </Stack>

        {/* === INPUTLAR TO‘LIQ === */}
        <Stack spacing={0.5}>
          <Typography
            sx={{ color: "#FDF2F2", fontSize: "14px", fontWeight: 500 }}
          >
            Баркод
          </Typography>
          <LabeledInput
            placeholder="Введите баркод товара"
            value={product.barcode}
            onChange={(val) => handleChange("barcode", val)}
            withScanner
          />

          <Typography
            sx={{ color: "#FDF2F2", fontSize: "14px", fontWeight: 500 }}
          >
            Артикул
          </Typography>
          <LabeledInput
            placeholder="Введите артикул товара"
            value={product.article}
            onChange={(val) => handleChange("article", val)}
          />

          <Typography
            sx={{ color: "#FDF2F2", fontSize: "14px", fontWeight: 500 }}
          >
            Название
          </Typography>
          <LabeledInput
            placeholder="Введите название товара"
            value={product.name}
            onChange={(val) => handleChange("name", val)}
          />

          <Typography
            sx={{ color: "#FDF2F2", fontSize: "14px", fontWeight: 500 }}
          >
            Адрес
          </Typography>
          <LabeledInput
            placeholder="Введите адрес"
            value={product.address || ""}
            onChange={(val) => handleChange("address" as any, val)}
          />

          <Typography
            sx={{ color: "#FDF2F2", fontSize: "14px", fontWeight: 500 }}
          >
            Номер телефона
          </Typography>
          <LabeledInput
            placeholder="+7 (___) ___-__-__"
            value={product.phone || ""}
            onChange={(val) => handleChange("phone" as any, val)}
          />
        </Stack>

        <Button
          fullWidth
          onClick={handleSubmit}
          sx={{
            mt: 3,
            bgcolor: "#7C69F4",
            color: "#FDF2F2",
            borderRadius: "10px",
            fontWeight: 500,
            height: "45px",
            textTransform: "none",
            "&:hover": { bgcolor: "#6b5ae0" },
          }}
        >
          Готово
        </Button>
      </Box>
    </Modal>
  );
}
