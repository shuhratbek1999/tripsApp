"use client";

import React, { useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Modal,
  IconButton,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import LabeledInput from "@/components/LabeledInput";
import LabeledTextarea from "./LabeledTextarea";
import HoverHint from "@/components/HoverHint";
import PhotoHint from "@/components/PhotoHint";
import PhotoHintLabelInfo from "@/components/PhotoHintLabelInfo";
import { useSelector, useDispatch } from "react-redux";
import {
  closeProblemModal,
  setProblemField,
  resetProblemForm,
  addPhoto,
  removePhoto,
} from "@/redux/problemSlice";
import { RootState } from "@/redux/store";

export default function ProblemModal() {
  const dispatch = useDispatch();
  const { open, form } = useSelector((state: RootState) => state.problem);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    console.log("Yuborilayotgan malumot:", form);
    dispatch(resetProblemForm());
    dispatch(closeProblemModal());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        dispatch(addPhoto(event.target.result as string));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal open={open} onClose={() => dispatch(closeProblemModal())}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#2D2D2D",
          p: 3,
          width: "90%",
          color: "white",
          boxShadow: 24,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "20px 20px 0 0",
        }}
      >
        {/* HEADER */}
        <Typography variant="h1" fontWeight={600} color="#FDF2F2" fontSize={24}>
          Проблема с товаром
        </Typography>
        <Typography
          sx={{ mt: 1.5, color: "#FDF2F2", fontSize: "16px", fontWeight: 500 }}
        >
          Очень жаль что вы столкнулись с какой-то проблемой опишите, пожалуйста
          что произошло и прикрепите фото товара и его этикетки, как правильно
          сделать написанно в вопросе если он есть, если вам его не выдают, то
          просто опишите информацию
        </Typography>

        {/* ФОТО ТОВАРА */}
        <Box mt={3}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <HoverHint hintContent={<PhotoHint />}>
              <Typography fontWeight={700} color="#FDF2F2">
                Прикрепите фото
              </Typography>
              <HelpOutlineIcon sx={{ color: "#DCDCDC", fontSize: 18 }} />
            </HoverHint>
          </Stack>

          <Typography sx={{ fontSize: "13px", color: "#B5B5B5", mb: 1 }}>
            Фото товара
          </Typography>

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <Stack direction="row" spacing={1}>
            {form.photos.map((photo, index) => (
              <Box
                key={index}
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "10px",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid #7C69F4",
                }}
              >
                <img
                  src={photo}
                  alt={`photo-${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => dispatch(removePhoto(index))}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.4)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            ))}

            {form.photos.length < 3 && (
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  width: 107,
                  height: 107,
                  bgcolor: "#1B1A2033",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                }}
              ></Box>
            )}
          </Stack>
        </Box>

        {/* ЗАПОЛНИТЕ ИНФОРМАЦИЮ */}
        <Box mt={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <HoverHint hintContent={<PhotoHintLabelInfo />}>
              <Typography fontWeight={700} fontSize={16} color="#FDF2F2">
                Заполните информацию
              </Typography>
              <HelpOutlineIcon sx={{ color: "#DCDCDC", fontSize: 18 }} />
            </HoverHint>
          </Stack>

          <Stack spacing={0.5} mt={1.5}>
            <Typography
              sx={{ color: "#FDF2F2", fontSize: "14px", fontWeight: 500 }}
            >
              Бренд
            </Typography>
            <LabeledInput
              placeholder="Введите бренд товара"
              value={form.brand}
              onChange={(v) =>
                dispatch(setProblemField({ field: "brand", value: v }))
              }
            />
            <Typography
              sx={{ color: "#FDF2F2", fontSize: "14px", fontWeight: 500 }}
            >
              Артикул
            </Typography>
            <LabeledInput
              placeholder="Введите артикул товара"
              value={form.article}
              onChange={(v) =>
                dispatch(setProblemField({ field: "article", value: v }))
              }
            />
            <Typography
              sx={{ color: "#FDF2F2", fontSize: "14px", fontWeight: 500 }}
            >
              Баркод
            </Typography>
            <LabeledInput
              placeholder="Введите баркод товара"
              value={form.barcode}
              onChange={(v) =>
                dispatch(setProblemField({ field: "barcode", value: v }))
              }
              withScanner
            />
            <Typography
              sx={{ color: "#FDF2F2", fontSize: "14px", fontWeight: 500 }}
            >
              Объяснение
            </Typography>
            <LabeledTextarea
              placeholder="Коротко опишите ситуацию"
              value={form.description}
              onChange={(v) =>
                dispatch(setProblemField({ field: "description", value: v }))
              }
            />
          </Stack>
        </Box>

        {/* SUBMIT */}
        <Button
          fullWidth
          onClick={handleSubmit}
          sx={{
            mt: 3,
            bgcolor: "#7C69F4",
            color: "#FDF2F2",
            borderRadius: "10px",
            fontWeight: 500,
            textTransform: "none",
            py: 1.2,
            height: "45px",
            "&:hover": { bgcolor: "#6B5AE0" },
          }}
        >
          Сообщить
        </Button>
      </Box>
    </Modal>
  );
}
