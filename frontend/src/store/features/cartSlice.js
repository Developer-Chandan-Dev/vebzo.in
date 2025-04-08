import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const VITE_API_URL = import.meta.env.VITE_API_URL;

// Initial state
const initialState = {
  cartItems: [],
  isLoading: false,
};

// Thunk to fetch cart items (Only for Logged-in Users)
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${VITE_API_URL}/api/v1/cart/${userId}`, {
        withCredentials: true,
      });
      return response.data; // Backend returns cart data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to add a product to the cart (For both Logged-in & Guest Users)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {

    try {

      const response = await axios.post(
        `${VITE_API_URL}/api/v1/cart/`,
        { userId, productId: productId, quantity },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to remove a product from the cart (For both Logged-in & Guest Users)
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {

    try {
      const response = await axios.delete(
        `${VITE_API_URL}/api/v1/cart/${userId}/${productId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to update product quantity (For both Logged-in & Guest Users)
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {

    try {
      const response = await axios.put(
        `${VITE_API_URL}/api/v1/cart/update-cart`,
        { userId, productId, quantity },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Clear cart after checkout
export const clearCart = createAsyncThunk("cart/clearCart", async (userId) => {
  await axios.delete(`${VITE_API_URL}/api/v1/cart/clear/${userId}`, {
    withCredentials: true,
  });
  return [];
});

// Redux slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data?.items;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      // Update cart
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

// Export actions
export const { clearGuestCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
