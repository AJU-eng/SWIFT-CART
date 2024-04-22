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
// import logo from "./logo.png";
import { HiOutlineLogout } from "react-icons/hi";
import profile from "../components/assets/Profile.svg";
import WishList from "../components/assets/wishList.svg";
import Orders from "../components/assets/Orders.svg";
import history from "../components/assets/Orderhistory.svg";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineLocalOffer } from "react-icons/md";


import Address from "../components/assets/Address.svg";
// import category from "./cateogry.svg";
import { NavLink } from "react-router-dom";
// import Add from "./Add.svg";
// import products from "./products.svg";

// import smallLogo from "./smallLogo.png";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import AuthenticatedNavbar from "./Navbar/AuthenticatedNavbar";
// import { AdminLogout } from "../../../redux/features/userslice";
function UserSideBar() {
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
  const handleLogout = () => {
    dispatch(AdminLogout());
    // let navigate=nav("/")
    if (nav("/")) {
      console.log("navigated");
    } else {
      console.log("nav is not working");
    }
    // nav("/")
  };
  return (
    <>
      {/* <AuthenticatedNavbar/> */}
      <div>
        <motion.div
          variants={Sidebar_animation}
          animate={isOpen ? "open" : "closed"}
          className="bg-white text-gray shadow-xl z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed "
        >
          {isOpen ? (
            <div>
              {/* <img className="w-2/3 mx-2 my-2" src={logo} alt="" /> */}

              <div className="font-serif flex flex-col space-y-3">
                <NavLink to="user">
                <div className="flex mx-9 flex-1 mt-7">
                  <img src={profile} className="h-4 mt-1" alt="" />
                  <h1 className="text-[1rem] mx-2   text-slate-500">
                    Profile Managment
                  </h1>
                </div>
                </NavLink>
              <NavLink to="wishlist">
                <div className="flex mx-9 flex-1">
                  <img src={WishList} className="h-4 mt-6" alt="" />
                  <h1 className="text-lg mx-2 my-4   text-slate-500">
                    Wish List
                  </h1>
                </div>
                </NavLink>
                <NavLink to="wallet">
                  <div className="flex mx-9 flex-1">
                    <IoWalletOutline size={21} className="mt-3" color="#475569"/>
                    <h1 className="text-lg mx-2 my-3 mt-2 text-slate-500">
                     Wallet
                    </h1>
                  </div>
                </NavLink>
                <NavLink to="Orders">
                <div className="flex mx-9  flex-1">
                  <img src={Orders} className="h-4 mt-4" alt="" />
                  <h1 className="text-lg mx-2 my-3  text-slate-500">Orders</h1>
                </div>
                </NavLink>
                {/* <NavLink to="Orders">
                <div className="flex mx-9  flex-1">
                 <MdOutlineLocalOffer size={21} className="mt-4" color="#475569"/>
                  <h1 className="text-lg mx-2 my-3  text-slate-500">Coupons</h1>
                </div>
                </NavLink> */}
                <NavLink to="address">
                  <div className="flex mx-9 flex-1">
                    <img src={Address} className="h-4 mt-4" alt="" />
                    <h1 className="text-lg mx-2 my-3 text-slate-500">
                      Manage Address
                    </h1>
                  </div>
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* <img src={smallLogo} className="h-10 mx-2 my-2" />
            <img src={home} />
            <img src={cart} />
            <img src={users} />
            <img src={coupon} />
            <img src={category} />
            <img src={transaction} />
            <img src={Add} />
            <img src={products} /> */}
            </div>
          )}

          <div className="absolute w-fit h-fit z-50 right-4 bottom-3   cursor-pointer md:block hidden">
            <IoIosArrowBack onClick={() => setIsOpen(!isOpen)} size={25} />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default UserSideBar;
