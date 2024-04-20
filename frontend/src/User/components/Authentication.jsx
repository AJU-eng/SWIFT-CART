import React, { useEffect, useState } from "react";
import login from "./logins3.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/features/userslice";
import PulseLoader  from "react-spinners/PulseLoader";
import { CgPassword } from "react-icons/cg";
import { color } from "framer-motion";
function Authentication() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login_err = useSelector((state) => state.user.err);
  const loading = useSelector((state) => state.user.loading);
  const login_status = useSelector((state) => state.user.login_status);
  const hello={
    email,
    password
  }
  useEffect(() => {
    if (login_status == "logined") {
      nav("/home");
    } else if (login_status == "admin logined") {
      nav("/admin");
    }
  }, [login_status]);

  const loginUser = (e) => {
    e.preventDefault();
     console.log(hello);
    // console.log(email,password);
    dispatch(userLogin(hello))
  };
  // console.log(login_err+"=======================================err");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block mt-10">
        <img
          src={login}
          className="w-auto h-auto object-cover object-center"
          alt=""
        />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          action=""
          onSubmit={loginUser}
          className="max-w-[400px] w-full mx-auto  bg-white p-4"
        >
          <h2 className="text-4xl font-medium text-center py-6 font-serif">
            Welcome Back..!
          </h2>
          <div className="flex justify-center">

          {loading && (
            <PulseLoader loading={true} color={"lightblue"} size={30} aria-label="Loading Spinner" />
          )}
          </div>
          <p className="bg-red-200 w-56 text-red-800 px-2 font-serif">
            {login_err}
          </p>
          <div className="flex flex-col py-2">
            <label htmlFor="" className="font-serif">Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2"
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="" className="font-serif">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2"
            />
          </div>
          <button
            type="submit"
            className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Sign in
          </button>
          <div className="flex justify-between">
            <p
              className="flex items-center mr-2 text-md font-serif "
              onClick={() => nav("/forgetPassword")}
            >
              {/* <input type="checkbox" className="mr-2" /> */}
              <CgPassword className="mr-2" />
              Forget Password
            </p>
            <p
              className="font-serif"
              onClick={() => {
                nav("/register");
              }}
            >
              Create Account
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Authentication;
