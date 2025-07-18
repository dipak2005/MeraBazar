 import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ListOrdered,
  ShoppingBasket,
} from "lucide-react";

const adminSidebarMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={18} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ListOrdered size={18} />,
  },
];


// MenuItem remains unchanged
function MenuItem() {
  const navigate = useNavigate();

  return (
    <ul className="nav flex-column">
      {adminSidebarMenu.map((item) => (
        <li key={item.id} className="nav-item">
          <div
            className="nav-link d-flex align-items-center text-secondary rounded px-3 py-2 mb-1"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(item.path);
             document.querySelector(".offcanvas.show .btn-close")?.click();
            }}
            onMouseEnter={(e) => e.currentTarget.classList.add("bg-light")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("bg-light")}
          >
            {item.icon}
            <span className="ms-2" style={{ color: "#323232" }}>
              {item.label}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function AdminSideBar({ isOpen}) {
  const navigate = useNavigate(); 

  return (
    <Fragment>
      {/* Desktop Sidebar */}
      <aside
       className={`bg-white border-end p-3 position-fixed top-0 start-0 h-100 ${
          isOpen ? "d-block" : "d-none"
        } d-lg-block`}
        style={{ width: "250px", zIndex: 1040 }}
      >
        <div className="d-flex align-items-center gap-2 mb-4">
          <ChartNoAxesCombined size={24} />
          <h5 className="mb-0">Admin Panel</h5>
        </div>
         <ul className="nav flex-column">
            {adminSidebarMenu.map((item) => (
              <li key={item.id} className="nav-item">
                <div
                  className="nav-link d-flex align-items-center text-secondary rounded px-3 py-2 mb-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(item.path); 
                    document.querySelector(".offcanvas.show .btn-close")?.click(); 
                  }}
                >
                  {item.icon}
                  <span className="ms-2">{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
      </aside>

      {/* Mobile Sidebar  */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">
            Admin Panel
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            {adminSidebarMenu.map((item) => (
              <li key={item.id} className="nav-item">
                <div
                  className="nav-link d-flex align-items-center text-secondary rounded px-3 py-2 mb-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(item.path); 
                    document.querySelector(".offcanvas.show .btn-close")?.click();  // for closing sidebar
                  }}
                >
                  {item.icon}
                  <span className="ms-2">{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminSideBar;