import React, { useEffect, useRef, useState } from "react";
import OtpInput from "otp-input-react";
import { useDispatch, useSelector } from "react-redux";
import { resendOtps, verifyUser } from "../../redux/features/userslice";
import { useNavigate } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
function Otp() {
  const [otp, setOtp] = useState("");
  const email = useSelector((state) => state.user.user.email);
  const userCredentials = useSelector((state) => state.user.user);
  const name = useSelector((state) => state.user.user.name);
  const password = useSelector((state) => state.user.user.password);
  const otp_status = useSelector((state) => state.user.otp_status);
  const loading = useSelector((state) => state.user.loading);
  // const loading=useState(true)
  const ref = useRef();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [err, setError] = useState("");
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
    if (!otp) {
      setError("Invalid Otp");
    } else {
      dispatch(verifyUser(otp_sec));
    }
  };

  return (
    <div className="main min-h-screen py-40 ">
      <div className=" container mx-auto ">
        <div className="mx-auto  overflow-hidden border bg-slate-50 shadow-md w-4/12 rounded-lg  ">
          <h1 className="text-center font-serif text-2xl mt-3 text-black">
            Verify OTP
          </h1>
          <p className="text-center mt-3 font-serif mb-2 text-black ">
            code has been send to your mail
          </p>
          {/* <p className="text-center  text-red-600 font-serif">{err}</p> */}
          {/* {err?<p>{err}</p>:<p>{otp_sec}</p>} */}

          <div className="flex justify-center mb-6">
            {loading && (
              <PulseLoader
                //  className=
                loading={loading}
                color={"lightblue"}
                size={30}
                aria-label="Loading Spinner"
              />
            )}
          </div>

         
          {}
          <div className=" flex justify-center ">
            <OtpInput
              value={otp}
              onChange={setOtp}
              // defaultInputValue=" "
              numInputs={4}
              shouldAutoFocus={true}
              renderSeparator={<span>--</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    backgroundColor: "#000000",
                    border: "1px solid black",
                  }}
                />
              )}
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
              <p className="font-serif text-black text-md">
                Don't recieve otp?
              </p>
            </div>
            <div
              className="flex justify-end mr-10"
              onClick={() => {
                dispatch(resendOtps(userCredentials));
                toast.success("Otp Resended Sucessfully");
              }}
            >
              <p className="font-serif text-blue-600 mb-5 pt-1 underline cursor-pointer  text-md">
                Resend Otp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
