import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { returnOrder } from "../../redux/features/userslice";
import { useNavigate } from "react-router";

function RequestModal({ obj, visible }) {
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();
  const nav=useNavigate()

  if (!visible) {
    return null;
  }

  const handleSubmit = () => {
    // visible=false
    dispatch(
      returnOrder({
        name: obj.name,
        price: obj.price,
        reason: reason,
        orderId: obj.orderId,
        productId: obj.productId,
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-[20rem] ">
        <h1 className="px-2 pt-4 font-serif text-lg">
          Reason For your Return Decision
        </h1>
        <textarea
          //   value={reason}
          onChange={(e) => setReason(e.target.value)}
          name=""
          placeholder="type here..."
          className="border mx-5 mt-5"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button
          onClick={() => {
            handleSubmit();
            nav("/routes/Orders")
          }}
          className="bg-blue-500 w-[5rem] mx-[7rem] mt-4 mb-8 rounded-lg font-serif text-white"
        >
          submit
        </button>
      </div>
    </div>
  );
}

export default RequestModal;
