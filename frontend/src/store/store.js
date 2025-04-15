import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import reviewReducer from "./features/reviewSlice";
import buyNowReducer from './features/buyNowSlice'
import myOrderReducer from './features/myOrdersSlice';
import orderTrackingReducer from './features/order/orderSlice'
import bsProductsReducer from './features/products/bestSellingProductsSlice'
import trendingProductsReducer from './features/products/trendingProductsSlice'

// Create and configure the store
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    review: reviewReducer,
    buyNow: buyNowReducer,
    myOrders: myOrderReducer,
    order: orderTrackingReducer,
    bsItems: bsProductsReducer,
    trendingItems: trendingProductsReducer
  },
});
