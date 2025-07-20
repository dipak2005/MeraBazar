import React from "react";
import SimpleNavbar from "../../../common/Navbar";
import AccountSidebar from "../../../components/shopping-view/AccountSidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import Footer from "../../../common/Footer";
import { Outlet } from "react-router-dom";

function ShoppingViewAccount() {
  return (
    <div className="d-flex flex-column min-vh-100 p-0 m-0">
     
      <div className=" w-100">
        <SimpleNavbar />
      </div>

     
      <main className="container my-3 flex-grow-1">
        <div className="row">
        
          <div className="col-md-3 mb-3">
            <AccountSidebar />
          </div>

        
          <div className="col-md-9">
            <div className="card shadow-sm p-3">
            <Outlet/>
            </div>
          </div>
        </div>
      </main>

     
      <Footer />
    </div>
  );
}

export default ShoppingViewAccount;
