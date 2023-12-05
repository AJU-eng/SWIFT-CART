import React from "react";
import verfied from "../components/assets/tick.png";
import AuthenticatedNavbar from "./Navbar/AuthenticatedNavbar";
function OrderSucessPage() {
  return (
    <>
    <AuthenticatedNavbar/>
    <div >
      <div className="flex justify-center ">
        <img src={verfied} className="h-24 mt-10" alt="" />
      </div>
        <p className="text-center font-serif pt-3 text-xl"><span className="text-green-400">THANK YOU!</span> Your Order Has Been Processed  </p>
     
    </div>
    </>
  );
}

export default OrderSucessPage;
