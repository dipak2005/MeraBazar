import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  function onSubmit(e) {
    e.preventDefault();

    dispatch(registeredUser(formData)).then((res) => {
      if (res?.payload?.success) {
        const role = res?.payload?.user.role;
        toast.success(res.payload.message || "Registration Successful!");
        role === "admin"
          ? navigate("/admin/dashboard")
          : role === "seller"
          ? navigate("/seller/dashboard")
          : navigate("/auth/login");
        setFormData(initialState);
      } else {
        toast.error(res?.payload?.message || res.error?.message || "Registration failed");
      }

      
    });
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light px-3">
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <div className="bg-white shadow rounded-4 p-4 p-sm-5">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="fw-bold fs-2 text-primary">Create New Account</h1>
            <p className=" mb-0 text-primary">Register to MeraBazar</p>
          </div>

          {/* Form */}
          <Form
            formControls={registerFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText="Sign Up"
            onSubmit={onSubmit}
            isLoading={isLoading}
          />

          {/* Become a Seller */}
          <div className="my-4 text-center">
            <Link
              to="/auth/register-seller" state={{role:"seller"}}
              className=" text-dark d-inline-flex align-items-center gap-1"
            >
              <Store size={27} /> Become a Seller
            </Link>
          </div>

          {/* Login Link */}
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/auth/login?role=user" state={{role:"user"}} className="fw-semibold text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
