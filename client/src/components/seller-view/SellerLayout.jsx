import React from "react";
import { Outlet } from "react-router-dom";
import SellerSideBar from "./SiderBar";
import SellerHeader from "./Header";
import { useSelector } from "react-redux";

function SellerLayout() {
   const {user} = useSelector((state)=>state.auth);

   console.log(user?.id,"hello");
   
  return (
      <div className="d-flex ">
      {/* admin sidebar */}
      <SellerSideBar  />
      <div
        className="d-flex flex-grow-1 flex-column lg-ml-50"
        style={{ marginLeft: window.innerWidth >= 992 ? "250px" : "0px",}}
      >
        {/* admin header */}
        <SellerHeader />
        <main className="d-flex flex-grow-1 p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SellerLayout;
