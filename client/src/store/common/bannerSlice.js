import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  bannerImageList: [],
};

export const addBannerImages = createAsyncThunk(
  "/shop/addBannerImages",
  async (imageUrl) => {
    const response = await axios.post(
      "http://localhost:3000/api/common/banner/add",
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
      "http://localhost:3000/api/common/banner/get"
    );

    return response.data;
  }
);

export const deleteBannerImages = createAsyncThunk(
  "/shop/deleteBannerImages",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:3000/api/common/banner/delete/${id}`
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
