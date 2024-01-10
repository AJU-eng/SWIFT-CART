import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCoupon } from "../../../redux/features/AdminSlice";

function CouponModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");
  const [expires, setExpires] = useState("");
  const [minPurchaseAmount, setminPurchaseAmount] = useState(0);
  const [maxPurchaseAmount, setmaxPurchaseAmount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addCoupon({
        couponCode: code,
        Date: expires,
        value: value,
        minPurchaseAmount: minPurchaseAmount,
        maxPurchaseAmount: maxPurchaseAmount,
      })
    );
  };

  return (
    visible && (
      <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center ">
        <div className="bg-white  w-[20rem] px-3 py-3 rounded-lg">
          <form action="" onSubmit={handleSubmit}>
            <p className="text-sm text-slate-600 font-medium p-3">
              COUPON CODE
            </p>
            <input
              type="text"
              onChange={(e) => setCode(e.target.value)}
              className="border mx-4"
            />
            <p className="text-sm text-slate-600 font-medium p-3">
              MIN PURCHASE AMOUNT
            </p>
            <input
              type="number"
              onChange={(e) => setminPurchaseAmount(e.target.value)}
              className="border mx-4"
            />
            <p className="text-sm text-slate-600 font-medium p-3">
              MAX PURCHASE AMOUNT
            </p>
            <input
              type="number"
              onChange={(e) => setmaxPurchaseAmount(e.target.value)}
              className="border mx-4"
            />
            <p className="text-sm font-medium text-slate-600 p-3">
              COUPON VALUE
            </p>
            <input
              type="text"
              onChange={(e) => setValue(e.target.value)}
              className="border mx-4 "
            />
            <p className="text-sm p-3 font-medium text-slate-600">
              COUPON EXPIRES
            </p>
            <input
              type="text"
              onChange={(e) => setExpires(e.target.value)}
              className="border mx-4"
            />
            <br />
            <button
              className="w-24 mt-3 shadow-sm rounded-lg font-medium mx-24 bg-blue-400 text-white"
              type="submit"
            >
              GENERATE
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default CouponModal;
