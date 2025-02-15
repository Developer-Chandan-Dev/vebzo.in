import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import reviewReducer from "./features/reviewSlice";

// Create and configure the store
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    review: reviewReducer,
  },
});
