import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "products/addnewproduct",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${API_BASE_URL}/api/seller/products/add`,
        payload,
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const fetchAllProduct = createAsyncThunk(
  "products/fetchallproduct",
  async (sellerId, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${API_BASE_URL}/api/seller/products/get/${sellerId}`,
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteproduct",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `${API_BASE_URL}/api/seller/products/delete/${id}`,
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const productSlice = createSlice({
  name: "sellerProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data || [];
      })
      .addCase(fetchAllProduct.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default productSlice.reducer;
