import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ImageGallery = ({ product }) => {
  const { cartItem } = useSelector((state) => state.shoppingcart);
  const dispatch = useDispatch();

  return (
    <div className=" col-lg-10">
      <div className="border p-3 bg-white text-center">
        <img
          src={product?.image}
          alt={product?.title}
          className="img-fluid"
          style={{ height: "350px", objectFit: "contain" }}
        />
      </div>
      <div className=" d-flex mt-3 ">
        <button
          className="btn  w-100 "
          style={{
            color: "white",
            backgroundColor: "#FF9F00",
            borderRadius: "0.2rem",
              fontSize: "1.1rem",
            fontWeight: "500",
          }}
        >
          ADD TO CART
        </button>{" "}
        &nbsp; &nbsp;
        <button
          className="btn  w-100"
          style={{
            backgroundColor: "#FB641B",
            color: "white",
             borderRadius: "0.2rem",
            fontSize: "1.1rem",
            fontWeight: "500",
          }}
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
