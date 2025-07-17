import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../common/Form";
import { loginFormControls } from "../../config";
import { useDispatch } from "react-redux";
import { checkAuth, loggedinUser } from "../../auth-slice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  
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
          ? navigate("/seller/dashboard")
          : navigate("/");
      } else {
        toast.error(data.payload.message);
      }
    });
  };

  return (
    <div className="container  align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className=" fs-1 fw-bold mt-5 mb-5">welcome to MeraBazar</h1>
      </div>
      <Form
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText="Sign in"
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      <p className="mt-2 text-center">
        Do you have'nt account? &nbsp;
        <Link className="fs-5 ml-5  " to={"/auth/register"}>
          Register now
        </Link>
      </p>
    </div>
  );
}

export default AuthLogin;
