import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

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

  if (
    !isAuthenticated &&
    (location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/seller"))
  ) {
    return <Navigate to="/auth/login" />;
  }

  // if (!isAuthenticated && location.pathname.startsWith("/auth/register")) {
  //   return <Navigate to={"/auth/register/roll=seller"}/>;
  // }
  if (location.pathname === "/") {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }

    if (user?.role === "seller") {
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

  // Redirect authenticated users away from login/register #Rasta Clear hai
  if (
    isAuthenticated &&
    (location.pathname.startsWith("/auth/login") ||
      location.pathname.startsWith("/auth/register"))
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
