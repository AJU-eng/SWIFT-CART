import React, { useState } from "react";
import logo from "./logo.png";
import cart from "./cart.svg";
import { useDispatch } from "react-redux";
import { logouts } from "../../../redux/features/userslice";
import { useNavigate } from "react-router";

function AuthenticatedNavbar() {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const nav=useNavigate()
  return (
    <div className="flex justify-between sticky ">
      <div className=" w-1/2">
        <img src={logo} className=" w-36 lg:w-48 mt-2 mx-5 lg:mx-2" alt="" />
      </div>
      <div className=" w-1/2  lg:flex justify-end">
        <div className="hidden lg:flex justify-around space-x-10 mt-3 mx-5  text-xl font-serif ">
          <p>Home</p>
          <p>Products</p>
          <p>Support</p>
          <div>
            <p onClick={() => setVisible(!visible)}>My Account</p>

            {visible && (
              <div className="bg-teal-800 absolute mt-2 w-28 text-md">
                <p>Profile</p>
                <p>Orders</p>
                <p>wishlist</p>
                <p>Wallet</p>
                <p
                  onClick={() => {
                    dispatch(logouts());
                    nav("/")
                  }}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
          <div className=" flex space-x-2">
            <img src={cart} className="w-8" alt="" />
            {/* <p className=" font-serif mt-1">Cart</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticatedNavbar;
