import React, { useState } from "react";
import { sellerRegistrationControl } from "../../config/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registeredSeller } from "../../auth-slice/sellerSlice";
import { toast } from "react-toastify";
import ImageUpload from "../../components/admin-view/ImageUpload";
import PendingApproval from "../seller-view/PendingApproval";

 const InitialState = {
  username: "",
  email: "",
  phone: "",
  password: "",
  storename: "",
  gstno: "",
  businesstype: "",
  bankaccount: "",
  ifsccode: "",
  document: null,
  address: "",
};

const SellerRegistration = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState(InitialState);
  // const { seller, isLoading } = useSelector((state) => state.sellerAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalSteps = sellerRegistrationControl.length;
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const currentStepFields = sellerRegistrationControl.find(
    (s) => s.step === step
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageLoadingState) {
      toast.warn("Please wait for image upload to complete.");
      return;
    }

    if (!uploadedImageUrl) {
      toast.error("Please upload a document/image first.");
      return;
    }

    await dispatch(
      registeredSeller({ ...formData, document: uploadedImageUrl })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message || "Registration Successful!");

        navigate("/auth/login")
        setFormData(InitialState);
      } else {
        toast.error(data?.payload?.message || "Registration failed");
      }
    });
  };
  // console.log(seller?.userId, "", seller.isapproved);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card shadow rounded-4 p-4">
            <h2 className="text-center mb-4 text-primary">MeraBazar Seller Registration</h2>

            {/* Step UI */}
            <div className="row text-center mb-4">
              {sellerRegistrationControl.map((s, index) => (
                <div key={s.step} className="col-12 col-sm">
                  <div
                    className={`py-2 px-2 mb-2 rounded ${
                      step === s.step
                        ? "bg-primary text-white"
                        : "bg-light text-muted"
                    }`}
                  >
                    Step {index + 1}: {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form>
              {currentStepFields.fields.map((field) => (
                <div key={field.name} className="mb-3">
                  <label className="form-label text-primary">
                    {field.label} {field.required && "*"}
                  </label>
                  {field.type === "select" ? (
                    <select
                      className="form-select"
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    >
                      <option value="">Select</option>
                      {field.options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <ImageUpload
                      className="mb-2"
                      imageFile={imageFile}
                      setImageFile={setImageFile}
                      uploadedImageUrl={uploadedImageUrl}
                      setUploadedImageUrl={setUploadedImageUrl}
                      setImageLoadingState={setImageLoadingState}
                      imageLoadingState={imageLoadingState}
                      isEditMode={currentEditedId !== null}
                    />
                  ) : field.type === "textarea" ? (
                    <textarea
                      type={field.type}
                      placeholder={field.placeholder}
                      className="form-control"
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="form-control"
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  )}
                </div>
              ))}

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between mt-4">
                {step > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => setStep((prev) => prev - 1)}
                  >
                    Back
                  </button>
                )}
                {step < totalSteps ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-auto"
                    onClick={() => setStep((prev) => prev + 1)}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success ms-auto"
                    onClick={handleSubmit}
                  >
                    Submit
                    {/* {isLoading ? "Submitting..." : "Submit"} */}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistration;
