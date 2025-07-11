import Button from "../ui/Button";

function AdminHeader() {
  return (
    <div className="w-100 bg-white py-2 px-4 border-bottom">
      <div className="row align-items-center justify-content-between">
        
        {/* Left Column: Mobile Toggle Button (Only on small screens) */}
        <div className="col-auto d-lg-none">
          <Button
            className="btn bg-dark text-white"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
          >
            <i className="fa-solid fa-bars me-2"></i> Menu
          </Button>
        </div>

        {/* Right Column: Logout Button */}
        <div className="col-auto ms-auto">
          <Button className="btn btn-outline-danger" >
            <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> LogOut
          </Button>
        </div>

      </div>
    </div>
  );
}

export default AdminHeader;
