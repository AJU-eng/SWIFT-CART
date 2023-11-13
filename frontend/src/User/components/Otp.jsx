import React, { useEffect, useState } from "react";
import OtpInput from "otp-input-react";
import { useDispatch, useSelector } from "react-redux";
import { resendOtps, verifyUser } from "../../redux/features/userslice";
import { useNavigate } from "react-router";

function Otp() {
  const [otp, setOtp] = useState("");
  const email = useSelector((state) => state.user.user.email);
  const userCredentials=useSelector((state)=>state.user.user)
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
  }, [otp_status]);

  const verify = () => {
    dispatch(verifyUser(otp_sec));
  };

  return (
    <div className="main min-h-screen py-40 bg-blue-300">
      <div className=" container mx-auto ">
        <div className="mx-auto  overflow-hidden bg-blue-500 w-4/12 rounded-lg h-80 ">
          <h1 className="text-center font-serif text-2xl mt-3 text-white">
            Verify OTP
          </h1>
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
          <div className="flex justify-center">
            <button
              onClick={verify}
              className="bg-blue-400 font-serif  mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "
            >
              Verify
            </button>
          </div>
          <div className="mt-9">
            <div className="flex justify-end mr-5">
              <p className="font-serif text-white text-sm">Don't recieve otp?</p>
            </div>
            <div className="flex justify-end mr-10" onClick={()=>dispatch(resendOtps(userCredentials))}>
              <p className="font-serif text-white text-sm">Resend Otp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
