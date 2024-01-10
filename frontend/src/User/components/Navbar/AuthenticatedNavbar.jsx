import React, { useState } from "react";
import logo from "./logo.png";
import cart from "./cart.svg";
import { useDispatch } from "react-redux";
import { logouts } from "../../../redux/features/userslice";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";

function AuthenticatedNavbar() {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  return (
    <div className="flex justify-between sticky shadow-md ">
      <div className=" w-1/2">
        <img src={logo} className=" w-36 lg:w-48 mt-2 mx-5 lg:mx-2" alt="" />
      </div>
      <div className=" w-1/2  lg:flex justify-end">
        <div className="hidden lg:flex justify-around space-x-10 mt-3 mx-5  text-xl font-serif ">
          <p onClick={() => nav("/")}>Home</p>
          <p>Products</p>
          <p>Support</p>
          <div>
            <p
              onClick={() => {
                // e.stopPropagation()
                setVisible(!visible);
              }}
            >
              My Account
            </p>

            {visible && (
              <div className="bg-white absolute mt-1  w-28 text-[1.1rem] space-y-2 rounded-md shadow-md z-20 ">
                <div className="flex justify-center mt-3 ">
                  <CgProfile size={23} className="mt-1" />

                  <p className="px-1 " onClick={() => nav("/routes/user")}>
                    Profile
                  </p>
                </div>
                <div className="flex justify-center ">
                  <MdOutlineShoppingBag size={23} />

                  <p className="px-1" onClick={() => nav("/routes/Orders")}>
                    Orders
                  </p>
                </div>
                <div className="flex justify-center">
                  <CiHeart size={23} />

                  <p className="px-1" onClick={() => nav("/routes/wishlist")}>
                    wishlist
                  </p>
                </div>
                <div className="flex  justify-center ">
                  <IoMdExit size={23} />

                  <p
                    className="px-1"
                    onClick={() => {
                      dispatch(logouts());
                      nav("/");
                    }}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className=" flex space-x-2" onClick={() => nav("/cart")}>
            <img src={cart} className="w-8" alt="" />
            {/* <p className=" font-serif mt-1">Cart</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticatedNavbar;
