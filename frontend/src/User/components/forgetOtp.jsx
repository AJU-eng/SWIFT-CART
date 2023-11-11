import React, { useEffect, useState } from "react";
import "./Otp.css";
import OtpInput from "otp-input-react";
import { useDispatch, useSelector } from "react-redux";
import { verifyForgetOtps, verifyUser } from "../../redux/features/userslice";
import { useNavigate } from "react-router";

function ForgetOtp() {
  const [otp, setOtp] = useState("");
  const email = useSelector((state) => state.user.email);
  const name = useSelector((state) => state.user.user.name);
  const password = useSelector((state) => state.user.user.password);
  const otp_status = useSelector((state) => state.user.otp_status);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const otp_sec = {
    OTP: otp,
    email: email,
  }
  useEffect(() => {
    console.log(otp_status+"=====================================================");
    if (otp_status === "otp verified") {
      // console.log(otp_status);
      nav("/resetPass")
    }
  }, [otp_status,nav]);

  
  const verify = () => {
    dispatch(verifyForgetOtps(otp_sec));
    console.log(otp_sec);
   
  };

  return (
    <div className="main min-h-screen py-40 bg-blue-300">
      <div className=" container mx-auto ">
        <div className="mx-auto  overflow-hidden bg-blue-500 w-4/12 rounded-lg ">
          <h1 className="text-center font-serif text-2xl mt-3 text-white">Verify OTP</h1>
          <p className="text-center mt-3 font-serif mb-6 text-white ">
            code has been send to your mail
          </p>
          <div className=" flex justify-center">
            <OtpInput
              value={otp}
              onChange={setOtp}
              // defaultInputValue=" "
              numInputs={4}
              // shouldAutoFocus={true}
              renderSeparator={<span>--</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <button
            onClick={verify}
            className="bg-blue-400 font-serif mx-52 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-20"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgetOtp;
