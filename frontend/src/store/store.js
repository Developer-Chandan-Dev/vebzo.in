import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";

// Create and configure the store
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
