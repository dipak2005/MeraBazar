import Button from "@/components/ui/Button";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const ImageUpload = ({ uploadedImageUrls, setUploadedImageUrls }) => {
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("my_file", file); // must match multer field name

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/seller/products/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response:", response.data);

      if (response?.data?.success) {
        setUploadedImageUrls((prev) => [
          ...prev,
          response.data.result.secure_url,
        ]);

        toast.success("Image uploaded successfully");
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...uploadedImageUrls];
    updatedImages.splice(index, 1);
    setUploadedImageUrls(updatedImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {uploadedImageUrls?.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt="uploaded"
              className="w-32 h-32 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <Button disabled={loading} asChild>
        <label className="cursor-pointer">
          {loading ? "Uploading..." : "+ Add Another Image"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>
      </Button>
    </div>
  );
};

export default ImageUpload;