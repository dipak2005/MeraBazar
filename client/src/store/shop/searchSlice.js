import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: [],
};

const getSearchResult = createAsyncThunk(
  "/shop/getSearchResult",
  async (keyword) => {
    const response = await axios.get(
        `http://localhost:3000/api/shop/products/search/${keyword}`
    )
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.pending ,(state)=>{
        state.isLoading = true
    }).addCase(getSearchResult.fulfilled ,(state,action)=>{
        state.isLoading = false,
        state.searchResults =  action.payload.data;
    }).addCase(getSearchResult.rejected ,(state,action)=>{
        state.isLoading = false,
        state.searchResults = [];
    })
  },
});

export default searchSlice.reducer;
