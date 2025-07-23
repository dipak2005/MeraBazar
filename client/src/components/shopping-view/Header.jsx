import {
  Search,
  ShoppingCart,
  ChevronDown,
  Menu,
  CircleUserRound,
  Settings,
  LogOut,
  LogOutIcon,
  Store,
} from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../auth-slice";
import { useState } from "react";

function HeaderRightContent({ toast }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logOutUser());
    toast.success("logged out successful!");
  }

  return (
    <div className="d-flex flex-row flex-lg-column align-items-lg-center justify-content-between justify-content-lg-start gap-3 w-100">
      <div className="dropdown">
        <button
          className="btn btn-primary rounded-circle dropdown-toggle no-caret d-flex align-items-center justify-content-center"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            width: "40px",
            fontWeight: "bold",
            fontSize: "1rem",
            alignItems: "center",
            textTransform: "uppercase",
          }}
        >
          {user?.username[0].toUpperCase()}
        </button>

        <ul
          className="dropdown-menu dropdown-menu-md-start dropdown-menu-none-center dropdown-menu-md-end"
          aria-labelledby="dropdownMenuButton1"
        >
          <li className="dropdown-item " style={{ cursor: "default" }}>
            Logged in as <b> {user?.username}</b>
          </li>
          <li>
            <Link to={"/shop/account/profile"} className="dropdown-item ">
              <CircleUserRound />
              &nbsp; Profile
            </Link>
          </li>
          <li>
            <Link to="/shop/account/settings" className="dropdown-item">
              <Settings />
              &nbsp; Settings
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="dropdown-item">
              <LogOut /> &nbsp; Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ShoppingHeader({ toast, search }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItem } = useSelector((state) => state.shoppingcart);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    // e.preventDefault();
    if (query.trim() != "") {
      navigate(
        `/shop/listing/search?keyword=${encodeURIComponent(query.trim())}`
      );
      setQuery("");
    }
  };

  return (
    <header className="sticky-top bg-white shadow-sm border-bottom">
      <nav className="navbar navbar-expand-lg px-3 px-md-4 py-2">
        <div className="container-fluid">
          {/* Logo */}
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center text-decoration-none"
          >
            <span className="fw-bold text-primary fs-4">MeraBazar</span>
            {/* <small
              className="text-muted ms-1 d-none d-md-inline"
              style={{ fontSize: "0.75rem" }}
            >
              Explore <span className="text-warning">great</span>
            </small> */}
          </Link>

          {/* Toggle for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#headerNavbar"
            aria-controls="headerNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <Menu size={20} />
          </button>

          {/* Navbar Content */}
          <div
            className="collapse navbar-collapse mt-2 mt-lg-0 col-lg-6"
            id="headerNavbar"
          >
            {/* Search Bar */}
            <div className="mx-auto w-100 px-2  px-md-3">
              <div className="input-group">
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  className="form-control"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      //   // e.preventDefault();
                      handleSearch();
                    }
                  }}
                  placeholder="Search for products, brands and more"
                />
                <button
                  className="input-group-text bg-white"
                  onClick={handleSearch}
                >
                  <Search size={18} />
                </button>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 ms-lg-auto">
              <Link
                to={"/auth/register"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  className="d-none d-md-flex align-items-center "
                  style={{ width: "140px" }}
                >
                  <Store /> Become a Seller
                </div>
              </Link>

              <Link
                to={`/shop/cart`}
                className="text-decoration-none text-dark d-flex align-items-center position-relative"
              >
                <ShoppingCart className="me-1" size={20} />
                {cartItem.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItem.length}
                  </span>
                )}
                <span className="ms-2">Cart</span>
              </Link>

              {isAuthenticated ? (
                <HeaderRightContent toast={toast} />
              ) : (
                <Link to={"/auth/login"}>
                  <div className=" btn btn-outline-primary">
                    <b style={{ textDecoration: "none" }}>Login</b>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default ShoppingHeader;
