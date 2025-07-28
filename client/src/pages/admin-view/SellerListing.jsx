import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Placeholder, Table } from "react-bootstrap";
import SellerDetailsModel from "../../components/admin-view/SellerDetailsModel";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSeller,
  getSellerDetails,
  resetSellerDetails,
} from "../../store/admin/seller-listingSlice";
import { getUserByIdForSeller } from "../../store/seller/UserSlice";

function SellerOrder() {
  const [showModal, setShowModal] = useState(false);
  const { seller } = useSelector((state) => state.sellerAuth);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");

  const dispatch = useDispatch();

  const { sellerList, isLoading, sellerDetails } = useSelector(
    (state) => state.sellerListing
  );

  useEffect(() => {
    dispatch(getAllSeller());
  }, [dispatch]);

  const handleViewDetail = (getId, sellerId) => {
    dispatch(resetSellerDetails());
    dispatch(getSellerDetails(getId));
    dispatch(getUserByIdForSeller(sellerId)).then((data) => {
      console.log(data);
      setSellerName(data?.payload?.data?.username);
      setSellerEmail(data?.payload?.data?.email);
      setSellerPhone(data?.payload?.data?.phone);
    });
    setShowModal(true);
  };

  useEffect(() => {
    if (sellerDetails != null) {
      
      setSelectedSeller(sellerDetails);
    }
  }, [sellerDetails]);

  console.log(sellerDetails, "orderDetails");
  console.log(seller?._id,"seller");
 
  return (
   
    !isLoading ? (
      <Card className="w-100">
        <h5 className="text-muted p-3">Seller's Listing</h5>
        <div>
          <Table responsive className="table table-bordered align-middle">
            <thead>
              <tr>
                <th className="px-5">Seller ID</th>
                <th className="px-5">Registration Date</th>
                <th className="px-3">Status</th>
                <th className="px-4">Store Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sellerList && sellerList.length > 0 ? (
                sellerList.map((items) => (
                  <tr key={items._id}>
                    <td className="px-3">
                      
                      {items._id}
                    </td>
                    <td className="px-5">
                      {new Date(items.createdAt).toLocaleDateString()}
                    </td>
                    
                    <td>
                      <span
                        className={`badge px-1 py-2 bg-${
                          items?.approvalstatus === "approved"
                            ? "success"
                            : items?.approvalstatus === "rejected"
                            ? "danger"
                            : "primary"
                        } text-white text-uppercase`}
                      >
                        {items?.approvalstatus}
                      </span>
                    </td>
                    <td className="px-4">{items?.storename}</td>
                    <td className="px-5">
                      <button
                        onClick={() => {
                          handleViewDetail(items?._id, items?.userId);
                        }}
                        className="btn btn-outline-primary"
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    <img
                      src="https://w7.pngwing.com/pngs/432/266/png-transparent-empty-box-age-3d-icon.png"
                      alt="No orders"
                      width={80}
                      className="mb-2"
                    />
                    <div>No Seller found.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
            dispatch(resetSellerDetails());
            setSellerEmail("");
            setSellerName("");
            setSellerPhone("");
          }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Seller's Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedSeller && (
              <SellerDetailsModel
                sellerDetails={selectedSeller}
                sellerEmail={sellerEmail}
                sellerName={sellerName}
                setShowModal={setShowModal}
                sellerPhone={sellerPhone}
              />
            )}
          </Modal.Body>
        </Modal>
      </Card>
    ) : (
      <SellerOrderSkeleton />
    )
  );
}

export default SellerOrder;

const SellerOrderSkeleton = () => {
  const renderRows = () =>
    Array.from({ length: 3 }).map((_, index) => (
      <tr key={index}>
        <td className="px-3">
          <Placeholder
            as="div"
            animation="glow"
            style={{ width: "100px", height: "100px" }}
            className="bg-secondary rounded"
          />
        </td>
        <td className="px-5">
          <Placeholder animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
        </td>
        <td className="px-5">
          <Placeholder animation="glow">
            <Placeholder xs={5} />
          </Placeholder>
        </td>
        <td className="px-5">
          <Placeholder animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
        </td>
        <td className="px-5">
          <Placeholder.Button variant="outline-primary" xs={6} />
        </td>
      </tr>
    ));

  return (
    <Card className="w-100">
      <h5 className="text-muted p-3">Order History</h5>
      <Table responsive className="table table-bordered align-middle">
        <thead>
          <tr>
            <th className="px-5">Product</th>
            <th className="px-5">Order Date</th>
            <th className="px-5">Status</th>
            <th className="px-5">Price</th>
            <th className="px-5">Details</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </Table>
    </Card>
  );
};
