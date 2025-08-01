
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const storedSeller = localStorage.getItem("seller");

const initialState = {
  seller: storedSeller ? JSON.parse(storedSeller) : null,
  isAuthenticated: !!storedSeller,
  isLoading: true,
};

// for register : add seller
export const registeredSeller = createAsyncThunk(
  "/auth/registerSeller",
  async (payload) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/seller/register-seller`,
      payload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

// for
// export const loggedinSeller = createAsyncThunk(
//   "/auth/loggedinSeller",
//   async (formData) => {
//     const response = await axios.post(
//       "http://localhost:3000/api/auth/login",
//       formData,
//       { withCredentials: true }
//     );
//     return response.data;
//   }
// );

export const logOutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
});

const sellerSlice = createSlice({
  name: "sellerSlice",
  initialState,
  reducers: {
  resetSeller: (state) => {
    state.seller = null;
    state.isAuthenticated = false;
    state.isLoading = false;
    localStorage.removeItem("seller");
  }
},

  extraReducers: (builder) => {
    builder
      .addCase(registeredSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registeredSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.seller = action.payload.data;
        state.isAuthenticated = true;
        console.log("Registered seller fulfilled:", state.seller);

        if (action.payload.data) {
          localStorage.setItem("seller", JSON.stringify(action.payload.data));
        }
      })
      .addCase(registeredSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.seller = null;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.seller = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        localStorage.removeItem("seller");
      });
  },
});

export const {resetSeller} = sellerSlice.actions;
export default sellerSlice.reducer;
