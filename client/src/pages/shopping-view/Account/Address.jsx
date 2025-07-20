import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "../../../common/Form";
import { useDispatch, useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { addressFormControls } from "../../../config";
import { List, MoreVerticalIcon } from "lucide-react";
import { toast } from "react-toastify";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "../../../store/shop/addressSlice";

// const initialAddresses = [
//   {
//     id: 1,
//     name: "Dipak Kumar",
//     phone: "9876543210",
//     address: "123, Gandhi Nagar, Delhi - 110001",
//     type: "Home",
//     isDefault: true,
//     city: "Rajkot",
//     pincode: "360311",
//     notes: "first account",
//   },]
//   {
//     id: 2,
//     name: "Amit Sharma",
//     phone: "9876541230",
//     address: "45, Park Street, Kolkata - 700016",
//     type: "Work",
//     isDefault: false,
//     city: "Rajkot",
//     pincode: "360311",
//     notes: "first account",
//   },
// ];

const initialState = {
  phone: "",
  address: "",
  city: "",
  pincode: "",
  notes: "",
  place: "",
};

const ManageAddress = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.userAddress);
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId == null) {
      setFormData(initialState);
      setShowModal(false);
      toast.warning("You can add maximum 2 address");

      return;
    }

    currentEditedId !== null
      ? dispatch(
          // edit
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "id", user?.id);
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses({ userId: user?.id }));
            setCurrentEditedId(null);
            setFormData(initialState);
            setShowModal(false);
            toast.success("Edited Address successful!");
          }
        })
      : dispatch(
          // add
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          console.log(data, "id", user?.id);
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses({ userId: user?.id }));
            setFormData(initialState);
            console.log(addressList, "list");
            setShowModal(false);
            toast.success("Added New Address successful!");
          }
        });
  };

  useEffect(() => {
    dispatch(fetchAllAddresses({ userId: user?.id }));
  }, [dispatch]);

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key]?.toString().trim() !== "")
      .every((key) => key);
  }

  // const handleAddAddress = () => {
  //   const newAddress = {
  //     ...formData,
  //     id: Date.now(),
  //     isDefault: addresses.length === 0,
  //   };
  //   setAddresses([...addresses, newAddress]);
  //   setFormData(initialState);
  //   setShowModal(false);
  // };

  const handleEdit = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      phone: getCurrentAddress?.phone,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
      place: getCurrentAddress?.place,
    });
    setShowModal(true);
  };
  const handleDelete = (getCurrentAddressId) => {
    console.log(getCurrentAddressId._id, " addressid");

    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddressId?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses({ userId: user?.id }));
        setFormData(initialState);
        toast.success("Address deleted successful!");
      }
    });
  };

  const setDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  console.log(user?.username);
  return (
    <div className="container-fluid">
      <h4 className="mb-3">Manage Addresses</h4>
      <button
        className="btn btn-primary mt-3 mb-3"
        onClick={() => setShowModal(true)}
      >
        + Add New Address
      </button>
      <div className="row">
        {isLoading ? (
          <>
            <AddressCardSkeleton />
          </>
        ) : addressList.length > 0 ? (
          addressList.map((addr) => (
            <AddressesCard
              key={addr._id}
              address={addr}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={""}
            />
          ))
        ) : (
          <p>No addresses found. Please add one.</p>
        )}
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false), setFormData(initialState);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {currentEditedId !== null
              ? "Update your address"
              : "Add new address"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* onChange={(e) => setForm({ ...form, name: e.target.value })} */}

          <Form
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={
              currentEditedId !== null ? "Update address" : "Add new address"
            }
            onSubmit={onSubmit}
            isLoading={isLoading}
            isBtnDisabled={!isFormValid()}
            // onSuccess={() => {
            //   setShowModal(false);
            //   setFormData(initialState);
            // }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageAddress;

const AddressesCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  return (
    <div className="card mb-3 mt-3 shadow-sm border rounded-3 px-3 py-2">
      <div className="card-body p-2">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <span
              className={`badge ${
                address.place === "home" ? "bg-success" : "bg-primary"
              }   fw-bold mb-2 text-capitalize`}
            >
              {address.place.toUpperCase()}
            </span>
            <p className="mb-1">
              <span className="fw-semibold">{address.address}</span>,
              {address.city} - {address.pincode}
            </p>
            <p className="mb-1">Phone: {address.phone}</p>
            {address.notes && (
              <p className="mb-1 text-muted small">Note: {address.notes}</p>
            )}
            {address.isDefault && (
              <span className="badge bg-success">Default</span>
            )}
          </div>

          <div className="dropdown">
            <MoreVerticalIcon
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
            />

            <ul
              className="dropdown-menu dropdown-menu-md-start dropdown-menu-none-center dropdown-menu-md-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <li className="dropdown-item " style={{ cursor: "pointer" }}>
                <button
                  size="sm"
                  className="mx-2 btn text-center w-100"
                  onClick={() => onEdit(address)}
                >
                  Edit
                </button>
              </li>
              <li className="dropdown-item " style={{ cursor: "pointer" }}>
                <button
                  className="mx-2 btn text-center w-100"
                  size="sm"
                  onClick={() => onDelete(address)}
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
          {/* <div className="text-end">
           
            {/* { */}
          {/* /* {!address.isDefault && (
              <div>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 px-0"
                  onClick={() => onSetDefault(address._id)}
                >
                  Set as Default
                </Button>
              </div>
            )} */}
          {/* </div>  */}
        </div>
      </div>
    </div>
  );
};

const AddressCardSkeleton = () => {
  return (
    <div className="card p-3 mb-3 shadow-sm">
      <div className="d-flex justify-content-between">
        <div className="placeholder-glow w-50 mb-2">
          <span className="placeholder col-6 rounded"></span>
        </div>

        <div className="placeholder-glow">
          <span className="placeholder col-3 rounded bg-secondary"></span>
        </div>
      </div>

      <div className="placeholder-glow mb-2">
        <span className="placeholder col-10 rounded"></span>
      </div>
      <div className="placeholder-glow mb-2">
        <span className="placeholder col-8 rounded"></span>
      </div>
      <div className="placeholder-glow mb-3">
        <span className="placeholder col-6 rounded"></span>
      </div>

      <div className="placeholder-glow mb-2">
        <span className="placeholder col-5 rounded"></span>
      </div>

      <div className="d-flex gap-2">
        <div className="placeholder-glow">
          <span className="placeholder btn btn-outline-secondary disabled col-4"></span>
        </div>
        <div className="placeholder-glow">
          <span className="placeholder btn btn-outline-danger disabled col-4"></span>
        </div>
      </div>
    </div>
  );
};
