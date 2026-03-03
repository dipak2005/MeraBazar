import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchResult = createAsyncThunk(
  "/shop/getSearchResult",
  async (keyword) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/shop/product/search/search-product/${keyword}`,
    );

    return response.data;
  },
);

export const searchProductsByImage = createAsyncThunk(
  "/products/searchProductsByImage",
  async (formData) => {
    try {
      const result = await axios.post(
        `${API_BASE_URL}/api/shop/product/search/search-by-image`,
        formData,
      );

      return result.data; // this is array of products
    } catch (error) {
      console.error("Error during image search:", error);
      throw error; // Important to re-throw so that the rejected case is handled
    }
  },
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResult.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.searchResults = action.payload.data));
      })
      .addCase(getSearchResult.rejected, (state, action) => {
        ((state.isLoading = false), (state.searchResults = []));
      })
      .addCase(searchProductsByImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProductsByImage.fulfilled, (state, action) => {
        ((state.isLoading = false),
           state.searchResults = action.payload.products || []);
      })
      .addCase(searchProductsByImage.rejected, (state) => {
        ((state.isLoading = false), (state.searchResults = []));
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
