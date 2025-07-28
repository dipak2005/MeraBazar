import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, Navigate, useLocation } from "react-router-dom";
import { getSellerDetails } from "../store/admin/seller-listingSlice";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

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


  if (condition) {
    
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
