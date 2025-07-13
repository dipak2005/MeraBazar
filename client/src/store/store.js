import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth-slice/index";
import adminProductSlice from "./admin/productSlice";
import shopProductSlice from "./shop/productSlice";
import shoppingCartSlice from "./shop/cartSlice";

const store = configureStore({
  reducer: {
    // global reducer
    auth: authReducer,
    adminProduct: adminProductSlice,
    shopProduct: shopProductSlice,
    shoppingcart:shoppingCartSlice,
  },
});

export default store;
