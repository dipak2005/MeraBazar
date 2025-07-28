
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
  async (formData) => {
    const result = await axios.post(
      `${API_BASE_URL}/api/admin/products/add`,
      formData
    );
    return result?.data;
  }
);

// add fetchAllProduct thunk
export const fetchAllProduct = createAsyncThunk(
  "/products/fetchallproduct",
  async () => {
    const result = await axios.get(
      `${API_BASE_URL}/api/admin/products/get`
    );
    return result?.data;
  }
);

//  edit Product thunk
export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${API_BASE_URL}/api/admin/products/edit/${id}`,
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
      `${API_BASE_URL}/api/admin/products/delete/${id}`,
      
    );
    return result?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
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

export default AdminProductSlice.reducer;
