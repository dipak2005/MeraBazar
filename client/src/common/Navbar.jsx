import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Camera, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult, resetSearchResults } from "../store/shop/searchSlice";

const SimpleNavbar = ({ fileInputRef, handleImageSelect, searchResults }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const initialKeyword = searchParams.get("keyword") || "";
    setKeyword(initialKeyword);
  }, []);

  useEffect(() => {
    if (keyword && keyword.trim().length > 3) {
      const timer = setTimeout(() => {
        setSearchParams({ keyword });
        dispatch(getSearchResult(keyword));
      }, 500);

      return () => clearTimeout(timer);
    } else {
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2 px-3">
      <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between">
        <Link className="navbar-brand fw-bold text-primary me-3 fs-5" to="/">
          MeraBazar
        </Link>

        <div
          className="flex-grow-1 mx-2 my-2 my-lg-0"
          style={{ maxWidth: "800px" }}
        >
          <div className="input-group">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="form-control"
              placeholder="Search for products, brands and more"
            />
            <span className="input-group-text bg-white">
              <Search size={18} />
            </span>
            <span className="input-group-text bg-white">
              <button
                type="button"
                style={{ border: "none", background: "transparent" }}
                onClick={() => fileInputRef.current.click()}
              >
                {imageLoading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <Camera size={20} />
                )}
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageSelect}
              />
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center mt-2 mt-lg-0">
          {isAuthenticated ? (
            <span className="fw-bold text-primary text-uppercase px-2">
              {user?.username}
            </span>
          ) : (
            <Link to="/auth/login" className="btn btn-outline-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
