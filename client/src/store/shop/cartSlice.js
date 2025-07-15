import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItem: [],
  isLoading: false,
};

// Add product to cart
export const addToCart = createAsyncThunk(
  "cart/addtocart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/cart/add",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);

// Fetch cart products
export const fetchCartProduct = createAsyncThunk(
  "cart/fetchcartproduct",
  async ({ userId }) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/cart/get/${userId}`
    );
    return response.data;
    console.log(response.data , "cart data")
  },

  
);

// Update cart product
export const updateCartProduct = createAsyncThunk(
  "cart/updatecartproduct",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `http://localhost:3000/api/shop/cart/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);

// Delete cart product
export const deleteCartProduct = createAsyncThunk(
  "cart/deletecartproduct",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:3000/api/shop/cart/${userId}/${productId}`
    );
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingcart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItem = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItem = [];
      });

    // Fetch cart products
    builder
      .addCase(fetchCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartProduct.fulfilled, (state, action) => {
         console.log("Fetched cart payload:", action.payload);
        state.isLoading = false;
        state.cartItem = action.payload.data;
      })
      .addCase(fetchCartProduct.rejected, (state) => {
        state.isLoading = false;
        state.cartItem = [];
      });

    // Update product quantity
    builder
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItem = action.payload.data;
      })
      .addCase(updateCartProduct.rejected, (state) => {
        state.isLoading = false;
        state.cartItem = [];
      });

    // Delete product from cart
    builder
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItem = action.payload.data;
      })
      .addCase(deleteCartProduct.rejected, (state) => {
        state.isLoading = false;
        state.cartItem = [];
      });
  },
});

export default shoppingCartSlice.reducer;
