import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../auth-slice";
import { shoppingViewHeaderMenuItems } from "../../config";
import { Link, useNavigate } from "react-router-dom";

function ShoppingCategory() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  function handleNavigateToListingPage(getCurrentItem , section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]:[getCurrentItem.id]   // category : men like this

    }
    sessionStorage.setItem("filters",JSON.stringify(currentFilter));
    navigate(`/shop/listing`)
    console.log()
  }

  return  (
    <div className="px-3 mb-2">
    <div className="container-fluid bg-white py-3 shadow-sm border-bottom mt-2 ">
      <div className="d-flex flex-wrap justify-content-center gap-3 px-2 px-md-4">
        {shoppingViewHeaderMenuItems.map((item, index) => (
          <div
            key={index}
            className="text-center"
            style={{ width: 90, cursor: "pointer" }}
          >
            <Link 
            to={item?.path} 
            onClick={()=>handleNavigateToListingPage(item,"category")}
            >
              <div
                className="rounded p-2"
                // style={{ backgroundColor: "#f1e4fc" }}
              >
                <img
                  src={item?.icon}
                  alt={item.label}
                  className="img-fluid"
                  style={{ maxHeight: "60px", objectFit: "fill" }}
                />
              </div>
            </Link>
            <div className="mt-2 small fw-medium text-center">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
  ) ;
}

export default ShoppingCategory;
