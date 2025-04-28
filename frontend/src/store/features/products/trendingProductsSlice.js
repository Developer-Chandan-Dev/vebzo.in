import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const VITE_API_URL = import.meta.env.VITE_API_URL;

// Initial State
const initialState = {
    trendingItems: [],
    isLoading: false,
    error: null
}

// Thunk to fetch my orders (Only for Logged-in-Users)
export const fetchTrendingProducts = createAsyncThunk("trendingItems/fetchTrendingProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${VITE_API_URL}/api/v1/products?isFeatured=true`);
        return response?.data; // Backend returns cart data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

const trendingProductsSlice = createSlice({
    name: "trending-products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch best selling products
            .addCase(fetchTrendingProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trendingItems = action.payload,
                    state.error = null;
            })
            .addCase(fetchTrendingProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.trendingItems = [];
                state.error = action.payload
            })
    }
})

// Export reducer
export default trendingProductsSlice.reducer;