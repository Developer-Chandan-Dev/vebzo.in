import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const VITE_API_URL = import.meta.env.VITE_API_URL;

// Initial State
const initialState = {
    orderItems: [],
    isLoading: false,
    error: null
}

// Thunk to fetch my orders (Only for Logged-in-Users)
export const fetchMyOrders = createAsyncThunk("orders/fetchMyOrders", async (params = null, { rejectWithValue }) => {
    console.log(params);
    try {
        const response = await axios.get(`${VITE_API_URL}/api/v1/orders/my-orders`, {
            params: params || {}, // If params is null, use an empty object
            withCredentials: true,
        });
        console.log(response);

        return response?.data; // Backend returns cart data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

// Thunk for placing order (Only for Logged-in Users)



// Redux slice
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch my orders
            .addCase(fetchMyOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderItems = action.payload?.order; // Set the fetched orders to state
                state.error = null;
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.orderItems = [];
                state.error = action.payload;
            })
    }
})

// Export reducer
export default orderSlice.reducer;