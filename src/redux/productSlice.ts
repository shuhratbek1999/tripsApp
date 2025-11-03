import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  barcode: string;
  article: string;
  name: string;
  address: string;
  phone: string;
  photos: string[];
}

const initialState: Product = {
  barcode: "",
  article: "",
  name: "",
  address: "",
  phone: "",
  photos: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // faqat string maydonlarni yangilash uchun
    updateField: (
      state,
      action: PayloadAction<{
        key: Exclude<keyof Product, "photos">; // photosdan tashqari
        value: string;
      }>
    ) => {
      state[action.payload.key] = action.payload.value as any;
    },
    addPhoto: (state, action: PayloadAction<string>) => {
      state.photos.push(action.payload);
    },
    removePhoto: (state, action: PayloadAction<number>) => {
      state.photos.splice(action.payload, 1);
    },

    clearProduct: () => initialState,
  },
});

export const { updateField, addPhoto, removePhoto, clearProduct } =
  productSlice.actions;
export default productSlice.reducer;
