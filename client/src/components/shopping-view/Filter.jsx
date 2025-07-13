import { Fragment, useEffect } from "react";
import { filterOptions, sortOptions } from "../../config";

function FilterSidebar({ filters, setFilters, clearFilters }) {
  // ✅ Handle category/brand checkbox change
  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const updated = prev[type]?.includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...(prev[type] || []), value];

      const newFilters = {
        ...prev,
        [type]: updated,
      };

      sessionStorage.setItem("filters", JSON.stringify(newFilters)); // optional
      return newFilters;
    });
  };

  // ✅ Handle sort (radio input for better UX)
  const handleSortChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      sort: {
        sortBy: value,
      
      },
    
    }));
      console.log();
      
  };

  // / Render filter body (used in both desktop and mobile)
  const renderFilterBody = () => (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Filters</h5>
        <button
          onClick={clearFilters}
          className="btn btn-sm btn-outline-primary"
        >
          Clear All
        </button>
      </div>

      {/* Loop through all filter types */}
      {Object.entries(filterOptions).map(([type, options]) => (
        <div className="mb-4" key={type}>
          <h6 className="fw-semibold mb-2 text-capitalize">{type}</h6>
          {options.map((option) => (
            <div className="form-check" key={option.id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`${type}-${option.id}`}
                checked={filters[type]?.includes(option.id) || false}
                onChange={() => handleCheckboxChange(type, option.id)}
              />
              <label
                className="form-check-label text-capitalize"
                htmlFor={`${type}-${option.id}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ))}

      {/* Sort section */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-2">Sort By</h6>
        {sortOptions.map((option) => (
          <div className="form-check" key={option.id}>
            <input
              className="form-check-input"
              type="radio"
              id={`sort-${option.id}`}
              checked={filters.sort?.sortBy === option.id}
              onChange={() => handleSortChange(option.id)}
            />
            <label className="form-check-label" htmlFor={`sort-${option.id}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Button */}
      <div className="d-block d-lg-none px-3 mb-3 text-end">
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileFilter"
        >
          Filter
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileFilter"
        aria-labelledby="mobileFilterLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold" id="mobileFilterLabel">
            Filters
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">{renderFilterBody()}</div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className="d-none d-lg-block border-end p-3 sticky-top bg-white"
        style={{
          top: "4rem",
          minWidth: "250px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {renderFilterBody()}
      </div>
    </>
  );
}

export default FilterSidebar;
