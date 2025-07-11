import { Outlet } from "react-router-dom";
import "./css/layout.css";
function AuthLayout() {
  return (
    <div className="container-fuild px-0">
      <div className="row  vh-100 vw-100">
        <div className="col-6 bg-black  text-white d-flex align-items-center justify-content-center ">
          <h1 className="text-center text-white w-100 align-middle">
            Welcome to Ecommerce <br /> Shopping
          </h1>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-center flex-grow-1 px-3 py-5 px-sm-4 px-lg-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
