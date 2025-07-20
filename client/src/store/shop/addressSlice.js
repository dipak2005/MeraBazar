import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

//  add address thunk
export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/address/add",
      formData
    );

    return response.data;
  }
);

//  fetch all address thunk
export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async ({ userId }) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/address/get/${userId}`
    );

    return response.data;
  }
);

//  edit address thunk
export const editAddress = createAsyncThunk(
  "/addresses/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:3000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);

// delete address thunk
export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  add
    builder
      .addCase(addNewAddress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state,action) => {
        state.isLoading = false;
       
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      
      });

    //   fetch

    builder
      .addCase(fetchAllAddresses.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state,action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state,action) => {
        state.isLoading = false;
        state.addressList = [];
      });

    //   update

    builder
      .addCase(editAddress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state,action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(editAddress.rejected, (state,action) => {
        state.isLoading = false;
        state.addressList = [];
      });

    //   delete
    builder.addCase(deleteAddress.fulfilled, (state,action) => {
        state.isLoading = false;
        state.addressList = [];
      })
      
  },
});


export default addressSlice.reducer;