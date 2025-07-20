import React, { useEffect } from "react";
import { Card, Form, Accordion } from "react-bootstrap";
import SimpleNavbar from "../../common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import PriceDetails from "../../components/shopping-view/ProductDetail/PriceDetail";
import { fetchAllAddresses } from "../../store/shop/addressSlice";
import { useNavigate } from "react-router-dom";
import { fetchCartProduct } from "../../store/shop/cartSlice";

function ShoppingViewCheckout() {
  const dispatch = useDispatch();
  const { updateduser, user } = useSelector((state) => state.auth);
  const { cartItem } = useSelector((state) => state.shoppingcart);
  const { addressList } = useSelector((state) => state.userAddress);
  const navigate = useNavigate();

  const items = Array.isArray(cartItem?.items) ? cartItem.items : [];

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddresses({ userId: user.id }));
       dispatch(fetchCartProduct({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

   
  console.log("addressList:", addressList);

  function handleEdit() {
    navigate("/shop/account/profile");
  }

  function handleAddress() {
    navigate("/shop/account/address");
  }

  function handleLogin() {
    navigate("/auth/login");
  }

  console.log(items , "items")

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
                {addressList?.length > 0
                  ? "2 DELIVERY ADDRESS"
                  : "No Address Found"}
              </h5>

              <Form>
                {Array.isArray(addressList) &&
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
                      />

                      <div className="d-flex justify-content-between ">
                        <div>
                          <strong>{user?.username}</strong>{" "}
                          <span className={`badge bg-${item.place == "home"? "success": "primary"} text-white text-uppercase`}>
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
                        <button className="btn btn-warning btn-sm px-3">
                          DELIVER HERE
                        </button>
                        <span
                          onClick={handleEdit}
                          className="text-primary"
                          role="button"
                          style={{ fontSize: "0.9rem" }}
                        >
                          EDIT
                        </span>
                      </div>
                    </div>
                  ))}

                <div
                  className="btn btn-outline-primary mt-2"
                  onClick={handleAddress}
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
    </div>
  );
}

export default ShoppingViewCheckout;
