import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashBoard from "./pages/admin-view/Dashboard";
import AdminFeatures from "./pages/admin-view/Features";
import AdminOrder from "./pages/admin-view/Orders";
import AdminProducts from "./pages/admin-view/Products";
import ShoppingLayout from "./components/shopping-view/Layout";
import NotFound from "./pages/not-found/Index";
import ShoppingViewHome from "./pages/shopping-view/Home";
import ShoppingViewAccount from "./pages/shopping-view/Account";
import ShoppingViewCheckout from "./pages/shopping-view/Checkout";
import ShoppingViewListings from "./pages/shopping-view/Listings";
import CheckAuth from "./common/CheckAuth";
import UnAuthPage from "./pages/UnAuthPage";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./auth-slice";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import axios from "axios";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="d-flex flex-column overflow-hidden bg-white">
      <Routes>
        {/* Auth */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          {/* Parent Route */}
          <Route path="login" element={<AuthLogin />} /> {/* child Route */}
          <Route path="register" element={<AuthRegister />} />
          {/* child Route */}
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
          <Route path="orders" element={<AdminOrder />} />
           <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shop */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingViewHome />} />
          <Route path="account" element={<ShoppingViewAccount />} />
          <Route path="checkout" element={<ShoppingViewCheckout />} />
          <Route path="listing" element={<ShoppingViewListings />} />
        </Route>

        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
