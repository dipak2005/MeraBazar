import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListOrdered,
  ShoppingBasket,
  Store,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificSellerInfo } from "../../store/seller/UserSlice";

const SellerSidebarMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/seller/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/seller/products",
    icon: <ShoppingBasket size={18} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/seller/orders",
    icon: <ListOrdered size={18} />,
  },
];

function SellerSidebar({ isOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sellerdetail } = useSelector((state) => state.getUser);
  const [sellerInfo, setSellerInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      dispatch(getSpecificSellerInfo(user.email));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (sellerdetail) {
      setSellerInfo(sellerdetail);
    }
  }, [sellerdetail]);

  const isApproved = sellerInfo?.sellerinfo?.isapproved ?? false;

  // Menu item renderer
  const renderMenuItems = (isApproved) => {
    return SellerSidebarMenu.map((item) => (
      <li key={item.id} className="nav-item">
        <div
          className="nav-link d-flex align-items-center text-secondary rounded px-3 py-2 mb-1"
          style={{
            cursor: isApproved ? "pointer" : "not-allowed",
            pointerEvents: isApproved ? "auto" : "none",
            opacity: isApproved ? 1 : 0.5,
            backgroundColor: isApproved ? "" : "#f8f9fa",
          }}
          title={!isApproved ? "Access restricted until admin approval" : ""}
          onClick={() => {
            navigate(item.path);
            document.querySelector(".offcanvas.show .btn-close")?.click();
          }}
        >
          {item.icon}
          <span className="ms-2">{item.label}</span>
        </div>
      </li>
    ));
  };

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
          <Store size={24} />
          <h5 className="mb-0">Business Panel</h5>
        </div>
        <ul className="nav flex-column">
          {renderMenuItems(isApproved)}
        </ul>
      </aside>

      {/* Mobile Sidebar (Offcanvas) */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">
            Business Panel
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">{renderMenuItems(isApproved)}</ul>
        </div>
      </div>
    </Fragment>
  );
}

export default SellerSidebar;
