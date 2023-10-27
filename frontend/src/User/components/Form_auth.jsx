import React, { useEffect, useState } from "react";
import "./Form_auth.css";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/features/userslice";
function Form_auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { loading, user, err } = useSelector((state) => state.user);
  const nav = useNavigate();

  const [password, setPassword] = useState("");
  const userCredentials = {
    name,
    email,
    password,
  };

  useEffect(() => {
    if (user) {
      nav("/otp");
    }
  }, [nav, user]);

  const dispatch = useDispatch();
  const submits = (e) => {
    e.preventDefault();
    dispatch(registerUser(userCredentials));
  };
  return (
    <div className="min-h-screen py-40 pt-32 main">
      <div className="container mx-auto">
        <div className=" flex flex-col lg:flex-row lg:w-8/12 w-10/12 bg-white rounded-xl mx-auto shadow-lg">
          <div className="lg:w-1/2 w-full brand flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"></div>
          <div className=" lg:w-1/2 w-full py-16 px-12">
            <h2 className="text-3xl pt-3 mb-5 font-serif">Register</h2>
            <form action="" onSubmit={submits}>
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Firstname"
                  className="border border-gray-400 py-1 px-2"
                />
                <input
                  type="text"
                  placeholder="Secondname"
                  className="border border-gray-400 py-1 px-2 mx-2"
                />
              </div>
              <div className="mt-5">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  className="border border-gray-400 py-1 px-2 w-full"
                />
                <p>{err}</p>
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <button
                  className="w-full py-3 text-center text-white  bg-purple-500"
                  type="submit"
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form_auth;
