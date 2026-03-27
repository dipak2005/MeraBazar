// SellerProducts.jsx
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../common/Form";
import Popup from "../../common/ProductPopup";
import ProductTile from "../../common/ProductTile";
import ImageUpload from "../../components/admin-view/ImageUpload";
import { addProductFormElements } from "../../config";
import { deleteProduct, fetchAllProduct } from "../../store/seller/ProductSlice";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function SellerProducts() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.sellerProduct);
  const { user } = useSelector((state) => state.auth);

  // Normalize sellerId
  const sellerId = user?._id || user?.id;

  // Fetch products on component mount or seller change
  useEffect(() => {
    if (sellerId) {
      dispatch(fetchAllProduct(sellerId));
    }
  }, [dispatch, sellerId]);

  // Submit handler
  const onSubmit = async (e) => {
    e.preventDefault();

    if (uploadedImageUrls.length === 0) {
      toast.error("Upload at least one image");
      return;
    }

    try {
      if (!sellerId) {
        toast.error("Seller ID missing. Please login again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/seller/products/add",
        {
          ...formData,
          price: Number(formData.price),
          salePrice: Number(formData.salePrice),
          totalStock: Number(formData.totalStock),
          images: uploadedImageUrls,
          sellerId,
        }
      );

      if (response?.data?.success) {
        toast.success("Product added successfully");
        setShowPopup(false);
        setFormData(initialFormData);
        setUploadedImageUrls([]);
        dispatch(fetchAllProduct(sellerId));
      }
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      toast.error("Something went wrong");
    }
  };

  // Delete handler
  const handleDeleteProduct = (productId) => {
    if (!sellerId) {
      toast.error("Seller ID missing. Cannot delete product.");
      return;
    }

    dispatch(deleteProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
        dispatch(fetchAllProduct(sellerId));
      }
    });
  };

  const isFormValid = () =>
    Object.keys(formData)
      .map((key) => formData[key] != "")
      .every(Boolean);

  return (
    <Fragment>
      {/* Add Product Button */}
      <div
        className="position-fixed"
        style={{ top: "4rem", right: "1rem", zIndex: 1050 }}
      >
        <button
          className="btn btn-primary shadow-sm"
          onClick={() => {
            setFormData(initialFormData);
            setUploadedImageUrls([]);
            setImageFiles([]);
            setCurrentEditedId(null);
            setShowPopup(true);
          }}
          style={{
            fontSize: "0.9rem",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            whiteSpace: "nowrap",
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Product List Grid */}
      <div className="container-fluid mt-5 px-3">
        <div className="row g-4">
          {productList && productList.length > 0 ? (
            productList.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-4 col-xl-3 mb-4"
              >
                <ProductTile
                  setFormData={setFormData}
                  setShowPopup={setShowPopup}
                  setCurrentEditedId={setCurrentEditedId}
                  product={product}
                  handleDeleteProduct={handleDeleteProduct}
                />
              </div>
            ))
          ) : (
            <p className="text-muted text-center w-100">No products found.</p>
          )}
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <Popup
          currentEditedId={currentEditedId}
          onClose={() => {
            setShowPopup(false);
            setCurrentEditedId(null);
            setFormData(initialFormData);
          }}
        >
          <ImageUpload
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            uploadedImageUrls={uploadedImageUrls}
            setUploadedImageUrls={setUploadedImageUrls}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />

          <div className="pt-4">
            <Form
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Update Product" : "Add Product"}
              onSubmit={onSubmit}
              // isBtnDisabled={!isFormValid()}
            />
          </div>
        </Popup>
      )}
    </Fragment>
  );
}

export default SellerProducts;