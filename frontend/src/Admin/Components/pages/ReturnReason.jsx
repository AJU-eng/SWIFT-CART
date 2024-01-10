import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReturns } from "../../../redux/features/AdminSlice";
import { singleOrder } from "../../../redux/features/userslice";
// import { returnOrder } from "../../redux/features/userslice";

function ReasonModal({ visible }) {
  //   const [reason, setReason] = useState("");
  if (!visible) {
    return null;
  }
  //   const dispatch = useDispatch();
  const reason = useSelector((state) => state.admin.singleReturn[0]);


  useEffect(()=>{
    if (reason) {
       reason 
    }
  })
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-[20rem] ">
        <h1 className="px-2 pt-4 font-serif text-lg">
          Reason For Return Decision
        </h1>
        <textarea
          value={reason}
          //   onChange={(e) => setReason(e.target.value)}
          name=""
          placeholder="type here..."
          className="border mx-5 mt-5"
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>
  );
}

export default ReasonModal;
