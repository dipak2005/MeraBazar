import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Form from "../../common/Form";
import { registerFormControls } from "../../config";
import { registeredUser } from "../../auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "lucide-react";

const initialState = {
  username: "",
  email: "",
  password: "",
  // confirmPassword: "",
};

function AuthRegister() {
  
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  function onSubmit(e) {
    e.preventDefault();

    // if (formData.password !== formData.confirmPassword) {
    //   toast.error("Passwords do not match");
    //   return;
    // }

    dispatch(registeredUser(formData)).then((res) => {
      if (res?.payload?.success) {
         const role = res?.payload?.user.role;
        toast.success(res.payload.message || "Registration Successful!");
        role === "admin"
          ? navigate("/admin/dashboard")
          : role === "seller"
          ? navigate("/seller/dashboard")
          : navigate("/");
        setFormData(initialState);
        
      } else {
        toast.error(res?.payload?.message || "Registration failed");
      }
    });
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <div className="bg-white shadow rounded-4 p-4 p-md-5 w-100">
          <div className="text-center mb-4">
            <h1 className="fw-bold fs-2">Create New Account</h1>
            <p className="text-muted">Register to MeraBazar</p>
          </div>

          <Form
            formControls={registerFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText="Sign Up"
            onSubmit={onSubmit}
            isLoading={isLoading}
          />

          <div className="my-4 d-flex justify-content-center">
            <Link
              to="/auth/register/roll=seller"
              style={{ textDecoration: "none", color: "black" }}
              className="d-none d-md-flex align-items-center"
            >
              <Store /> &nbsp; Become a Seller
            </Link>
          </div>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/auth/login" className="fw-semibold text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
