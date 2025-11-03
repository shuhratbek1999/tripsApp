import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./tripSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    trips: tripReducer,
    auth: authReducer,
  },
});

// Global type’lar
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
