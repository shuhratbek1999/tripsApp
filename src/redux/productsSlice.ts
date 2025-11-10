import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  article: string;
  barcode: string;
  code?: string;
  image: string;
  planned: boolean;
  status: string;
}

interface UpdateStatusPayload {
  id: number;
  status: Product["status"];
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [
    {
      id: 1,
      name: "Название товара может быть длинным",
      article: "123127312",
      barcode: "12378612736123",
      code: "55667",
      image: "/product.svg",
      planned: true,
      status: "Получить",
    },
    {
      id: 2,
      name: "Название товара",
      article: "123127312",
      barcode: "12378612736123",
      image: "/product.svg",
      planned: true,
      status: "Получен",
    },
    {
      id: 3,
      name: "Название товара",
      article: "123127312",
      barcode: "12378612736123",
      image: "/product.svg",
      planned: false,
      status: "Получен",
    },
    {
      id: 4,
      name: "Название товара",
      article: "123127312",
      barcode: "12378612736123",
      image: "/product.svg",
      planned: true,
      status: "Получить",
    },
    {
      id: 5,
      name: "Название товара",
      article: "123127312",
      barcode: "12378612736123",
      image: "/product.svg",
      planned: true,
      status: "Получить",
    },
  ],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<UpdateStatusPayload>) => {
      const { id, status } = action.payload;
      const product = state.products.find((p) => p.id === id);
      if (product) {
        product.status = status;
      }
    },
  },
});

export const { updateStatus } = productsSlice.actions;
export default productsSlice.reducer;
