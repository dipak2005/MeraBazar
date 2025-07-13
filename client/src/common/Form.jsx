import Button from "../components/ui/Button";

function Form({ formControls, formData, setFormData, onSubmit, buttonText , isBtnDisabled }) {
  const types = {
    INPUT: "input",
    SELECT: "select",
    TEXTAREA: "textarea",
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
            value={getControlItem.type === "file" ? undefined : value}
            onChange={handleChange}
            required
           />
        );

      case types.SELECT:
        return (
          <select
            className="form-select"
            name={getControlItem.name}
            id={getControlItem.name}
            value={value}
            onChange={handleChange}
            required
          >
            <option value="">-- Select {getControlItem.label || getControlItem.name} --</option>
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
              className="form-label fw-medium text-capitalize"
            >
              {controlItem.label || controlItem.name}
            </label>
            {renderInputByComponentType(controlItem)}
          </div>
        ))}
        <div className="text-center mt-3">
          <button disabled={isBtnDisabled}  type="submit" className="btn btn-dark">
            {buttonText || "Register"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
