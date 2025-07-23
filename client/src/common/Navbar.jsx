import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
import { Search, Store, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";

const SimpleNavbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const {searchResults} = useSelector((state)=>state.searchProduct);

  useEffect(() => {
    if (keyword && keyword.trim() != "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));

      },1000);
    }
  }, [keyword]);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          {/* <img
            src="/your-logo.png" // replace with your logo path
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top me-2"
          /> */}
          MeraBazar
        </Link>

        <div
          className="collapse navbar-collapse mt-2 mt-lg-0 col-lg-6"
          id="headerNavbar"
        >
          <div className="mx-auto vw-100 px-lg-3">
            <div className="input-group">
              <input
                type="text"
                value={keyword}
                name="keyword"
                onChange={event.target.value}
                className="form-control"
                placeholder="Search for products, brands and more "
              />
              <span className="input-group-text bg-white">
                <Search size={18} />
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 ms-lg-auto">
            {isAuthenticated ? (
              <div className="d-none d-md-flex align-items-center ">
                <h5 className="navbar-brand fw-bold text-primary btn align-items-center pt-1">
                  {(user?.username).toUpperCase()}
                </h5>
              </div>
            ) : (
              <Link to={"/auth/login"}>
                <div className="btn btn-outline-primary">
                  <b style={{ textDecoration: "none" }}>Login</b>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
