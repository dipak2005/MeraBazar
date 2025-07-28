import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificSellerInfo } from "../../store/seller/UserSlice";
import PendingApproval from "./PendingApproval";

function SellerDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { sellerdetail } = useSelector((state) => state.getUser);
  const [sellerInfo, setSellerInfo] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.email) {
      dispatch(getSpecificSellerInfo(user.email));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (sellerdetail) {
      setSellerInfo(sellerdetail);
    }
  }, [sellerdetail]);

  // Safely check approval status
  const isApproved = sellerInfo?.sellerinfo?.isapproved;

  // Show loading state until sellerInfo is available
  if (!sellerInfo) {
    return <p className="text-center">Loading seller information...</p>;
  }

  return <div>{isApproved ? <h2>Welcome to Seller Dashboard!</h2> : <PendingApproval />}</div>;
}

export default SellerDashboard;
