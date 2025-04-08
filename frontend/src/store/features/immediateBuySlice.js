/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit";
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Initial state
const initialState = {
    items:[],
    isLoading: false,
}

const buySlice = createSlice({
    name : "immediateBuy",
    initialState,

    reducers:{
        
    }
})