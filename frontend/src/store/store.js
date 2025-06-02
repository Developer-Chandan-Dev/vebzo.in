import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import reviewReducer from "./features/reviewSlice";
import buyNowReducer from './features/buyNowSlice'
import orderTrackingReducer from './features/order/orderSlice'
import bsProductsReducer from './features/products/bestSellingProductsSlice'
import trendingProductsReducer from './features/products/trendingProductsSlice'
import { apiSlice } from "../services/apiSlice";

// Create and configure the store
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    review: reviewReducer,
    buyNow: buyNowReducer,
    order: orderTrackingReducer,
    bsItems: bsProductsReducer,
    trendingItems: trendingProductsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the API slice reducer  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the API slice middleware
});
