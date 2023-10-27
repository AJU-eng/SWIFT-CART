import React, { useEffect, useState } from "react";
import "./Otp.css";
import OtpInput from "otp-input-react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../../redux/features/userslice";
import { useNavigate } from "react-router";

function Otp() {
  const [otp, setOtp] = useState("");
  const email = useSelector((state) => state.user.user.email);
  const name = useSelector((state) => state.user.user.name);
  const password = useSelector((state) => state.user.user.password);
  const otp_status = useSelector((state) => state.user.otp_status);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const otp_sec = {
    OTP: otp,
    email: email,
    name: name,
    password: password,
  };

  useEffect(() => {
    if (otp_status === "otp verified") {
      nav("/home");
    }
  }, [otp_status, nav]);

  const verify = () => {
    dispatch(verifyUser(otp_sec));
   
  };

  return (
    <div className="main min-h-screen py-40">
      <div className=" container mx-auto ">
        <div className="mx-auto backdrop-filter backdrop-blur-sm bg-opacity-10 overflow-hidden bg-white w-4/12 rounded-lg ">
          <h1 className="text-center font-serif text-2xl mt-3">Verify OTP</h1>
          <p className="text-center mt-3 font-serif mb-6 ">
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
            className="bg-blue-500 mx-52 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-20"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otp;
