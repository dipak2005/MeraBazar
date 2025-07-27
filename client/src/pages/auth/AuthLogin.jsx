import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../common/Form";
import { loginFormControls } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, loggedinUser } from "../../auth-slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSellerDetails } from "../../store/admin/seller-listingSlice";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const { seller } = useSelector((state) => state.sellerAuth);
  const { sellerList, sellerDetails } = useSelector(
    (state) => state.sellerListing
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);
  const [Data, setData] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(loggedinUser(formData)).then(async (data) => {
      if (data?.payload?.success) {
        const role = data?.payload?.data?.role;
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role == "seller") {
          const sellerRes = await dispatch(getSellerDetails(seller?._id));
          const isApproved = sellerRes?.payload?.data?.isapproved;
          if (isApproved) {
            navigate("/seller/dashboard");
          } else {
            navigate("/seller/pending");
          }
        } else {
          navigate("/");
        }
        
      }
    });
  };
console.log(seller?._id)


  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <div className="bg-white shadow rounded-4 p-4 p-md-5 w-100">
          <div className="text-center mb-4">
            <h1 className="fs-2 fw-bold">Welcome to MeraBazar</h1>
            <p className="text-muted">Sign in to your account</p>
          </div>

          <Form
            formControls={loginFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText="Sign In"
            onSubmit={onSubmit}
            isLoading={isLoading}
          />

          <p className="mt-3 text-center">
            Don't have an account?
            <Link
              className="fw-semibold"
              to="/auth/register?role=user"
              state={{ role: "user" }}
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
