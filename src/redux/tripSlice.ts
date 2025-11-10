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
              address: "ул. Ленина, д.15",
              phone: "+7 (999) 222-22-22",
              numbers_adress: 5,
              number_products: 10,
              accepted: 10,
              rest: 0,
              getnot: 0,
              delivered_count: 10,
              products: [
                {
                  id: 201,
                  title: "Товар доставлен полностью",
                  article: "A123",
                  barcode: "123456789",
                  status: "Получен",
                  image: "/product.svg",
                },
              ],
            },
          ],
        },
        {
          clusterName: "Кластер 2",
          addresses: [
            {
              id: 2,
              address: "ул. Кирова, д.7",
              phone: "+7 (999) 333-33-33",
              numbers_adress: 8,
              number_products: 20,
              accepted: 15,
              rest: 5,
              getnot: 0,
              delivered_count: 12,
              products: [
                {
                  id: 301,
                  title: "Название товара",
                  article: "B987",
                  barcode: "987654321",
                  status: "Получить",
                  image: "/product.svg",
                },
              ],
            },
          ],
        },
        {
          clusterName: "Кластер 3",
          addresses: [
            {
              id: 3,
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
                  id: 401,
                  title: "Название товара может быть длинным",
                  article: "12372132",
                  barcode: "12387687326123",
                  status: "Получить",
                  image: "/product.svg",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Выезд №2",
      date_time: "25.10.2025 10:00",
      step: 1,
      details: [
        {
          clusterName: "Кластер 4",
          addresses: [
            {
              id: 1,
              address: "ул. Ленина, д.15",
              phone: "+7 (999) 222-22-22",
              numbers_adress: 5,
              number_products: 10,
              accepted: 10,
              rest: 0,
              getnot: 0,
              delivered_count: 10,
              products: [
                {
                  id: 201,
                  title: "Товар доставлен полностью",
                  article: "A123",
                  barcode: "123456789",
                  status: "Получен",
                  image: "/product.svg",
                },
              ],
            },
          ],
        },
        {
          clusterName: "Кластер 5",
          addresses: [
            {
              id: 2,
              address: "ул. Кирова, д.7",
              phone: "+7 (999) 333-33-33",
              numbers_adress: 8,
              number_products: 20,
              accepted: 15,
              rest: 5,
              getnot: 0,
              delivered_count: 12,
              products: [
                {
                  id: 301,
                  title: "Название товара",
                  article: "B987",
                  barcode: "987654321",
                  status: "Получить",
                  image: "/product.svg",
                },
              ],
            },
          ],
        },
        {
          clusterName: "Кластер 6",
          addresses: [
            {
              id: 3,
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
                  id: 401,
                  title: "Название товара может быть длинным",
                  article: "12372132",
                  barcode: "12387687326123",
                  status: "Получить",
                  image: "/product.svg",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Выезд №3",
      date_time: "25.10.2025 10:00",
      step: 2,
      details: [
        {
          clusterName: "Кластер 7",
          addresses: [
            {
              id: 1,
              address: "ул. Ленина, д.15",
              phone: "+7 (999) 222-22-22",
              numbers_adress: 5,
              number_products: 10,
              accepted: 10,
              rest: 0,
              getnot: 0,
              delivered_count: 10,
              products: [
                {
                  id: 201,
                  title: "Товар доставлен полностью",
                  article: "A123",
                  barcode: "123456789",
                  status: "Получен",
                  image: "/product.svg",
                },
              ],
            },
          ],
        },
        {
          clusterName: "Кластер 8",
          addresses: [
            {
              id: 2,
              address: "ул. Кирова, д.7",
              phone: "+7 (999) 333-33-33",
              numbers_adress: 8,
              number_products: 20,
              accepted: 15,
              rest: 5,
              getnot: 0,
              delivered_count: 12,
              products: [
                {
                  id: 301,
                  title: "Название товара",
                  article: "B987",
                  barcode: "987654321",
                  status: "Получить",
                  image: "/product.svg",
                },
              ],
            },
          ],
        },
        {
          clusterName: "Кластер 9",
          addresses: [
            {
              id: 3,
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
                  id: 401,
                  title: "Название товара может быть длинным",
                  article: "12372132",
                  barcode: "12387687326123",
                  status: "Получить",
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
    // ➕ Mahsulot qo‘shish
    addProduct: (
      state,
      action: PayloadAction<{ addressId: number; newProduct: Product }>
    ) => {
      for (const trip of state.trips) {
        for (const cluster of trip.details) {
          const address = cluster.addresses.find(
            (a) => a.id === action.payload.addressId
          );
          if (address) {
            address.products = address.products || [];
            address.products.push(action.payload.newProduct);
          }
        }
      }
    },

    // 🔄 Mahsulot statusini yangilash
    updateProductStatus: (
      state,
      action: PayloadAction<{
        addressId: number;
        productId: number;
        status: "Получен" | "Получить" | "Не получил";
      }>
    ) => {
      for (const trip of state.trips) {
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
      }
    },

    // 🚀 Stepni oshirish
    updateTripStep: (state, action: PayloadAction<{ id: number }>) => {
      const trip = state.trips.find((t) => t.id === action.payload.id);
      if (trip && trip.step < 3) {
        trip.step += 1;
      }
    },
  },
});

export const { addProduct, updateTripStep, updateProductStatus } =
  tripSlice.actions;
export default tripSlice.reducer;
