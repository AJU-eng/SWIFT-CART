import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveReturns,
  getReturns,
  rejectReturns,
  singleReturns,
} from "../../../redux/features/AdminSlice";
// import ReasonModal from "./ReturnReason";
import ReasonModals from "./viewReason";

function ReturnManagment() {
  const dispatch = useDispatch();
  const returnso = useSelector((state) => state.admin.returns);
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState("");
  useEffect(() => {
    dispatch(getReturns());
  }, [dispatch]);
  useEffect(() => {
    if (returnso) {
      console.log(returnso);
    }
  }, [returnso]);
  const handleClose = () => {
    setVisible(false);
  };
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
            returnso.map((ret) => {
              return (
                <tr className="border border-b-2 text-center h-12 font-serif">
                  <td>{ret.returns.productName}</td>
                  <td>{ret.returns.price}</td>
                  <td>{ret.returns.status}</td>
                  <td
                    onClick={() => {
                      setReason(ret.returns.reason);
                      setVisible(true);
                    }}
                    className="cursor-pointer underline text-blue-400"
                  >
                    <p>View Reason</p>
                  </td>
                  {ret.returns.status === "requested" ? (
                    <td className="flex justify-around mt-2">
                      <button
                        onClick={() =>
                          dispatch(
                            approveReturns({
                              id: ret.returns.id,
                              price: ret.returns.price,
                              productId: ret.returns.productId,
                              orderId: ret.returns.orderId,
                              user: ret.returns.user,
                            })
                          )
                        }
                        className="w-20 bg-blue-400 rounded-md text-white h-7"
                      >
                        Approve
                      </button>
                      <button
                        className="w-20 bg-red-400 rounded-md text-white"
                        onClick={() =>
                          dispatch(
                            rejectReturns({
                              id: ret.returns.id,
                              productId: ret.returns.productId,
                              orderId: ret.returns.orderId,
                            })
                          )
                        }
                      >
                        Reject
                      </button>
                    </td>
                  ) : ret.returns.status === "approved" ? (
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
      <ReasonModals visible={visible} onClose={handleClose} reason={reason} />
    </div>
  );
}

export default ReturnManagment;
