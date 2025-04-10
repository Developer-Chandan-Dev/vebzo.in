// buyNowSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buyItem: [], // example: [{ id, name, price, quantity, imageUrl }]
};

const buyNowSlice = createSlice({
  name: "buyNow",
  initialState,
  reducers: {
    setBuyNowItem: (state, action) => {
      state.buyItem = [action.payload];
    },
    clearBuyNow: (state) => {
      state.buyItem = [];
    },
    updateBuyNowQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      if (state.buyItem[index]) {
        state.buyItem[index].quantity = quantity;
      }
    },
  },
});

export const { setBuyNowItem, clearBuyNow, updateBuyNowQuantity } = buyNowSlice.actions;

export default buyNowSlice.reducer;
