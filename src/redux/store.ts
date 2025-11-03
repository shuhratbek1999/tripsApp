import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./tripSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import problemReducer from "./problemSlice";
import alertReducer from "./alertSlice";

export const store = configureStore({
  reducer: {
    trips: tripReducer,
    auth: authReducer,
    product: productReducer,
    problem: problemReducer,
    alert: alertReducer,
  },
});

// Global type’lar
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
