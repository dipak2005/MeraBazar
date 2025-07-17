import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Form from "../../common/Form";
import { registerFormControls, sellerRegisterFormControls } from "../../config";
import { registeredUser } from "../../auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "lucide-react";

// Initial state for user
const initialState = {
  username: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  function onSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(registeredUser(formData)).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message || "Registration Successful!");
        setFormData(initialState);
        navigate("/auth/login");
      } else {
        toast.error(res?.payload?.message || "Registration failed");
      }
    });
  }

  return (
    <div className="container py-5 ">
      <div className="mx-auto" style={{ maxWidth: "600px" }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold">Create New Account</h1>
        </div>

        <Form
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText="Sign up"
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
        <div className="my-4 d-flex justify-content-center">
          <Link
            to={"/auth/register/auth=seller"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="d-none d-md-flex align-items-center ">
              <Store /> &nbsp; Become a Seller
            </div>
          </Link>
        </div>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary fw-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthRegister;
