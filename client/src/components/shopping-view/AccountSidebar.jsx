import {
  BookHeart,
  CircleUserRound,
  LogOut,
  MapPinHouse,
  Settings,
  ShoppingBag,
} from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logOutUser } from "../../auth-slice";

const AccountSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logOutUser());
    toast.success("logged out successful!");
    navigate("/");
  }

  return (
    <div className="list-group">
      <Link
        to="/shop/account/profile"
        className="list-group-item list-group-item-action"
      >
        <CircleUserRound /> Profile Information
      </Link>
      <Link
        to="/shop/account/address"
        className="list-group-item list-group-item-action "
      >
        <MapPinHouse /> Manage Addresses
      </Link>
      <Link
        to="/shop/account/orders"
        className="list-group-item list-group-item-action"
      >
        <ShoppingBag /> My Orders
      </Link>
      <Link
        to="/shop/account/wishlist"
        className="list-group-item list-group-item-action"
      >
        <BookHeart /> Wishlist
      </Link>
      <Link
        to="/shop/account/settings"
        className="list-group-item list-group-item-action"
      >
        <Settings /> Settings
      </Link>
      <button
        onClick={handleLogout}
        className="list-group-item list-group-item-action text-danger"
      >
        <LogOut /> Logout
      </button>
    </div>
  );
};

export default AccountSidebar;
