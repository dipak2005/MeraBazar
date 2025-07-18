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
    // Send `form` to backend
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6">MeraBazar Seller Registration</h2>

      {/* Step Progress UI */}
      <div className="flex mb-6">
        {sellerRegistrationControl.map((s, index) => (
          <div
            key={s.step}
            className={`flex-1 text-center py-2 rounded ${step === s.step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            Step {index + 1}: {s.label}
          </div>
        ))}
      </div>

      {/* Dynamic Form Fields */}
      <div className="space-y-4">
        {currentStepFields.fields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}{field.required ? "*" : ""}</label>
            {field.type === "select" ? (
              <select
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select</option>
                {field.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === "file" ? (
              <input
                type="file"
                onChange={(e) => handleFileChange(field.name, e.target.files[0])}
                className="w-full p-2 border rounded"
              />
            ) : (
              <input
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </button>
        )}
        {step < totalSteps ? (
          <button
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setStep((prev) => prev + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default SellerRegistration;
