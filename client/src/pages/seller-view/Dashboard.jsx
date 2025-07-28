import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificSellerInfo } from "../../store/seller/UserSlice";
import PendingApproval from "./PendingApproval";
import { useNavigate } from "react-router-dom";

function SellerDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { sellerdetail } = useSelector((state) => state.getUser);
  const [sellerInfo, setSellerInfo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const isApproved = sellerInfo?.sellerinfo?.isapproved;

  if (!sellerInfo) {
    return <p className="text-center">Loading seller information...</p>;
  }

  return (
    <div>
      {!isApproved ? (
        navigate("/seller/pending")
      ) : (
        <h2>Welcome to Mera MarketPlace : {user.username}</h2>
      )}
    </div>
  );
}

export default SellerDashboard;
