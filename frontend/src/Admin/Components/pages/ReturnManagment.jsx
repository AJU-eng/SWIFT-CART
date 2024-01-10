import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveReturns, getReturns, singleReturns } from "../../../redux/features/AdminSlice";
import ReasonModal from "./ReturnReason";

function ReturnManagment() {
  const dispatch = useDispatch();
  const returnso = useSelector((state) => state.admin.returns[0]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    dispatch(getReturns());
  }, [dispatch]);
 
  return (
    <div>
      <table className="w-full">
        <thead className="h-10">
          <tr className="text-sm text-center text-slate-500 font-serif">
            <td>PRODUCT NAME</td>
            <td>PRODUCT PRICE</td>
            <td>STATUS</td>
            <td>REASON</td>
            <td>ACTION</td>
          </tr>
        </thead>
        <tbody>
          {returnso &&
            returnso.returns.map((ret) => {
              return (
                <tr className="border border-b-2 text-center h-12 font-serif">
                  <td>{ret.productName}</td>
                  <td>{ret.price}</td>
                  <td>{ret.status}</td>
                  <td
                    onClick={() => {
                        dispatch(singleReturns({id:ret.id}))
                    //   setVisible(true);
                    }}
                    className="cursor-pointer underline text-blue-400"
                  >
                    <p>View Reason</p>
                  </td>
                  {ret.status === "requested" ? (
                    <td className="flex justify-around mt-2">
                      <button onClick={()=>dispatch(approveReturns({id:ret.id,price:ret.price,user:returnso.userId}))} className="w-20 bg-blue-400 rounded-md text-white h-7">
                        Approve
                      </button>
                      <button className="w-20 bg-red-400 rounded-md text-white">
                        Reject
                      </button>
                    </td>
                  ) : ret.status === "approved" ? (
                    <td className="flex justify-around mt-2">
                      <button className="w-40 bg-blue-400 rounded-md text-white h-7">
                        Already approved
                      </button>
                    </td>
                  ) : (
                    <td className="flex justify-around mt-2">
                      <button className="w-40 bg-red-400 rounded-md text-white h-7">
                        Already Rejected
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
      <ReasonModal visible={visible} />
    </div>
  );
}

export default ReturnManagment;
