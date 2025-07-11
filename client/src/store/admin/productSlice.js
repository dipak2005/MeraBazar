import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

// add product thunk
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:3000/api/admin/products/add",
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
      "http://localhost:3000/api/admin/products/get"
    );
    return result?.data;
  }
);

// add editProduct thunk
export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:3000/api/admin/products/edit/${id}`,
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
      `http://localhost:3000/api/admin/products/delete/${id}`
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
