import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Axios for API calls

const VITE_API_URL = import.meta.env.VITE_API_URL;
// Initial state
const initialState = {
  cartItems: [], // Full cart details (fetched from backend)
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk to fetch cart items from the backend
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axios.get(`${VITE_API_URL}/api/v1/cart/`, {
        withCredentials: true,
      });
      console.log(response);
      return response.data; // Assume backend returns the full cart (array of items)
    } catch (error) {
        console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to add a product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${VITE_API_URL}/api/v1/cart/`,
        {
          productId,
          quantity,
        },
        { withCredentials: true }
      );
      return response.data; // Backend should return the newly added cart item with full details
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to remove a product from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${VITE_API_URL}/api/v1/cart/${productId}`);
      return productId; // Return the productId to remove it from Redux state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to update product quantity in the cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${VITE_API_URL}/api/v1/cart/`, {
        productId,
        quantity,
      });
      return response.data; // Backend returns updated cart item
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    clearCart: (state) => {
      state.cartItems = []; // Clear all cart items
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(state.cart, action.payload)
        state.cartItems = action.payload; // Replace cart items with fetched data
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        console.log(state, action);
        state.error = action.payload;
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(state.cart, action.payload);
        state.cartItems.push(action.payload); // Add new cart item
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload // Remove item by productId
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update cart
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedItem = action.payload;
        const index = state.cartItems.findIndex(
          (item) => item._id === updatedItem._id
        );
        if (index !== -1) {
          state.cartItems[index] = updatedItem; // Update the specific cart item
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
