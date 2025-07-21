import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/order/create",
      orderData
    );
   console.log(response.data);
    return response.data;
  }
);

const userOrderSlice = createSlice({
  name: "userOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewOrder.pending, (state) => {
         state.isLoading = true;
    }).addCase(createNewOrder.fulfilled, (state,action) => {
         state.isLoading = false;
         state.approvalURL= action.payload.approvalURL;
         state.orderId = action.payload.orderId;
         
    }).addCase(createNewOrder.rejected, (state,action) => {
         state.isLoading = false;
         state.approvalURL = null;
         state.orderId = null;
          console.error("Order creation failed:", action.error);
    })
  },
});

export default userOrderSlice.reducer;
