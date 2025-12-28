import Button from "../components/ui/Button";

function Form({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled, 
}) {
  const types = {
    INPUT: "input",
    SELECT: "select",
    TEXTAREA: "textarea",
    RADIO:"radio"
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "file" ? files[0] : value,
    }));
  };

  const renderInputByComponentType = (getControlItem) => {
    const rawValue = formData[getControlItem.name];
    const value =
      typeof rawValue === "string" || typeof rawValue === "number"
        ? rawValue
        : "";

    switch (getControlItem.componentType) {
      case types.INPUT:
        return (
          <input
            className="form-control"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            accept={getControlItem.accept}
            onChange={handleChange}
            value={value}
            required
          />
          
        );

      case types.SELECT:
        return (
          <select
            className="form-select card rounded-2"
            name={getControlItem.name}
            id={getControlItem.name}
            value={value}
            onChange={handleChange}
            required
          >
            <option value="">
              --- Select {getControlItem.label || getControlItem.name} ---
            </option>
            {getControlItem.options?.map((optionItem) => (
              <option
                key={optionItem.key || optionItem.value || optionItem.label}
                value={optionItem.value}
              >
                {optionItem.label}
              </option>
            ))}
          </select>
        );

      case types.TEXTAREA:
        return (
          <textarea
            className="form-control"
            name={getControlItem.name}
            id={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={value}
            onChange={handleChange}
            required
          />
        );

        case types.RADIO:
  return (
    <div>
      {getControlItem.options?.map((optionItem) => (
        <div className="form-check" key={optionItem.value}>
          <input
            className="form-check-input d-flex"
            type="radio"
            name={getControlItem.name}
            id={`${getControlItem.name}_${optionItem.value}`}
            value={optionItem.value}
            checked={formData[getControlItem.name] === optionItem.value}
            onChange={handleChange}
          />
          <label
            className="form-check-label"
            htmlFor={`${getControlItem.name}_${optionItem.value}`}
          >
            {optionItem.label}
          </label>
        </div>
      ))}
    </div>
  );


      default:
        return (
          <input
            className="form-control"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type="text"
            value={value}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit} className="needs-validation">
      <div className="w-100" style={{ maxWidth: "500px", margin: "0 auto" }}>
        {formControls.map((controlItem, index) => (
          <div className="mb-3" key={controlItem.name || index}>
            <label 
              htmlFor={controlItem.name}
              className="form-label fw-medium text-capitalize text-primary"
            >
              {controlItem.label || controlItem.name}
            </label>
            {renderInputByComponentType(controlItem)}
          </div>
        ))}
        <div className="text-center mt-3 mb-3">
          <button 
            //  disabled={isBtnDisabled} 
            type="submit"
            className="btn btn-outline-primary w-100"
          >
            {buttonText || "Register"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
