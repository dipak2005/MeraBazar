import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const initialState = {
  isLoading: false,
  wishList: [],
};

// add item in to wishlist
export const addNewItem = createAsyncThunk(
  "/wishlist/addNewItem",
  async ({ userId, productId }) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/shop/account/wishlist/add`,
      {
        userId,
        productId,
      }
    );
    console.log(response.data);
    return response.data;
  }
);

// get item  in  wishlist
export const getItem = createAsyncThunk("/wishlist/getItem", async (userId) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/shop/account/wishlist/get/${userId}`
  );
  console.log(response.data);
  return response.data;
});

// delete item in wishlist
export const deleteItem = createAsyncThunk(
  "/wishlist/deleteItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${API_BASE_URL}/api/shop/account/wishlist/${userId}/${productId}`
    );
    console.log(response.data);
    return response.data;
  }
);

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewItem.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addNewItem.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewItem.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishList = action.payload.data;
      })
      .addCase(getItem.rejected, (state) => {
        state.isLoading = false;
        state.wishList = [];
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishList = [];
      });
  },
});

export default wishlistSlice.reducer;