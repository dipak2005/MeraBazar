import { useEffect, useState } from "react";
import ImageUpload from "../../components/admin-view/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addBannerImages,
  deleteBannerImages,
  getBannerImages,
} from "../../../src/store/common/bannerSlice";
import { toast } from "react-toastify";

function Banner() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { bannerImageList } = useSelector((state) => state.commonBanner);
  const dispatch = useDispatch();

  function handleUploadBannerImage(params) {
    dispatch(addBannerImages(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Banner uploaded successfully!");
      } else {
        toast.error("Upload failed!");
      }
    });
  }

  function handleDeleteBannerImage(getid) {
    dispatch(deleteBannerImages(getid)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Banner deleted successfully!");
        dispatch(getBannerImages());
      } else {
        toast.error("Error!");
      }
    });
  }

  useEffect(() => {
   dispatch(getBannerImages());
  }, [dispatch]);

  useEffect(() => {
    console.log(bannerImageList, "updated banner list");
  }, [bannerImageList]);

  return (
    <div className="container my-1">
      <h1 className="justify-content-center ">Upload Banner Images</h1>
      <div className="w-full justify-content-center ">
        <ImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
        />
      </div>
      <button
        onClick={handleUploadBannerImage} disabled={uploadedImageUrl === ""}
        className="btn btn-outline-primary w-full"
      >
        Upload Banner
      </button>
      <div className="container mt-4">
        <div className="d-flex flex-wrap gap-3">
          {bannerImageList.map((item, idx) => (
            <div key={idx}>
              <img
                className="w-75 rounded-3"
                key={idx}
                src={item?.image}
                alt="Banner"
                // style={{ width: "200px", borderRadius: "8px" }}
              />{" "}
              &nbsp; &nbsp; &nbsp;{" "}
              <button 
                onClick={() => handleDeleteBannerImage(item?._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
