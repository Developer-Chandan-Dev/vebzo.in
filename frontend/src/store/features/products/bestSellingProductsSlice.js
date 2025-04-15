import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const VITE_API_URL = import.meta.env.VITE_API_URL;

// Initial State
const initialState = {
    bsItems: [],
    isLoading: false,
    error: null
}

// Thunk to fetch my orders (Only for Logged-in-Users)
export const fetchBSOrders = createAsyncThunk("bsItems/fetchBSOrders", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${VITE_API_URL}/api/v1/products?bestSellingProducts=true`);

        return response?.data; // Backend returns cart data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

const bestSellingProductsSlice = createSlice({
    name: "bs-products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch best selling products
            .addCase(fetchBSOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBSOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bsItems = action.payload,
                    state.error = null;
            })
            .addCase(fetchBSOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.bsItems = [];
                state.error = action.payload
            })
    }
})

// Export reducer
export default bestSellingProductsSlice.reducer;