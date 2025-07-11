import { Outlet } from "react-router-dom";
import AdminSideBar from "./SideBar";
import AdminHeader from "./Header";
import { useState } from "react";
function AdminLayout() {
  const [sidebarOpen,setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  return (
    <div className="d-flex ">
      {/* admin sidebar */}
      <AdminSideBar isOpen={sidebarOpen} />
      <div
        className="d-flex flex-grow-1 flex-column lg-ml-50"
        style={{ marginLeft: window.innerWidth >= 992 ? "250px" : "0px",}}
      >
        {/* admin header */}
        <AdminHeader />
        <main className="d-flex flex-grow-1 p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
