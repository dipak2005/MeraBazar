import React, { useState } from "react";
import { sellerRegistrationControl } from "../../config/index";

export const InitialState = {
  username: "",
  email: "",
  phone: "",
  storeName: "",
  gstNumber: "",
  businessType: "",
  bankAccount: "",
  ifscCode: "",
  document: null,
};

const SellerRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(InitialState);
  const totalSteps = sellerRegistrationControl.length;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const currentStepFields = sellerRegistrationControl.find((s) => s.step === step);

  const handleSubmit = () => {
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    console.log("Submitting:", Object.fromEntries(form));
    
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card shadow rounded-4 p-4">
            <h2 className="text-center mb-4">MeraBazar Seller Registration</h2>

            {/* Step  UI */}
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

            {/* Dynamic Form */}
            <form>
              {currentStepFields.fields.map((field) => (
                <div key={field.name} className="mb-3">
                  <label className="form-label">
                    {field.label} {field.required && "*"}
                  </label>
                  {field.type === "select" ? (
                    <select
                      className="form-select"
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {field.options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) =>
                        handleFileChange(field.name, e.target.files[0])
                      }
                    />
                  ) : (
                    <input
                      type={field.type}
                      className="form-control"
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value)
                      }
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
