import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  phoneNumber: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  phoneNumber: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.phoneNumber = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.phoneNumber = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
