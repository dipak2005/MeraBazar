import React, { useEffect, useState } from "react";
import { profileFields } from "../../../config/index";
import { useDispatch, useSelector } from "react-redux";
import { editUser, fetchUser, loggedinUser } from "../../../auth-slice/index";
import { getUserByIdForSeller } from "../../../store/seller/UserSlice";

const Profile = ({ toast }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const { userdetail } = useSelector((state) => state.getUser);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserByIdForSeller(user?.id));
    }
  }, [user?.id, dispatch]);

  console.log(userdetail, "Fetched user by ID");

  useEffect(() => {
    if (userdetail) {
      setForm({
        fullName: userdetail?.username?.toUpperCase() || "",
        email: userdetail.email || "",
        phone: userdetail.phone || "",
        gender: userdetail.gender || "",
        dob: userdetail.dob || "",
        // address: user.address || "",
      });
    }
  }, [userdetail]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(
        editUser({ id: user?.id, formData: form })
      ).unwrap();
      console.log(form);
      toast.success("Profile updated successfully!");

      await dispatch(getUserByIdForSeller(user?.id));
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed!");
    }
  };

  console.log("user", user);

  return (
    <div className="p-3">
      <h5 className="mb-4 border-bottom pb-2">Edit Profile</h5>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {profileFields.map((field) => (
            <div className="col-md-6 mb-3" key={field.name}>
              <label className="form-label">{field.label}</label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  className="form-select"
                  value={form[field.name]}
                  onChange={handleChange}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  className="form-control"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  type={field.type}
                  className="form-control"
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>

        <button
          //   onClick={handleSubmit}
          type="submit"
          className="btn btn-primary mt-3"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
