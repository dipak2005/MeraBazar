import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Camera, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult, resetSearchResults, searchProductsByImage } from "../store/shop/searchSlice";

const SimpleNavbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
    const handleImageClick = () => {
      fileInputRef.current.click();
    };

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
    }else{
      dispatch(resetSearchResults());
    }
  }, [keyword]);


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      // unwrap returns actual payload OR throws error
      const result = await dispatch(
        searchProductsByImage(formData)
      ).unwrap();
  
      
      // Simply navigate after success
      navigate("/shop/listing/image-search" , {
        state: { results: result.products },
      });
  
    } catch (error) {
      console.error("Image search failed:", error);
    }
  
    // reset input so same image can be selected again
    e.target.value = null;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2 px-3">
      <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between">
        
        <Link className="navbar-brand fw-bold text-primary me-3 fs-5" to="/">
          MeraBazar
        </Link>

        
        <div className="flex-grow-1 mx-2 my-2 my-lg-0" style={{ maxWidth: "800px" }}>
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
            <button
                  className="input-group-text bg-white"
                  onClick={handleImageClick}
                >
                  <Camera size={18} />
                </button>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
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
