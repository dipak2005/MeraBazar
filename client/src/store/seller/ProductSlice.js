

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const initialState = {
  isLoading: false,
  productList: [],
};

// add product thunk
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData,sellerId) => {
    const result = await axios.post(
      `${API_BASE_URL}/api/seller/products/add`,
      formData ,sellerId
    );
    return result?.data;
  }
);

// add fetchAllProduct thunk
export const fetchAllProduct = createAsyncThunk(
  "/products/fetchallproduct",
  async (sellerId) => {
    const result = await axios.get(
      `${API_BASE_URL}/api/seller/products/get/${sellerId}`
    );
    return result?.data;
  }
);

//  edit Product thunk
export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${API_BASE_URL}/api/seller/products/edit/${id}`,
      formData
    );
    return result?.data;
  }
);

// add deleteProduct thunk
export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const result = await axios.delete(
      `${API_BASE_URL}/api/seller/products/delete/${id}`,
      
    );
    return result?.data;
  }
);

const SellerProductSlice = createSlice({
  name: "sellerProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        // console.log(action.payload);

        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default SellerProductSlice.reducer;
