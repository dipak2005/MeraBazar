import { Outlet, useSearchParams } from "react-router-dom";
import "./css/layout.css";

function AuthLayout() {
 

  return (
    <div className="container-fluid px-0">
      <div className={`row vw-100 vh-100  `}>
        {/* Left Side */}
        <div className="col-12 col-lg-6 bg-black text-white d-flex align-items-center justify-content-center py-5">
          <h1 className="text-center w-100">
            Welcome to Ecommerce <br />
            <span className="fw-bold"> Shopping</span>
          </h1>
        </div>

        {/* Right Side */}
        <div
          className={`col-12 col-lg-6 d-flex justify-content-center 
          "align-items-center"
          `}
         
        >
          <Outlet />
        </div>
      </div>
      
    </div>
  );
}

export default AuthLayout;
