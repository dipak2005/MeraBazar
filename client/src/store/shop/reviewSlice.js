import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const initialState = {
  isLoading: false,
  reviewList: [],
};

export const addNewReviews = createAsyncThunk(
  "/shop/addNewReviews",
  async (data) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/shop/review/add`,

      data
    );

    return response.data;
  }
);

export const getReviews = createAsyncThunk("/shop/getReviews", async (id) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/shop/review/${id}`
  );

  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewList = action.payload.data;
        console.log(action.payload.data);
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviewList = [];
      });
  },
});

export default reviewSlice.reducer;
