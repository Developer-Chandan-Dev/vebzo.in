import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import reviewReducer from "./features/reviewSlice";
import buyNowReducer from './features/buyNowSlice'

// Create and configure the store
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    review: reviewReducer,
    buyNow: buyNowReducer
  },
});
