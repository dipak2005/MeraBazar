import { Fragment, useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Popup from "../../components/admin-view/ProductPopup";
import Form from "../../common/Form";
import { addProductFormElements } from "../../config";
import ImageUpload from "../../components/admin-view/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, fetchAllProduct } from "../../store/admin/productSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import AdminProductTile from "./ProductTile";

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

function AdminProducts() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProduct);
  const [currentEditedId , setCurrentEditedId] = useState(null);
  const dispatch = useDispatch(); 

  function onSubmit(event) {
    event.preventDefault();
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      console.log(data);

      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
        setImageFile(null);
        setFormData(initialFormData);
        toast.success(data?.payload?.message);
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);
  console.log(productList, "productlist");

  return (
    <Fragment>
      <div className="position-fixed top-1 end-0 p-3 z-3">
        <button
          className="btn btn-primary me-md-2"
          onClick={() => setShowPopup(true)}
        >
          Add New Product
        </button>
      </div>
      <div className="row g-4">
        {productList && productList.length > 0 ? (
          productList.map(
            (productItem) => (
              console.log("Rendering item:", productItem),
              (
                <div
                  key={productItem._id}
                  className=" col-sm-3 col-md-4 col-lg-6"
                >
                  <AdminProductTile setFormData={setFormData} setShowPopup={setShowPopup} setCurrentEditedId={setCurrentEditedId} product={productItem} />
                </div>
              )
            )
          )
        ) : (
          <p className="text-muted">No products found.</p>
        )}
      </div>

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />

          <div className="py-6">
            <Form
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText=" Add Product"
              onSubmit={onSubmit}
            ></Form>
          </div>
        </Popup>
      )}
    </Fragment>
  );
}

export default AdminProducts;
