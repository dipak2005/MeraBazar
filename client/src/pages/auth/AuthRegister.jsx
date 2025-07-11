import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../common/Form";
import {registerFormControls} from "../../config";
import { registeredUser } from "../../auth-slice";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registeredUser(formData)).then((data) => {
      if (data?.payload?.success) {
       toast.success(data.payload.message || "Registration Successful!");
        setFormData(initialState);
        navigate("/auth/login");
      } else {
        toast.error(data?.payload?.message || "Registration failed");
      }
      console.log(data);
    });
  }

  console.log(formData);

  return (
    <div className="container  align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className=" fs-1 fw-bold mt-5 mb-5">Create new account</h1>
      </div>
      <Form
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText="Sign up"
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      <p className="mt-2 text-center">
        Already have an account &nbsp;
        <Link className="fs-5 ml-5  " to={"/auth/login"}>
          Login
        </Link>
      </p>
    </div>
  );
}

export default AuthRegister;
