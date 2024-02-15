import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReturns, singleReturns } from "../../../redux/features/AdminSlice";
// import { singleOrder } from "../../../redux/features/userslice";
// import { returnOrder } from "../../redux/features/userslice";

function viewReason({ visible, onClose,reason }) {
  if (!visible) {
    return null;
  }
  const dispatch = useDispatch();
//   const reason = useSelector((state) => state.admin.singleReturn[0]);
  
//   useEffect(() => {
//     if (reason) {
//      console.log(reason);
//     }
//   });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-[20rem] ">
        <h1 className="px-2 pt-4 font-serif text-lg">
          Reason For Return Decision
        </h1>
        <p className="px-3 pt-3 font-serif">{reason}</p>
        <br />
        <div className="flex justify-center">
          <button
            className="bg-blue-400 w-[5rem] mb-6 mt-3 text-white rounded-md"
            onClick={() => onClose()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default viewReason;
