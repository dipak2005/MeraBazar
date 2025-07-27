import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  //   orderId: null,
  orderList: [],
  orderDetails: null,
  sellerOrderDetails: null,
};

export const getAllOrdersForSeller = createAsyncThunk(
  "/order/getAllOrdersForSeller",
  async () => {
    const response = await axios.get(
      `http://localhost:3000/api/seller/orders/get`
    );
    console.log(response.data);
    return response.data;
  }
);

export const getOrderDetailsForSeller = createAsyncThunk(
  "/order/getOrderDetailsForSeller",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/seller/orders/details/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const updateOrderStatusBySeller = createAsyncThunk(
  "/order/updateOrderStatusBySeller",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:3000/api/seller/orders/update/${id}`,
      {
        orderStatus,
      }
    );
    console.log(response.data);
    return response.data;
  }
);

export const fetchOrderBySeller = createAsyncThunk(
  "/order/fetchOrderBySeller",
  async ({ sellerId }) => {
    const response = await axios.get(
      `http://localhost:3000/api/seller/orders/${sellerId}`
    );
    console.log(response.data);
    return response.data;
  }
);

const sellerOrderSlice = createSlice({
  name: "sellerOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
        console.log(action.payload.data);
      })
      .addCase(getAllOrdersForSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
        console.log(state.orderDetails);
      })
      .addCase(getOrderDetailsForSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(fetchOrderBySeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderBySeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
        console.log(state.orderList);
      })
      .addCase(fetchOrderBySeller.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const { resetOrderDetails } = sellerOrderSlice.actions;
export default sellerOrderSlice.reducer;
