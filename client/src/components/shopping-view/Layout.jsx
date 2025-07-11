import { Outlet } from "react-router-dom";
import ShoppingHeader from "./Header";

function ShoppingLayout() {
    return (  
        <div className="d-flex flex-column bg-white overflow-hidden ">
            {/* common header */}
            <ShoppingHeader/>
            <main className="d-flex flex-column vh-100">
                <Outlet/>
            </main>
        </div>
    );
}

export default ShoppingLayout;