import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import { checkAuth, setUserFromStorage } from "./auth-slice";
import CheckAuth from "./common/CheckAuth";
import AdminLayout from "./components/admin-view/Layout";
import AuthLayout from "./components/auth/AuthLayout";
import SellerLayout from "./components/seller-view/SellerLayout";
import ShoppingLayout from "./components/shopping-view/Layout";
import CartPage from "./components/shopping-view/ProductDetail/CartPage";
import ProductDetailPage from "./components/shopping-view/ProductDetail/ProductDetails";
import "./index.css";
import Banner from "./pages/admin-view/Banner";
import AdminDashBoard from "./pages/admin-view/Dashboard";
import AdminProducts from "./pages/admin-view/Products";
import SellerListing from "./pages/admin-view/SellerListing";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import SellerRegistration from "./pages/auth/SellerRegister";
import NotFound from "./pages/not-found/Index";
import SellerDashboard from "./pages/seller-view/Dashboard";
import SellerOrder from "./pages/seller-view/Orders";
import PendingApproval from "./pages/seller-view/PendingApproval";
import SellerProduct from "./pages/seller-view/Product";
import ShoppingViewAccount from "./pages/shopping-view/Account/Account";
import ManageAddress from "./pages/shopping-view/Account/Address";
import Orders from "./pages/shopping-view/Account/Orders";
import Profile from "./pages/shopping-view/Account/Profile";
import Settings from "./pages/shopping-view/Account/Settings";
import Wishlist from "./pages/shopping-view/Account/Whishlist";
import ShoppingViewCheckout from "./pages/shopping-view/Checkout";
import ShoppingViewHome from "./pages/shopping-view/Home";
import ImageSearchPage from "./pages/shopping-view/ImageSearch";
import ShoppingViewListings from "./pages/shopping-view/Listings";
import PaymentCancelled from "./pages/shopping-view/Payment-Cancel";
import PaymentSuccess from "./pages/shopping-view/Payment-Success";
import PaypalRetunPage from "./pages/shopping-view/Paypal-Return";
import SearchPage from "./pages/shopping-view/Search";
import UnAuthPage from "./pages/UnAuthPage";
import { fetchCartProduct } from "./store/shop/cartSlice";

function App() {
  const { user, isAuthenticated, authChecked } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCartProduct({ userId: user._id }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(setUserFromStorage());
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      {!authChecked ? null : (
        <div className="d-flex flex-column overflow-hidden bg-white">
          <Routes>
            {/* Auth */} {/* Parent Route */}
            <Route
              path="/auth"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AuthLayout key={window.location.search} />
                </CheckAuth>
              }
            >
              {/* child Route */}
              <Route path="login" element={<AuthLogin />} />
              <Route path="register" element={<AuthRegister />} />
              <Route path="register-seller" element={<SellerRegistration />} />
            </Route>
            {/* Admin */}
            <Route
              path="/admin"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AdminLayout />
                </CheckAuth>
              }
            >
              <Route path="dashboard" element={<AdminDashBoard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="seller-listing" element={<SellerListing />} />
              <Route path="banner" element={<Banner />} />
            </Route>
            {/* Seller */}
            <Route
              path="/seller"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <SellerLayout />
                </CheckAuth>
              }
            >
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<SellerDashboard />} />
              <Route path="products" element={<SellerProduct />} />
              <Route path="orders" element={<SellerOrder />} />
              <Route path="pending" element={<PendingApproval/>}/>

            </Route>

            {/* Shop */}
            {/* HomePage for Customers */}
            <Route
              path="/"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <ShoppingViewHome />
                </CheckAuth>
              }
            />
            <Route
              path="/shop"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <ShoppingLayout />
                </CheckAuth>
              }
            >
              <Route path="listing" element={<ShoppingViewListings />} />
            </Route>
            <Route path="/shop/paypal-return" element={<PaypalRetunPage />} />
            <Route
              path="/shop/payment-success/:orderId"
              element={<PaymentSuccess />}
            />
            <Route path="/shop/paypal-cancel" element={<PaymentCancelled />} />
            <Route path="/shop/account" element={<ShoppingViewAccount />}>
              <Route index element={<Navigate to={"profile"} />} />
              <Route path="profile" element={<Profile toast={toast} />} />
              <Route path="address" element={<ManageAddress />} />
              <Route path="orders" element={<Orders />} />
              <Route path="wishlist" element={<Wishlist />} />
              {/* <Route path="settings" element={<Settings />} /> */}
              <Route path="logout" element={<Settings />} />
            </Route>
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/shop/cart" element={<CartPage />} />
            <Route path="/shop/checkout" element={<ShoppingViewCheckout />} />
            <Route path="/shop/listing/search" element={<SearchPage />} />
            <Route path="/shop/listing/image-search" element={<ImageSearchPage />} />
            <Route path="/unauth-page" element={<UnAuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      )}
    </>
  );
}

export default App;
