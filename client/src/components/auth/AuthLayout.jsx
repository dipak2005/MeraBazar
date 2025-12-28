import { Outlet, useLocation } from "react-router-dom";
import "./css/layout.css";

function AuthLayout() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
    const role = params.get("role"); 

  return (
    <div className="container-fluid px-0">
      <div className="row g-0 min-vh-100">
        
        <div className="d-none d-lg-flex col-lg-6 bg-custom-blue text-white align-items-center justify-content-center">
          <div className="text-center px-4">
            <h1 className="display-4 mb-0 " >
              {role === "user" ? "Welcome to Mera" : "Welcome to Mera"}
              <br />
              <span className="fw-bold ">
                {role === "user" ? "Shopping Mart" : "Marketplace"}
              </span>
            </h1>
          </div>
        </div>

       
        <div className="col-12 col-lg-6 bg-light d-flex flex-column justify-content-center align-items-center">
          
          <div className="d-lg-none text-center mb-4 px-3 " >
            <h2 >{role === "seller" ? "Welcome Seller!" : "Welcome!"}</h2>
            <p className="small" >
              {role === "user"
                ? "Sign in or register to start shopping."
                : "Register to start selling MeraBazar"}
            </p>
          </div>

          
          <div className="w-100 px-3" style={{ maxWidth: "500px" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
