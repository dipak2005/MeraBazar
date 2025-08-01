import { Fragment, useEffect, useState } from "react";
import ProductTile from "../../common/ProductTile";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "../../store/seller/ProductSlice";
import Popup from "../../common/ProductPopup";
import ImageUpload from "../../components/admin-view/ImageUpload";
import Form from "../../common/Form";
import { addProductFormElements } from "../../config";
import { toast } from "react-toastify";

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
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.sellerProduct);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const {user} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit product");

          if (data?.payload?.success) {
            dispatch(fetchAllProduct(user?.id));
            setFormData(initialFormData);
            setShowPopup(false), setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
            sellerId:user?.id
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProduct(user?.id));
            setShowPopup(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast.success(data?.payload?.message);
          }
        });
  }

  function handleDeleteProduct(getCurrentProductId) {
    console.log(getCurrentProductId);

    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        dispatch(fetchAllProduct(user?.id));
      }
    });
  }
  console.log(user?.id);

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] != "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProduct(user?.id));
  }, [dispatch]);

  // console.log(formData, "productlist");

  return (
    <Fragment>
      <div
        className="position-fixed"
        style={{
          top: "4rem",
          right: "1rem",
          zIndex: 1050,
        }}
      >
        <button
          className="btn btn-primary shadow-sm"
          onClick={() => {
            setFormData(initialFormData);
            setUploadedImageUrl("");
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
            productList.map((productItem) => (
              <div
                key={productItem._id}
                className="col-12 col-sm-6 col-md-4 col-xl-3"
              >
                <ProductTile
                  setFormData={setFormData}
                  setShowPopup={setShowPopup}
                  setCurrentEditedId={setCurrentEditedId}
                  product={productItem}
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
            setShowPopup(false),
              setCurrentEditedId(null),
              setFormData(initialFormData);
          }}
        >
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
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
