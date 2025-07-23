import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviewList: [],
};

export const addNewReviews = createAsyncThunk(
  "/shop/addNewReviews",
  async (data) => {
    const response = await axios.post(
      `http://localhost:3000/api/shop/review/add`,

      data
    );

    return response.data;
  }
);

export const getReviews = createAsyncThunk("/shop/getReviews", async (id) => {
  const response = await axios.get(
    `http://localhost:3000/api/shop/review/${id}`
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
