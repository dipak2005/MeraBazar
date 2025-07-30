
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};


export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async () => {
  

    const result = await axios.get(
      `${API_BASE_URL}/api/shop/products/get`
    );

    console.log(result.data);

    return result?.data;
  }
);
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
     console.log(query + "query");
    const result = await axios.get(
      `${API_BASE_URL}/api/shop/products/get?${query}`
    );

    console.log(result.data);

    return result?.data;
  }
);


//  Fetch product details by ID
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchproductdetails",
  async (id) => {
    const result = await axios.get(
      `${API_BASE_URL}/api/shop/products/get/${id}`
    );

    console.log(" Product Details:", result.data);
    return result.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingproducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload?.data || null;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;
