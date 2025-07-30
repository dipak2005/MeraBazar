import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getSpecificSellerInfo } from "../store/seller/UserSlice";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const { sellerdetail } = useSelector((state) => state.getUser);
  const [sellerInfo, setSellerInfo] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.email && user?.role === "seller") {
      dispatch(getSpecificSellerInfo(user.email));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (sellerdetail) {
      setSellerInfo(sellerdetail);
    }
  }, [sellerdetail]);

  const isApproved = sellerInfo?.sellerinfo?.isapproved;

  if (
    !isAuthenticated &&
    (location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/seller"))
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (location.pathname === "/") {
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    if (user?.role === "seller") return <Navigate to="/seller/dashboard" />;
    return children;
  }

  const publicPaths = ["/", "/listing", "/cart"];
  const isPublic =
    publicPaths.some((path) => location.pathname.startsWith(path)) ||
    location.pathname.startsWith("/shop");

  if (!isAuthenticated && isPublic) return children;

  if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  //  Block unapproved sellers from accessing seller routes
  if (
    user?.role === "seller" &&
    sellerInfo !== null &&
    !isApproved &&
    location.pathname.startsWith("/seller") &&
    !location.pathname.startsWith("/seller/pending")
  ) {
    return <Navigate to="/seller/pending" />;
  }

  // Redirect authenticated users from /register to their dashboard
  if (
    isAuthenticated &&
    location.pathname.startsWith("/auth/register")
  ) {
    const redirectPath =
      location.state?.from?.pathname ||
      (user?.role === "admin"
        ? "/admin/dashboard"
        : user?.role === "seller"
        ? "/seller/dashboard"
        : "/auth/login");
    return <Navigate to={redirectPath} replace />;
  }

  // Block unauthorized admin access
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  //Block unauthorized seller access
  if (
    isAuthenticated &&
    user?.role !== "seller" &&
    location.pathname.startsWith("/seller")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  //Block admin from accessing shop area
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.startsWith("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
}

export default CheckAuth;
