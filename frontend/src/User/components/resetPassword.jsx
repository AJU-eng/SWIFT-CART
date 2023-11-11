import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { passwordReset } from "../../redux/features/userslice";

function ResetPassword() {
    const email=useSelector(state=>state.user.email)
    const dispatch=useDispatch()
    const [password,setPassword]=useState("")
    const passUpdate=(e)=>{
        e.preventDefault()
        console.log("hello world");
       const upData={
        email:email,
        password:password
       }
      dispatch(passwordReset(upData))
       
    }
  return (
    <div className="flex justify-center bg-slate-50 min-h-screen">
      <div className="w-[28rem] bg-white h-60 mt-7 shadow-lg">
        <h2 className="text-center font-serif text-xl pt-2 mb-3">
          Reset Password
        </h2>
        <form action="" onSubmit={passUpdate}>
          <label htmlFor=""  className="font-serif mx-3  ">
            New password
          </label>
          <br />
          <input type="password" onChange={(e)=>setPassword(e.target.value)} className="mt-2 mx-3 mb-2  border border-blue-200" />
          <br />
          <label htmlFor="" className="font-serif mx-3  ">
            Confirm password
          </label>
          <br />

          <input type="password" className="mt-2 mx-3 border border-blue-200" /><br />
          <div className="flex justify-center">

          <button type="submit" className="font-serif bg-blue-400 text-white w-20 rounded-lg h-8 text-lg  mt-6">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
