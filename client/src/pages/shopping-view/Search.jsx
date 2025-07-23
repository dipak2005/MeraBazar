import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSidebar from "../../components/shopping-view/Filter";
import ProductTile from "../../common/ProductTile";
import SimpleNavbar from "../../common/Navbar";

// import SearchBar from "./SearchBar";
// import FilterSidebar from "./FilterSidebar";
// import ProductGrid from "./ProductGrid";
// import SortDropdown from "./SortDropdown";

function SearchPage() {
  


  return (
    <div className="container-fluid p-0">
      {/* <SearchBar setQuery={setQuery} /> */}
        <SimpleNavbar/>
      <div className="d-flex">
        {/* <FilterSidebar filters={filters} setFilters={setFilters} /> */}

        <div className="flex-grow-1 p-3">
          {/* <ProductTile product={}/> */}
          
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
