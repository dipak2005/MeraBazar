import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, fetchCartProduct } from "../../../store/shop/cartSlice";

const ImageGallery = ({ product, toast }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItem } = useSelector((state) => state.shoppingcart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleAddToCart(productId, goToStep, discount) {
    console.log("User object:", user);

    if (!user || !(user._id || user.id)) {
      toast?.error("Please login to continue.");
      navigate("/auth/login");
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
        discount,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        console.log("Cart add response:", data);
        toast.success("Product added Successfully!");
        dispatch(fetchCartProduct({ userId: user?.id }));

        if (goToStep === 1) {
          navigate("/shop/cart");
        } else if (goToStep === 2) {
          navigate("/shop/checkout");
        }
        console.log("Trying to add to cart with:", {
          userId: user?.id,
          productId,
          quantity: 1,
          discount,
        });
      }
    });
  }

  return (
    <div
      className=" col-lg-10"
      style={{ position: "relative", display: "inline-block", width: "100%" }}
    >
      <div className="border p-3 bg-white text-center">
        {product?.totalStock > 0 && product?.totalStock < 10 && (
          <span
            className="badge bg-danger text-white"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 10,
              padding: "0.5rem",
              // fontSize: "0.9rem",
            }}
          >
            Only {product?.totalStock} items left
          </span>
        )}
        <img
          src={product?.image}
          alt={product?.title}
          className="img-fluid"
          style={{ height: "350px", objectFit: "contain" }}
        />
      </div>
      <div className=" d-flex mt-3 ">
        <button
          onClick={() => handleAddToCart(product?._id, 1, product?.discount)}
          className="btn  w-100 "
          style={{
            color: "white",
            backgroundColor: "#FF9F00",
            borderRadius: "0.2rem",
            fontSize: "1.1rem",
            fontWeight: "500",
          }}
          disabled={product?.totalStock === 0}
        >
          ADD TO CART
        </button>
        &nbsp; &nbsp;
        <button
          onClick={() => handleAddToCart(product?._id, 2, product?.discount)}
          className="btn  w-100"
          style={{
            backgroundColor: "#FB641B",
            color: "white",
            borderRadius: "0.2rem",
            fontSize: "1.1rem",
            fontWeight: "500",
          }}
          disabled={product?.totalStock === 0}
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
