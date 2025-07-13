import { Outlet, useSearchParams } from "react-router-dom";
import ShoppingHeader from "./Header";
import ShoppingCategory from "./ShoppingCategory";
import FilterSidebar from "./Filter";
import { useEffect, useState } from "react";



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


function ShoppingLayout() {
  const [searchParam , setSearchParam] = useSearchParams();
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    sort: "",
  });

  // Load filters from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("filters");
    if (saved) {
      setFilters(JSON.parse(saved));
    }
  }, []);

  
  useEffect(() => {
    sessionStorage.setItem("filters", JSON.stringify(filters));

    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParam(new URLSearchParams(createQueryString))
    }
  }, [filters]);

  const clearFilters = () => {
    const emptyFilters = { category: [], brand: [], sort: "" };
    setFilters(emptyFilters);
    sessionStorage.setItem("filters", JSON.stringify(emptyFilters));
  };

  return (
    <div className="d-flex flex-column bg-light overflow-hidden">
      <ShoppingHeader />
      <ShoppingCategory />

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              clearFilters={clearFilters}
            />
          </div>
          <div className="col-lg-9">
            <main className="py-3">
            
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingLayout;
