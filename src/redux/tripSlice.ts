import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  article: string;
  barcode: string;
  code?: string;
  image?: string;
  status: "Получен" | "Получить" | "Не получил";
}

interface Address {
  id: number;
  address: string;
  phone: string;
  numbers_adress: number;
  number_products: number;
  accepted: number;
  rest: number;
  getnot: number;
  delivered_count: number;
  products?: Product[];
}

interface Cluster {
  clusterName: string;
  addresses: Address[];
}

interface Trip {
  id: number;
  title: string;
  date_time: string;
  step: number;
  details: Cluster[];
}

interface TripState {
  trips: Trip[];
}

const initialState: TripState = {
  trips: [
    {
      id: 1,
      title: "Выезд №1",
      date_time: "25.10.2025 10:00",
      step: 0,
      details: [
        {
          clusterName: "Кластер 1",
          addresses: [
            {
              id: 1,
              address: "ул. Пушкина, д.10",
              phone: "+7 (999) 111-11-11",
              numbers_adress: 10,
              number_products: 25,
              accepted: 20,
              rest: 5,
              getnot: 0,
              delivered_count: 15,
              products: [
                {
                  id: 101,
                  title: "Название товара",
                  article: "12372132",
                  barcode: "12387687326123",
                  status: "Получен",
                  image: "/product.svg",
                },
                {
                  id: 102,
                  title: "Название товара может быть длинным",
                  article: "12372132",
                  barcode: "12387687326123",
                  code: "55667",
                  status: "Получить",
                  image: "/product.svg",
                },
                {
                  id: 103,
                  title: "Название товара",
                  article: "12372132",
                  barcode: "12387687326123",
                  status: "Получен",
                  image: "/product.svg",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    updateTripStep: (state, action: PayloadAction<{ id: number }>) => {
      const trip = state.trips.find((t) => t.id === action.payload.id);
      if (trip && trip.step < 3) {
        trip.step += 1;
      }
    },
    updateProductStatus: (
      state,
      action: PayloadAction<{
        addressId: number;
        productId: number;
        status: "Получен" | "Получить" | "Не получил";
      }>
    ) => {
      const trip = state.trips[0];
      for (const cluster of trip.details) {
        const address = cluster.addresses.find(
          (a) => a.id === action.payload.addressId
        );
        if (address) {
          const product = address.products?.find(
            (p) => p.id === action.payload.productId
          );
          if (product) product.status = action.payload.status;
        }
      }
    },
  },
});

export const { updateTripStep, updateProductStatus } = tripSlice.actions;
export default tripSlice.reducer;
