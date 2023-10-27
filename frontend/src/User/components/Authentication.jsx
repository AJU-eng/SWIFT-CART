import React, { useEffect, useState } from "react";
import login from "./logins3.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/features/userslice";

function Authentication() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const login_status = useSelector((state) => state.user.login_status);

  useEffect(() => {
    if (login_status == "logined") {
      nav("/home");
    }
  },[nav,login_status]);

  const loginUser = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block mt-10">
        <img src={login} className="w-auto h-auto object-cover object-center" alt="" />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          action=""
          onSubmit={loginUser}
          className="max-w-[400px] w-full mx-auto bg-white p-4"
        >
          <h2 className="text-4xl font-medium text-center py-6 font-serif">
            Welcome Back..!
          </h2>
          <div className="flex flex-col py-2">
            <label htmlFor="">Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2"
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="">Password</label>
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
            <p className="flex items-center mr-2 ">
              {" "}
              <input type="checkbox" className="mr-2" />
              Remember me
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
