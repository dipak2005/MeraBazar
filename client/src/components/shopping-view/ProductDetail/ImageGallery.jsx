import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartProduct } from "../../../store/shop/cartSlice";

const ImageGallery = ({ product, toast, handleWishlistToggle, user, wishList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [animate, setAnimate] = useState(false);

  const { cartItem } = useSelector((state) => state.shoppingcart);
  const isInWishList = wishList?.some((item) => item.productId === product?._id);

  // IMAGE ARRAY: first image fallback
  const images =
    product?.images && product.images.length > 0
      ? product.images
      : product?.image
      ? [product.image]
      : [];

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [product]);

  // ADD TO CART
  const handleAddToCart = (productId, goToStep, discount) => {
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
        toast.success("Product added Successfully!");
        dispatch(fetchCartProduct({ userId: user?.id }));

        if (goToStep === 1) navigate("/shop/cart");
        if (goToStep === 2) navigate("/shop/checkout");
      }
    });
  };

  // WISHLIST
  const handleHeartClick = () => {
    handleWishlistToggle(product._id);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="col-lg-12">
      <div className="d-flex">
        {/* THUMBNAILS */}
        <div className="d-flex flex-column me-3">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                cursor: "pointer",
                border: selectedImage === img ? "2px solid #2874f0" : "1px solid #ddd",
                marginBottom: "10px",
                padding: "5px",
                background: "#fff",
              }}
            />
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div
          className="border p-3 bg-white text-center position-relative flex-grow-1"
          style={{ minHeight: "400px" }}
        >
          {/* STOCK BADGES */}
          {product?.totalStock === 0 ? (
            <span className="badge bg-danger position-absolute top-0 start-0 m-2">
              Out of Stock
            </span>
          ) : product?.totalStock < 10 ? (
            <span className="badge bg-warning position-absolute top-0 start-0 m-2">
              Only {product?.totalStock} items left
            </span>
          ) : product?.salePrice > 500 ? (
            <span className="badge bg-success position-absolute top-0 start-0 m-2">
              Best Seller
            </span>
          ) : null}

          {/* WISHLIST ICON */}
          <div
            className={`heart-icon-wrapper ${animate ? "pop-animation" : ""}`}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              zIndex: 10,
            }}
            onClick={handleHeartClick}
          >
            {isInWishList ? (
              <AiFillHeart size={24} color="red" />
            ) : (
              <AiOutlineHeart size={24} color="gray" />
            )}
          </div>

          {/* MAIN IMAGE */}
          <img
            src={selectedImage || "https://via.placeholder.com/400"}
            alt={product?.title}
            className="img-fluid"
            style={{ height: "400px", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="d-flex mt-3 gap-2">
        <button
          onClick={() => handleAddToCart(product?._id, 1, product?.discount)}
          className="btn w-100"
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

        <button
          onClick={() => handleAddToCart(product?._id, 2, product?.discount)}
          className="btn w-100"
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