import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth-slice/index";
import adminProductSlice from "./admin/productSlice";
import sellerProductslice from "./seller/ProductSlice";
import shopProductSlice from "./shop/productSlice";
import shoppingCartSlice from "./shop/cartSlice";

const store = configureStore({
  reducer: {
    // global reducer
    auth: authReducer,
    adminProduct: adminProductSlice,
    sellerProduct:sellerProductslice,
    shopProduct: shopProductSlice,
    shoppingcart:shoppingCartSlice,

  },
});

export default store;
