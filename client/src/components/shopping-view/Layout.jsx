import { Outlet, useSearchParams } from "react-router-dom";
import ShoppingHeader from "./Header";
import ShoppingCategory from "./ShoppingCategory";
import FilterSidebar from "./Filter";







function ShoppingLayout() {

 






  return (
    <div className="d-flex flex-column bg-light overflow-hidden">
      <ShoppingHeader />
      <ShoppingCategory />

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <FilterSidebar
             
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
