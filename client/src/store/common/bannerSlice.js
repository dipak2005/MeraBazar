
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const initialState = {
  isLoading: false,
  bannerImageList: [],
};

export const addBannerImages = createAsyncThunk(
  "/shop/addBannerImages",
  async (imageUrl) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/common/banner/add`,
      { image: imageUrl }
    );
    console.log(response.data);
    return response.data;
  }
);

export const getBannerImages = createAsyncThunk(
  "/shop/getBannerImages",
  async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/common/banner/get`
    );

    return response.data;
  }
);

export const deleteBannerImages = createAsyncThunk(
  "/shop/deleteBannerImages",
  async (id) => {
    const result = await axios.delete(
      `${API_BASE_URL}/api/common/banner/delete/${id}`
    );
    console.log(result.data);
    return result?.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBannerImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBannerImages.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.bannerImageList = action.payload.data);
      })
      .addCase(getBannerImages.rejected, (state, action) => {
        (state.isLoading = false), (state.bannerImageList = []);
      });
  },
});

// export const { resetSearchResults } = searchSlice.actions;
export default commonSlice.reducer;
