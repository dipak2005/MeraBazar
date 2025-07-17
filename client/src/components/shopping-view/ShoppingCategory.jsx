import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../auth-slice";
import { shoppingViewHeaderMenuItems } from "../../config";
import { Link } from "react-router-dom";

function ShoppingCategory() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return  (
    <div className="px-3 mb-2">
    <div className="container-fluid bg-white py-3 shadow-sm border-bottom mt-2 ">
      <div className="d-flex flex-wrap justify-content-around gap-3 px-2 px-md-4">
        {shoppingViewHeaderMenuItems.map((item, index) => (
          <div
            key={index}
            className="text-center"
            style={{ width: 80, cursor: "pointer" }}
          >
            <Link to={item?.path}>
              <div
                className="rounded p-2"
                style={{ backgroundColor: "#f1e4fc" }}
              >
                <img
                  src={item?.icon}
                  alt={item.label}
                  className="img-fluid"
                  style={{ maxHeight: "50px", objectFit: "fill" }}
                />
              </div>{" "}
            </Link>
            <div className="mt-2 small fw-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
  ) ;
}

export default ShoppingCategory;
