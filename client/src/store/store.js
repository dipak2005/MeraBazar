import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth-slice/index";
import adminProductSlice from "./admin/productSlice";

const store = configureStore({
  reducer: {
    // global reducer
    auth: authReducer,
    adminProduct: adminProductSlice,
  },
});

export default store;
