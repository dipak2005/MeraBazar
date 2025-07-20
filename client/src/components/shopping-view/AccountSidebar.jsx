import { BookHeart, CircleUserRound, LogOut, MapPinHouse, Settings, ShoppingBag } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AccountSidebar = () => {
  return (
    <div className="list-group">
      <Link to="/shop/account/profile" className="list-group-item list-group-item-action">
       <CircleUserRound /> Profile Information
      </Link>
      <Link to="/shop/account/address" className="list-group-item list-group-item-action ">
        <MapPinHouse /> Manage Addresses
      </Link>
      <Link to="/shop/account/orders" className="list-group-item list-group-item-action">
       <ShoppingBag /> My Orders
      </Link>
      <Link to="/shop/account/wishlist" className="list-group-item list-group-item-action">
        <BookHeart /> Wishlist
      </Link>
      <Link to="/shop/account/settings" className="list-group-item list-group-item-action">
        <Settings /> Settings
      </Link>
      <Link to="/shop/account/logout" className="list-group-item list-group-item-action text-danger">
        <LogOut /> Logout
      </Link>
    </div>
  );
};

export default AccountSidebar;
