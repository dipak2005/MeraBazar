import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../auth-slice";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify";



function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await dispatch(logOutUser()).unwrap();
      toast.success("Logged out successfully!");
      navigate("/auth/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  }

  return (
    <div className="w-100 bg-white py-2 px-4 border-bottom">
      <div className="row align-items-center justify-content-between">
        {/*  Mobile Toggle Button  */}
        <div className="col-auto d-lg-none">
          <Button
            className="btn bg-primary text-white"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
          >
            <i className="fa-solid fa-bars me-2"></i>
          </Button>
        </div>

        {/*  Logout Button */}
        <div className="col-auto ms-auto">
          <Button className="btn btn-outline-danger" onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> LogOut
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
