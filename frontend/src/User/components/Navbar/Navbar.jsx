import React from "react";
import logo from "./logo.png";
import { useNavigate } from "react-router";
function Navbar() {
  const nav=useNavigate()
  return (
    <div className="flex justify-between sticky ">
      <div className=" w-1/2">
        <img src={logo} className=" w-36 lg:w-48 mt-2 mx-5" alt="" />
      </div>
      <div className=" w-1/2  lg:flex lg:justify-end">
        <div className="hidden lg:flex justify-around space-x-10 mt-3  text-xl font-serif ">
          <p>Home</p>
          <p>Products</p>
          <p>Support</p>
        </div>

        <button onClick={()=>nav('/login')} className="bg-blue-400 mx-14  text-xl rounded-md h-9 text-white  mt-2 w-20">
          Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;
