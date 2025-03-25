import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Initial state
const initialState = {
  reviewItems: [],
  isLoading: false,
};

// Thunk to fetch reviews from the backend
export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${VITE_API_URL}/api/v1/reviews/${productId}`
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to add a new review
export const addNewReview = createAsyncThunk(
  "review/addNewReview",
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${VITE_API_URL}/api/v1/reviews`,
        { productId, rating, comment },
        { withCredentials: true }
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to remove a existing review from product
export const removeReview = createAsyncThunk(
  "review/removeReview",
  async ({ reviewId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${VITE_API_URL}/api/v1/reviews/${reviewId}`,
        { withCredentials: true }
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to update existing review
export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ rating, comment, reviewId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${VITE_API_URL}/api/v1/reviews/reviews/${reviewId}`,
        { rating, comment },
        { withCredentials: true }
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch reviews
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewItems = action.payload.data;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviewItems = [];
      })
      //   Add Review
      .addCase(addNewReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewItems = action.payload.data;
      })
      .addCase(addNewReview.rejected, (state) => {
        state.isLoading = false;
        state.reviewItems = [];
      })

      //   Remove review
      .addCase(removeReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewItems = action.payload.data;
      })
      .addCase(removeReview.rejected, (state) => {
        state.isLoading = false;
        state.reviewItems = [];
      })

      //   Update review
      .addCase(updateReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewItems = action.payload.data;
      })
      .addCase(updateReview.rejected, (state) => {
        state.isLoading = false;
        state.reviewItems = [];
      });
  },
});

// Export reducer
export default reviewSlice.reducer;