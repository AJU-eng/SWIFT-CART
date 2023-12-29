import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import logo from "./logo.png";
import { HiOutlineLogout } from "react-icons/hi";
import home from "./smart-home.svg";
import users from "./users.svg";
import coupon from "./coupon.svg";
import cart from "./shopping-cart.svg";
import transaction from "./transaction.svg";
import category from "./cateogry.svg";
import { NavLink } from "react-router-dom";
import Add from "./Add.svg";
import products from "./products.svg";

import smallLogo from "./smallLogo.png";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AdminLogout } from "../../../redux/features/userslice";
function SideBarDesign() {
  const nav = useNavigate();
  const Sidebar_animation = {
    open: {
      width: "16rem",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: "4rem",
      transition: {
        damping: 40,
      },
    },
  };
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const handleLogout=()=>{
    dispatch(AdminLogout())
    // let navigate=nav("/")
    if (nav("/")) {
      console.log("navigated");
    }
    else{
      console.log("nav is not working");
    }
    // nav("/")
  }
  return (
    <div>
      <motion.div
        variants={Sidebar_animation}
        animate={isOpen ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed "
      >
        {isOpen ? (
          <div>
            <img className="w-2/3 mx-2 my-2" src={logo} alt="" />

            <div className="font-serif flex flex-col">
              <h1 className="text-xs mx-6 my-5 flex-1 text-slate-600">
                MAIN MENU
              </h1>
              <NavLink to="Dash">
              <div className="flex mx-9 flex-1">
                <img src={home} alt="" />
                <h1 className="text-sm mx-2   text-slate-500">Dashboard</h1>
              </div>
              </NavLink>
              <NavLink to="orders">
              <div className="flex mx-9 flex-1">
                <img src={cart} alt="" />
                <h1 className="text-sm mx-2 my-4   text-slate-500">
                  Order Managment
                </h1>
              </div>
              </NavLink>
              <NavLink to="user">
                <div className="flex mx-9 flex-1">
                  <img src={users} alt="" />
                  <h1 className="text-sm mx-2 my-3 text-slate-500">
                    Customers
                  </h1>
                </div>
              </NavLink>
              <div className="flex mx-9  flex-1">
                <img src={coupon} alt="" />
                <h1 className="text-sm mx-2 my-3  text-slate-500">
                  Coupon code
                </h1>
              </div>
              <NavLink to="category">
                <div className="flex mx-9 flex-1">
                  <img src={category} alt="" />
                  <h1 className="text-sm mx-2 my-3 text-slate-500">
                    Categories
                  </h1>
                </div>
              </NavLink>
              {/* <div className="flex mx-9 flex-1">
                <img src={transaction} alt="" />
                <h1 className="text-sm mx-2 my-3 text-slate-500">
                  Transaction
                </h1>
              </div> */}
            </div>

            <div className="font-serif flex flex-col">
              <h1 className="text-xs mx-6 my-5 flex-1 text-slate-500">
                PRODUCTS
              </h1>
              <NavLink to="addProducts">
                <div className="flex mx-9 flex-1">
                  <img src={Add} alt="" />
                  <h1 className="text-sm mx-2   text-slate-500">
                    Add Products
                  </h1>
                </div>
              </NavLink>
              <NavLink to="products">
                <div className="flex mx-9 flex-1">
                  <img src={products} alt="" />
                  <h1 className="text-sm mx-2 my-4   text-slate-500">
                    Products Managment
                  </h1>
                </div>
              </NavLink>
            </div>
            <div className="font-serif flex flex-col">
              <h1 className="text-xs mx-6 my-5 flex-1 text-slate-500">ADMIN</h1>
              {/* <div className="flex mx-9 flex-1">
                <img src={Add} alt="" />
                <h1 className="text-sm mx-2   text-slate-500">Manage Admins</h1>
              </div> */}
              <div className="flex mx-9 flex-1">
                <img src={products} alt="" />
                <h1 className="text-sm mx-2    text-slate-500">
                  Add Banner
                </h1>
              </div>
             
                <div
                  className="flex mx-10 flex-1 my-2"
                  onClick={handleLogout}
                >
                  <HiOutlineLogout className="mt-1 " size={20} color="gray" />
                  <h1 className="text-md mx-2    text-slate-500">Logout</h1>
                </div>
             
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <img src={smallLogo} className="h-10 mx-2 my-2" />
            <img src={home} />
            <img src={cart} />
            <img src={users} />
            <img src={coupon} />
            <img src={category} />
            <img src={transaction} />
            <img src={Add} />
            <img src={products} />
          </div>
        )}

        <div className="absolute w-fit h-fit z-50 right-4 bottom-3   cursor-pointer md:block hidden">
          <IoIosArrowBack onClick={() => setIsOpen(!isOpen)} size={25} />
        </div>
      </motion.div>
    </div>
  );
}

export default SideBarDesign;
