import React, { useEffect, useState } from "react";
import Form from "../../common/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSeller,
  getSellerDetails,
  updateSellerApprovalStatus,
} from "../../store/admin/seller-listingSlice";
import { toast } from "react-toastify";
import { getUserByIdForSeller } from "../../store/seller/UserSlice";

const initialFormData = {
  status: "",
};

function SellerDetailsModel({
  sellerDetails,
  setShowModal,
  sellerEmail,
  sellerName,
  sellerPhone,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.sellerAuth);
  useEffect(() => {
    if (sellerDetails?.userId) {
      dispatch(getUserByIdForSeller(sellerDetails?.userId));
    }
  }, [sellerDetails?.userId, dispatch]);

  if (!sellerDetails?.data) return <p>Loading...</p>;

  function handleUpdateStatus(event) {
    event.preventDefault();
    console.log(formData);

    const { status } = formData;

    dispatch(
      updateSellerApprovalStatus({
        id: sellerDetails?.data?._id,
        status: status,
        isapproved: status == "approved" ? true : false,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getSellerDetails(sellerDetails?.data?._id));
        dispatch(getAllSeller());
        setFormData(initialFormData);
        toast.success("Seller status updated!");
      }
    });
  }

  return (
    <div className="container-fluid px-4">
      <div className="mb-4 border rounded p-3 bg-light">
        <h6 className="fw-bold mb-3">Personal Details</h6>
        <div className="row mb-2">
          <div className="col-6">Seller Name</div>
          <div className="col-6 fw-semibold text-end">
            {sellerName.toUpperCase()}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Phone No.</div>
          <div className="col-6 fw-semibold text-end">{sellerPhone}</div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Email</div>
          <div className="col-6 fw-semibold text-end">{sellerEmail}</div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Address</div>
          <div className="col-6 fw-semibold text-end">
            {sellerDetails?.data?.address}
          </div>
        </div>{" "}
        <div className="row mb-2"></div>
      </div>

      <div className="mb-4 border rounded p-3 bg-light">
        <h6 className="fw-bold mb-3">Business Details</h6>
        <div className="row mb-2">
          <div className="col-6">Store Name</div>
          <div className="col-6 fw-semibold text-end">
            {sellerDetails?.data?.storename}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Business Type</div>
          <div className="col-6 fw-semibold text-end">
            {sellerDetails?.data?.businesstype}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">GST No.</div>
          <div className="col-6 fw-semibold text-end">
            {sellerDetails?.data?.gstno || "NA"}
          </div>
        </div>{" "}
        <div className="row mb-2">
          <div className="col-6">Document</div>
          <div className="col-6 fw-semibold text-end">
            <a href={`${sellerDetails?.data?.document}`} target="_blank">
              <img
                className="justify-content-end"
                src={sellerDetails?.data?.document}
                alt={"image"}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                }}
              />
            </a>
          </div>
        </div>
      </div>

      <div className="mb-4 border rounded p-3 bg-light">
        <h6 className="fw-bold mb-3">Bank Details</h6>
        <div className="row mb-2">
          <div className="col-6">Account No.</div>
          <div className="col-6 fw-semibold text-end">
            {sellerDetails?.data?.bankaccount}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">IFSC CODE</div>
          <div className="col-6 fw-semibold text-end">
            {sellerDetails?.data?.ifsccode}
          </div>
        </div>
        <div className="row">
          <div className="col-6">Approval Status</div>
          <div className="col-6 text-end">
            <span
              className={`badge px-3 py-2 text-uppercase bg-${
                sellerDetails?.data?.approvalstatus === "pending"
                  ? "primary"
                  : sellerDetails?.data?.approvalstatus === "rejected"
                  ? "danger"
                  : sellerDetails?.data?.approvalstatus === "approved"
                  ? "success"
                  : "info"
              } text-white`}
            >
              {sellerDetails?.data?.approvalstatus}
            </span>
          </div>
        </div>
      </div>
      <div className="w-100">
        <Form
          formControls={[
            {
              label: "Seller Status",
              name: "status",
              componentType: "select",
              options: [
                { value: "approved", label: "Approved" },
                { value: "rejected", label: "Rejected" },
              ],
              value: formData.status || "",
              className: "w-100",
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update Seller Status"}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </div>
  );
}

export default SellerDetailsModel;
