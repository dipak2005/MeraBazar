import React from 'react';
import { useSelector } from 'react-redux';

function SellerDashboard() {
    const {user} = useSelector((state)=> state.auth);
    const {seller} = useSelector((state)=> state.sellerAuth);
    console.log("Dispatch result:", user);
     console.log("Dispatch  for seller result:", seller);
    return ( 
        <div>Welcome to Mera MarketPlace : {user.username}</div>

     );
}

export default SellerDashboard;