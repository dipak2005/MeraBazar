import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../common/Form";
import { loginFormControls } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, loggedinUser } from "../../auth-slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const { seller } = useSelector((state) => state.sellerAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(loggedinUser(formData)).then((data) => {
      if (data?.payload?.success) {
        const role = data.payload.user.role;

        toast.success(data.payload.message);
        role === "admin"
          ? navigate("/admin/dashboard")
          : role === "seller"
          ? seller.isapproved
            ? navigate("/seller/dashboard")
            : navigate("/seller/pending")
          : navigate("/");
      } else {
        toast.error(data.payload.message);
      }
    });
  };

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
