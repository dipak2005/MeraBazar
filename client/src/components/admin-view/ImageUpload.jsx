
import React, { useEffect, useRef } from "react";
import { CloudUpload, XIcon, FileText } from "lucide-react";
import axios from "axios";
import SkeletonCard from "../../common/ProductSkeleton";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
function ImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadedImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${API_BASE_URL}/api/admin/products/upload-image`,
      data
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
    }
    setImageLoadingState(false);
  }

  useEffect(() => {
    if (imageFile != null) {
      uploadedImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full max-width-md mx-auto">
      <label htmlFor="image-upload" className="text-lg fw-bold mb-2 d-block form-label">
        Upload Image
      </label>
      <div
        style={{ opacity: isEditMode ? "60" : "" }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed p-3 rounded"
      >
        <input
          type="file"
          id="image-upload"
          className="form-control d-none"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {/* preview of image */}
        {uploadedImageUrl && !imageLoadingState && (
          <div className="mb-3 text-center">
            <img
              src={uploadedImageUrl}
              alt="Uploaded"
              style={{
                maxHeight: "150px",
                borderRadius: "8px",
                objectFit: "cover",
                margin: "3px",
              }}
            />
          </div>
        )}
        {!imageFile ? (
          <label
            htmlFor="image-upload"
            className="text-center d-block"
            style={{
              cursor: isEditMode ? "no-drop" : "pointer",
              background: "#f9f9f9",
              padding: "2rem",
            }}
          >
            <CloudUpload style={{ height: "30px", width: "30px" }} />
            <div>Drag & Drop or click to upload Image</div>
          </label>
        ) : imageLoadingState ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Uploading...</span>
            </div>
            <p className="mt-2 mb-0">Uploading image...</p>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <FileText
                style={{ width: "20px", height: "20px" }}
                className="me-2 text-primary"
              />
              <p className="mb-0">{imageFile.name}</p>
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleRemoveImage}
            >
              <XIcon style={{ width: "16px", height: "16px" }} /> Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
