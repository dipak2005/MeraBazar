import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  //   orderId: null,
  sellerList: [],
  sellerDetails: null,
  
};

export const getAllSeller = createAsyncThunk(
  "/admin/getAllSeller",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/auth/sellerlist/get"
    );
    console.log(response.data);
    return response.data;
  }
);

export const getSellerDetails = createAsyncThunk(
  "/admin/getSellerDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/auth/sellerlist/details/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const updateSellerApprovalStatus = createAsyncThunk(
  "/admin/updateSellerApprovalStatus",
  async ({ id, status , isapproved }) => {
    const response = await axios.put(
      `http://localhost:3000/api/auth/sellerlist/update/${id}`,
      {
        approvalstatus:status,
        isapproved
      }
    );
    console.log("Sending update:", { approvalstatus: status, isapproved });
    console.log(response.data);
    return response.data;
  }
);

const sellerListingSlice = createSlice({
  name: "admin/sellerListingSlice",
  initialState,
  reducers: {
    resetSellerDetails: (state) => {
      state.sellerDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sellerList = action.payload.data;
        console.log(state.sellerList);
      })
      .addCase(getAllSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.sellerList = [];
      })
      .addCase(getSellerDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSellerDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sellerDetails = action.payload;
        console.log(state.sellerDetails); 
      })
      .addCase(getSellerDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.sellerDetails = null;
      });
  },
});

export const { resetSellerDetails } = sellerListingSlice.actions;
export default sellerListingSlice.reducer;
