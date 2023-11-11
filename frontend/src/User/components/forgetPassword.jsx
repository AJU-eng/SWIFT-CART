import React, { useState } from "react";
import { forgetOtp } from "../../redux/features/userslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const emails = useSelector((state) => state.user.email);
  const errors = useSelector((state) => state.user.err);
  const nav = useNavigate(); // Corrected by adding parentheses
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetOtp(email));
  };

  if (emails) {
    nav("/otpForgetPassword");
  }
  return (
    <div className="flex justify-center bg-gray-50 min-h-screen">
      <div className="w-[30rem] bg-white mt-12 shadow-md h-44">
        <h1 className="font-serif text-center pt-3 text-lg">
          Enter your Email Address
        </h1>
        <p className="text-sm font-serif text-center pt-2 p-2">
          Enter the email address associated with your account, and we'll send
          you an OTP to reset your password
        </p>
        <form action="" onSubmit={handleSubmit} className="mx-32 mt-3">
          <input
            type="text"
            className="border border-black w-56"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-red-600 font-serif">{errors}</p>
          <button className="font-serif bg-blue-400 rounded-lg w-20 mx-16 mt-3 text-white">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
