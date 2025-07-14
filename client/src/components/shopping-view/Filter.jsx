import { Fragment, useEffect, useState } from "react";
import { filterOptions, sortOptions } from "../../config";
import { useSearchParams } from "react-router-dom";
import { fetchAllFilteredProducts } from "../../store/shop/productSlice";
import { useDispatch } from "react-redux";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramVal = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramVal)}`);
    } else if (typeof value === "string" && value.trim() !== "") {
      queryParams.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return queryParams.join("&");
}
function FilterSidebar() {
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  //  Handle category/brand checkbox change

  //  Handle sort (radio input for better UX)
  const handleSort = (value) => {
    const updatedFilters = {
      ...filters,
      sort: value,
    };

    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  };

  function handleFilter(sectionId, optionId) {
    const currentFilters = { ...filters };

    // Initialize section if it doesn't exist
    if (!Array.isArray(currentFilters[sectionId])) {
      currentFilters[sectionId] = [optionId];
    } else {
      const optionIndex = currentFilters[sectionId].indexOf(optionId);

      if (optionIndex === -1) {
        currentFilters[sectionId].push(optionId);
      } else {
        currentFilters[sectionId].splice(optionIndex, 1);

        // If array is empty after removal, remove the key
        if (currentFilters[sectionId].length === 0) {
          delete currentFilters[sectionId];
        }
      }
    }

    setFilters(currentFilters);
    sessionStorage.setItem("filters", JSON.stringify(currentFilters));

    // Optional: Update query string if using search params
    const queryString = createSearchParamsHelper(currentFilters);
    setSearchParam(new URLSearchParams(queryString));

    // Optional: Trigger filtered product fetch
    dispatch(
      fetchAllFilteredProducts({
        filterParams: filters,
        sortParams: filters.sort || null,
      })
    );
  }

  const clearFilters = () => {
    const emptyFilters = { category: [], brand: [], sort: "" };
    setFilters(emptyFilters);
    sessionStorage.setItem("filters", JSON.stringify(emptyFilters));
  };

  useEffect(() => {
    // Save to sessionStorage
    sessionStorage.setItem("filters", JSON.stringify(filters));

    // Create query string for URL
    // if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParam(new URLSearchParams(queryString));

      // Fire Redux API call just once
      dispatch(
        fetchAllFilteredProducts({
          filterParams: filters || {},
          sortParams: filters?.sort || null,
        })
      );
    // }
  }, [filters, dispatch]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: {}, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  // Load filters from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("filters");
    if (saved) {
      setFilters(JSON.parse(saved));
    }else {
      setFilters({});
    }
  }, []);

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
      {Object.entries(filterOptions).map(([type, filterOptionsList]) => (
        // <Fragment key={type}>
        <div className="mb-4" key={type}>
          <h6 className="fw-semibold mb-2 text-capitalize">{type}</h6>
          {Array.isArray(filterOptionsList) &&
            filterOptionsList.map((option) => (
              <div className="form-check" key={option.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`${option.id}`}
                  checked={filters?.[type]?.includes(option.id) || false}
                  onChange={() => handleFilter(type, option.id)}
                />

                <label
                  className="form-check-label text-capitalize"
                  htmlFor={`${option.id}`}
                >
                  {option.label}
                </label>
              </div>
            ))}
        </div>
        // </Fragment>
      ))}

      {/* Sort section */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-2">Sort By</h6>
        {Array.isArray(sortOptions) &&
          sortOptions.map((sortItem) => (
            <div className="form-check" key={sortItem.id}>
              <input
                className="form-check-input"
                type="radio"
                name="sortBy"
                id={`sort-${sortItem.id}`}
                checked={filters?.sort === sortItem.id}
                onChange={() => handleSort(sortItem.id)}
              />
              <label
                className="form-check-label"
                htmlFor={`sort-${sortItem.id}`}
              >
                {sortItem.label}
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
