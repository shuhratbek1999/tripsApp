"use client";
interface ProductFormProps {
  onClose?: () => void; // ← shu qatorni qo‘sh
}
import { Box, Typography, Button, Stack, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  updateField,
  addPhoto,
  removePhoto,
  clearProduct,
} from "@/redux/productSlice";
import { useRouter } from "next/navigation";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import LabeledInput from "./LabeledInput";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function ProductForm({ onClose }: ProductFormProps) {
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
    router.back();
    onClose?.();
  };

  return (
    <Box
      sx={{
        bgcolor: "#2D2D2D",
        p: 3,
        overflowY: "scroll",
        height: "880px",
        borderRadius: "20px 20px 0 0",
      }}
    >
      <Typography color="#FDF2F2" fontWeight={600} fontSize="24px" mb={1}>
        Новый товар
      </Typography>

      <Typography color="#FDF2F2" fontWeight={500} fontSize="16px" mb={2}>
        Очень жаль что вы столкнулись с какой-то проблемой опишите, пожалуйста
        что произошло и прикрепите фото товара и его этикетки, как правильно
        сделать написанно в вопросе если он есть, если вам его не выдают, то
        просто опишите информацию
      </Typography>
      <Typography
        color="#FDF2F2"
        fontWeight={700}
        mb={1}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        Прикрепите фото
        <HelpOutlineIcon sx={{ color: "##DCDCDC", fontSize: 20 }} />
      </Typography>

      <Typography
        sx={{ fontWeight: 500, fontSize: "16px", color: "#A9B7BD", mb: 1 }}
      >
        Фото товара
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
        {/* mavjud rasmlar preview */}
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
                color: "white",
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
              "&:hover": { borderColor: "#7C69F4" },
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
      <Typography
        color="white"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
        fontWeight={600}
        mb={1}
      >
        Заполните информацию
        <HelpOutlineIcon sx={{ color: "#DCDCDC", fontSize: 20 }} />
      </Typography>

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
          placeholder="Введите бренд товара"
          value={product.name}
          onChange={(val) => handleChange("name", val)}
        />
        <Typography
          sx={{ color: "#FDF2F2", fontSize: "14px", fontWeight: 500 }}
        >
          Адрес
        </Typography>
        <LabeledInput
          placeholder="Введите бренд товара"
          value={product.barcode}
          onChange={(val) => handleChange("barcode", val)}
        />
        <Typography
          sx={{ color: "#FDF2F2", fontSize: "14px", fontWeight: 500 }}
        >
          Номер телефона
        </Typography>
        <LabeledInput
          placeholder="Введите бренд товара"
          value={product.article}
          onChange={(val) => handleChange("article", val)}
        />
      </Stack>

      <Button
        fullWidth
        onClick={handleSubmit}
        sx={{
          mt: 3,
          bgcolor: "#7C69F4",
          color: "white",
          borderRadius: "10px",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": { bgcolor: "#6b5ae0" },
        }}
      >
        Готово
      </Button>
    </Box>
  );
}
