import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, Navigate, useLocation, useNavigate } from "react-router-dom";
import { getSellerDetails } from "../store/admin/seller-listingSlice";
import { getSpecificSellerInfo } from "../store/seller/UserSlice";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const { sellerdetail } = useSelector((state) => state.getUser);
    const [sellerInfo, setSellerInfo] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user?.email) {
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
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (user?.role === "seller") {
      return <Navigate to="/seller/dashboard" />;
    }

    return children;
  }

  const publlicPaths = ["/", "/listing", "/cart"];
  const isPublic =
    publlicPaths.some((path) => location.pathname.startsWith(path)) ||
    location.pathname.startsWith("/shop");

  if (!isAuthenticated && isPublic) {
    return children;
  }

  // Redirect unauthenticated access to login
  if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

   
     if (!isApproved && location.pathname.startsWith("/seller/dashboard")) {
        return <Navigate to={"/seller/pending"} />
     }else if (!isApproved && location.pathname.startsWith("/seller/orders")) {
        return <Navigate to={"/seller/pending"} />
     } else if (!isApproved && location.pathname.startsWith("/seller/products")) {
        return <Navigate to={"/seller/pending"} />
     } 
    //  else {
      // return <Navigate to={"/seller/dashboard"} />
    //  }
  


  // Redirect authenticated users away from login/register #Rasta Clear hai
  if (
    isAuthenticated &&
    // (location.pathname.startsWith("/auth/login") ||
    location.pathname.startsWith("/auth/register")
  ) {
    const redirectPath =
      location.state?.from?.pathname ||
      (user?.role === "admin"
        ? "/admin/dashboard"
        : user?.role === "seller"
        ? "/seller/dashboard"
        : "/");
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

  // Block unauthorized seller access
  if (
    isAuthenticated &&
    user?.role !== "seller" &&
    location.pathname.startsWith("/seller")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Block admin from accessing customer/shop area
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
