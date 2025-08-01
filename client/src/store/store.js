import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth-slice/index";
import adminProductSlice from "./admin/productSlice";
import sellerProductslice from "./seller/ProductSlice";
import sellerOrderSlice from "./seller/OrderSlice";
import shopProductSlice from "./shop/productSlice";
import shoppingCartSlice from "./shop/cartSlice";
import userAddressSclice from "./shop/addressSlice";
import userOrderSlice from "./shop/orderSlice";
import getUserByIdSlice from "./seller/UserSlice";
import searchSlice from "./shop/searchSlice";
import reviewSlice from "./shop/reviewSlice";
import sellerSlice from "../auth-slice/sellerSlice";
import sellerListingSlice from "./admin/seller-listingSlice";
import commonSlice from "./common/bannerSlice";
import wishlistSlice from "./shop/wishlistSlice";


const store = configureStore({
  reducer: {
    // global reducer
    auth: authReducer,
    adminProduct: adminProductSlice,
    sellerProduct: sellerProductslice,
    shopProduct: shopProductSlice,
    shoppingcart: shoppingCartSlice,
    userAddress: userAddressSclice,
    userOrder:userOrderSlice,
    sellerOrder:sellerOrderSlice,
    getUser:getUserByIdSlice,
    searchProduct:searchSlice,
    reviewProduct:reviewSlice,
    sellerAuth:sellerSlice,
    sellerListing:sellerListingSlice,
    commonBanner:commonSlice,
    userWishList:wishlistSlice,
  },
});

export default store;
