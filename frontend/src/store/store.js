import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

// Create and configure the store
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
