import React, { useEffect, useState } from "react";
import { Card, Form, Accordion } from "react-bootstrap";
import SimpleNavbar from "../../common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import PriceDetails from "../../components/shopping-view/ProductDetail/PriceDetail";
import {
  addNewAddress,
  editAddress,
  fetchAllAddresses,
} from "../../store/shop/addressSlice";
import { data, useNavigate } from "react-router-dom";
import { fetchCartProduct } from "../../store/shop/cartSlice";
import { AddressCardSkeleton, Model } from "./Account/Address";
import { toast } from "react-toastify";
import { createNewOrder } from "../../store/shop/orderSlice";

const initialState = {
  phone: "",
  address: "",
  city: "",
  pincode: "",
  notes: "",
  place: "",
};

function ShoppingViewCheckout() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItem } = useSelector((state) => state.shoppingcart);
  const { addressList, isLoading } = useSelector((state) => state.userAddress);
  const navigate = useNavigate();

  const items = Array.isArray(cartItem?.items) ? cartItem.items : [];

  const totalPrice = items?.reduce(
    (acc, item) => acc + (item?.salePrice || 0) * (item.quantity || 1),
    0
  );

  const discount = items.reduce((acc, item) => {
    const discountRate = item?.discount || 0;
    const itemDiscount =
      (((item.salePrice || 0) * discountRate) / 100) * (item.quantity || 1);
    return acc + itemDiscount;
  }, 0);

  // const discount = Math.round(totalPrice * cartItems.item?.discount);
  const deliveryCharge = totalPrice > 500 ? 0 : 40;
  const grandTotal = totalPrice - discount + deliveryCharge;

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddresses({ userId: user.id }));
      dispatch(fetchCartProduct({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  console.log("addressList:", addressList);

  // function handleEdit() {
  //   navigate("/shop/account/profile");
  // }
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

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key]?.toString().trim() !== "")
      .every((key) => key);
  }

  function handleAddress() {
    navigate("/shop/account/address");
  }

  function handleLogin() {
    navigate("/auth/login");
  }

  // console.log(items, "items");
  // console.log(cartItem, "cartItems");

  /*
      
     
  */
  function handleInitiatePaypalPayment() {
    const orderData = {
      userId: user?.id,
      cartId: cartItem?._id,
      cartItems: items.map((singleCartItem) => {
        const discountRate = singleCartItem?.discount || 0;
        const basePrice =
          singleCartItem?.salePrice || singleCartItem?.price || 0;
        const discountedPrice = basePrice * (1 - discountRate / 100);

        return {
          productId: singleCartItem?.productId,
          title: singleCartItem?.title,
          image: singleCartItem?.image,
          price: discountedPrice.toFixed(2),
          quantity: singleCartItem?.quantity,
          // discount:singleCartItem?.discount
        };
      }),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: grandTotal.toFixed(2),
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    console.log("Initiating order with:", orderData);

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "dipak");
    });
  }

  return (
    <div className="d-flex flex-column min-vh-100 p-0 m-0 ">
      <div className="w-100">
        <SimpleNavbar />
      </div>

      <div className="container flex-grow-1 mt-3 ">
        <div className="row">
          <div className="col-md-8 ">
            <Card className="mb-3 p-3 d-flex justify-content-between bg-white p-3 rounded shadow-sm ">
              <h5 className="text-primary mb-3">1 LOGIN ✓</h5>
              <p className="mb-0">
                {user?.username} &nbsp;&nbsp;
                <strong>{user?.phone || "+91 0000000000"}</strong>
              </p>
              <div
                className="btn btn-outline-primary mt-2"
                onClick={handleLogin}
                style={{ width: "fit-content", fontWeight: "500" }}
              >
                {"change".toUpperCase()}
              </div>
            </Card>

            <Card className="mb-3 p-3 bg-white p-3 rounded shadow-sm">
              <h5 className="text-primary mb-3">
                {/* {addressList?.length > 0 */}
                {/* // ? `${addressList.length}` */}
                {/* + */}2 DELIVERY ADDRESS
                {/* // : "No Address Found" */}
              </h5>

              <Form>
                {isLoading ? (
                  <AddressCardSkeleton />
                ) : (
                  Array.isArray(addressList) &&
                  addressList.map((item, index) => (
                    <div
                      key={`address-${index}`}
                      className=" rounded p-3 mb-3 d-flex flex-column  p-3 rounded shadow-sm"
                      style={{ backgroundColor: "#f7fdffff" }}
                    >
                      <Form.Check
                        type="radio"
                        name="address"
                        id={`address-${index}`}
                        className="mb-2"
                        label=""
                        checked={currentSelectedAddress?._id === item._id}
                        onChange={() => setCurrentSelectedAddress(item)}
                      />

                      <div className="d-flex justify-content-between ">
                        <div>
                          <strong>{user?.username}</strong>{" "}
                          <span
                            className={`badge bg-${
                              item.place == "home" ? "success" : "primary"
                            } text-white text-uppercase`}
                          >
                            {item.place || "Home"}
                          </span>{" "}
                          <span className="ms-2">{item.phone}</span>
                          <div className="mt-1">
                            {item?.address}, {item?.city}, {item?.state} -{" "}
                            <strong>{item?.pincode}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          onClick={handleInitiatePaypalPayment}
                          className="btn btn-outline-warning btn-sm px-3"
                          disabled={currentSelectedAddress?._id !== item._id}
                        >
                          DELIVER HERE
                        </button>
                        <span
                          onClick={() => {
                            handleEdit(item), setShowModal(true);
                          }}
                          className="text-primary"
                          role="button"
                          style={{ fontSize: "0.9rem" }}
                        >
                          EDIT
                        </span>
                      </div>
                    </div>
                  ))
                )}

                <div
                  className="btn btn-outline-primary mt-2"
                  onClick={() => {
                    setCurrentEditedId(null);
                    console.log(currentEditedId);
                    setFormData(initialState);
                    setShowModal(true);
                  }}
                  style={{ width: "fit-content", fontWeight: "500" }}
                >
                  + Add a New Address
                </div>
              </Form>
            </Card>

            <Accordion defaultActiveKey="0" className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>3 ORDER SUMMARY</Accordion.Header>
                <Accordion.Body>Order items will appear here...</Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="mb-5">
              <Accordion.Item eventKey="0">
                <Accordion.Header>4 PAYMENT OPTIONS</Accordion.Header>
                <Accordion.Body>
                  Payment methods will appear here...
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <div className="col-12 col-md-4  mt-4 mt-md-0">
            <PriceDetails cartItems={items} />
          </div>
        </div>
      </div>
      <Model
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        currentEditedId={currentEditedId}
      />
    </div>
  );
}

export default ShoppingViewCheckout;
