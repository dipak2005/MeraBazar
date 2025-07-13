import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const ImageGallery = ({ product }) => {

   const {cartItem} = useSelector((state)=>state.shoppingcart);
    const dispatch = useDispatch();


  return (
    <div className=" col-lg-12">
          <div className="border p-3 bg-white text-center">
            <img
              src={product?.image}
              alt={product?.title}
              className="img-fluid"
              style={{ height: "350px", objectFit: "contain" }}
            />
          </div>
          <div className=" d-flex mt-3 ">
              <button className="btn btn-outline-warning w-100 ">Add to Cart</button>  &nbsp;  &nbsp;
              <button className="btn btn-outline-danger w-100">Buy Now</button>
             
            </div>
        </div>
  );
};

export default ImageGallery;
