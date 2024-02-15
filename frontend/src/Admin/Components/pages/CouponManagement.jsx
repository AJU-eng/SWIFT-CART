import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import CouponModal from "./CouponModal";
import { useDispatch, useSelector } from "react-redux";
import { BlockCoupon, getCouponCodesAdmin, unBlockCoupon } from "../../../redux/features/AdminSlice";
import date from "date-and-time";
import { FaUnlock } from "react-icons/fa";
import { BiSolidLockAlt } from "react-icons/bi";

function CouponManagement() {
  const [visible, setVisible] = useState(false);
  const coupon = useSelector((state) => state.admin.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCouponCodesAdmin());
  }, [dispatch]);
  useEffect(() => {
    if (coupon) {
      console.log(coupon);
    }
  });
  const handleClose=()=>{
    setVisible(false)
  }
  return (
    <div>
      <div className="flex justify-end mr-5">
        <button
          onClick={() => setVisible(true)}
          className="bg-blue-400 rounded-lg pt-1 font-medium   w-[13rem]  text-white flex "
        >
          <IoMdAdd className="mx-2" size={23} />
          <span className="px-1 pb-1">GENERATE COUPON</span>
        </button>
      </div>
      <div className="mt-8   border rounded-xl shadow-md ">
        <table className="w-full ">
          <thead className=" h-10 ">
            <tr className="text-sm text-center text-slate-500 ">
              <td>No.</td>
              <td>COUPON </td>
              <td>VALUE</td>
              <td>STATUS</td>
              <td>GENERATED</td>
              <td>EXPIRES</td>
              <td>ACTION</td>
            </tr>
          </thead>
          <tbody>
            {coupon &&
              coupon.map((coup) => {
                return (
                  <tr className="border border-b-2 text-center h-12 ">
                    <td></td>
                    <td>{coup.code}</td>
                    <td>{coup.value}</td>
                    <td className="flex justify-center">
                      {coup.status == "Active" ? (
                        <div className="w-20 h-7 p-1 mt-1 border tracking-widest rounded-lg text-sm font-medium font-serif text-green-900 bg-green-300">
                          ACTIVE
                        </div>
                      ) : (
                        <div className="w-24 h-7 p-1 mt-2 border tracking-widest rounded-lg text-sm text-red-500 bg-red-200">
                          BLOCKED
                        </div>
                      )}
                    </td>
                    <td>
                      {" "}
                      {coup.createdAt
                        ? date.format(new Date(coup.createdAt), "D MMM YY")
                        : "no data"}
                    </td>
                    <td>
                      {coup.expirationDate
                        ? date.format(new Date(coup.expirationDate), "D MMM YY")
                        : "no data"}
                    </td>
                    <td className="flex justify-center">{coup.status === "Active"? (
                      <FaUnlock onClick={()=>dispatch(BlockCoupon({_id:coup._id}))}/>
                    ):<BiSolidLockAlt onClick={()=>dispatch(unBlockCoupon({_id:coup._id}))}/>}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <CouponModal visible={visible} onClose={handleClose} />
    </div>
  );
}

export default CouponManagement;
