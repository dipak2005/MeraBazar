import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, Navigate, useLocation } from "react-router-dom";
import { getSellerDetails } from "../store/admin/seller-listingSlice";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const { seller } = useSelector((state) => state.sellerAuth);
  const dispatch = useDispatch();
  const [isApproved, setIsApproved] = useState("null");
   const { sellerList, sellerDetails } = useSelector(
    (state) => state.sellerListing
  );
  // Protect root path ("/") — redirect based on role

  // if (location.pathname === "/") {
  //   if (!isAuthenticated) {
  //     return <Navigate to="/auth/login" />;
  //   } else {
  //     if (user?.role === "admin") {
  //       return <Navigate to="/admin/dashboard" />;
  //     } else if (user?.role === "seller") {
  //       return <Navigate to="/seller/dashboard" />;
  //     } else if (user?.role === "user") {
  //       return children;
  //     }
  //     else {

  //     }
  //   }
  // }
  useEffect(() => {
    dispatch(getSellerDetails((seller?._id))).then((data) => {
      console.log(data);

      const isApproved = data?.payload?.data?.isapproved;

      setIsApproved(isApproved);
    });
  }, [dispatch, seller?._id]);

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
    }

    if (user?.role === "seller") {
      if (isApproved) {
        return <Navigate to="/seller/dashboard" />;
      } else {
        return <Navigate to="/seller/pending" />;
      }
    }

    return children;
  }

  // if (!isApproved && location.pathname.includes("dashboard")) {
  //   return <Navigate to="/seller/pending" />;
  // }

  // if (isApproved && location.pathname.includes("pending")) {
  //    return <Navigate to="/seller/dashboard" />;
  // }

  // if (!isApproved && location.pathname.includes("admin")) {
  //   return <Navigate to="/auth/login" />;
  // }


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

  // Redirect authenticated users away from login/register #Rasta Clear hai
  if (
    isAuthenticated &&
    // (location.pathname.startsWith("/auth/login") ||
      location.pathname.startsWith("/auth/register"))
   {
    const redirectPath =
      location.state?.from?.pathname ||
      (user?.role === "admin"
        ? "/admin/dashboard"
        : user?.role === "seller"
        ? isApproved
          ? "/seller/dashboard"
          : "/seller/pending"
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
