import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Initial state
const initialState = {
  listItems: [],
  isLoading: false,
};

// Thunk to fetch wishlist items from the backend
export const fetchListItems = createAsyncThunk(
  "wishlist/fetchListItems",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${VITE_API_URL}/api/v1/wishlist/${userId}`,
        {
          withCredentials: true,
        }
      );
      return response.data; // Assume backend returns the full wishlist (array of items)
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to add a product to the wishlist
export const addListItems = createAsyncThunk(
  "wishlist/addListItems",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${VITE_API_URL}/api/v1/wishlist/`,
        {
          productId,
        },
        { withCredentials: true }
      );
      console.log(response);
      return response.data; // Backend should return the newly added wishlist item with full details
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to remove a product from the wishlist
export const removeListItems = createAsyncThunk(
  "wishlist/removeListItems",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      console.log(userId, productId);
      const response = await axios.delete(
        `${VITE_API_URL}/api/v1/wishlist/${productId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data; // Return the productId to remove it from Redux state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch withlist items
      .addCase(fetchListItems.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchListItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listItems = action.payload.data;
      })
      .addCase(fetchListItems.rejected, (state) => {
        state.isLoading = false;
        state.listItems = [];
      })

      // Add to withlist
      .addCase(addListItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addListItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listItems = action.payload.data;
      })
      .addCase(addListItems.rejected, (state) => {
        state.isLoading = false;
        state.listItems = [];
      })

      // remove from withlist
      .addCase(removeListItems.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(removeListItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listItems = action.payload.data;
      })
      .addCase(removeListItems.rejected, (state) => {
        state.isLoading = false;
        state.listItems;
      });
  },
});

// Export reducer
export default wishListSlice.reducer;
