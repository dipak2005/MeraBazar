import React from "react";

function ProductTile({
  product,
  setFormData,
  setShowPopup,
  setCurrentEditedId,
  handleDeleteProduct,
  children
}) {
  return (
    <div className="card border-0 w-100 mx-2">
      <div className="image-wrapper ">
        <img
          src={product?.image}
          alt={product?.title}
          className="card-img-top hover-zoom"
          style={{ height: "200px", width: "100%", objectFit: "contain" }}
        />
      </div>
      <div className="card-body px-2 py-3">
        <h6 className="card-title mb-1 text-truncate">{product?.title}</h6>
        <p className="text-muted small mb-2">{product?.brand}</p>
        <div className="d-flex align-items-center">
          <span className="text-primary fw-semibold me-2">
            ₹ {product?.salePrice}
          </span>
          {product?.salePrice !== product?.price && (
            <>
              <small className="text-muted text-decoration-line-through">
                ₹ {product?.price}
              </small>
              <small className="ms-auto text-success fw-semibold">
                {product?.discount}% off
              </small>
            </>
          )}
        </div>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => {
              setCurrentEditedId(product?._id),
                setFormData(product),
                setShowPopup(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDeleteProduct(product?._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductTile;
