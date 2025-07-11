import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {

  const location = useLocation();


  console.log(location.pathname,isAuthenticated);

  // if (location.pathname === "/") {
    
  //   if (!isAuthenticated) {
  //     return <Navigate to="/auth/login" />
  //   }else {
  //     if (user?.role === "admin") {
  //       return <Navigate to="/admin/dashboard" />
  //     }else {
  //       return <Navigate to="/shop/home" />
  //     }
  //   }
  // }

  if (
    !isAuthenticated &&
    !(
      location.pathname.startsWith("/auth/login") ||
      location.pathname.startsWith("/auth/register")
    )
  ) {
   return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (
    isAuthenticated &&
    (location.pathname.startsWith("/auth/login") ||
      location.pathname.startsWith("/auth/register"))
  ) {

  const redirectPath = location.state?.from?.pathname || 
  (user?.role === "admin" ? "/admin/dashboard" : "/shop/home");

    // if (
    //     user?.role ===  "admin"
    // ) {
    //     return <Navigate to="/admin/dashboard"/>
    // }else{
    //     return <Navigate to="/shop/home" />
    // }

    return <Navigate to={redirectPath} replace/>
  }

  if (isAuthenticated && user?.role !== "admin" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/unauth-page"/>
  }

  if (isAuthenticated && user?.role === "admin" && location.pathname.startsWith("/shop")) {
    return <Navigate to="/admin/dashboard" />
  }

  return <>{children}</>;
}

export default CheckAuth;
