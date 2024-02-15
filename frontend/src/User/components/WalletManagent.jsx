import React, { useEffect } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getWalletDetails } from "../../redux/features/userslice";
import date from "date-and-time";
import SyncLoader from "react-spinners/SyncLoader";
function WalletManagent() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.user.Wallet);
  const loading = useSelector((state) => state.user.loading);
  // const loading = true
  useEffect(() => {
    dispatch(getWalletDetails());
  }, [dispatch]);
  useEffect(() => {
    if (wallet) {
      console.log(wallet);
    }
  }, [wallet]);
  return (
    <div>
      <div className="">
        <h1 className="text-3xl ">Your Wallet Balance</h1>
        <div className="flex mx-32 mt-7">
          <div>
            <IoWalletOutline size={100} color="grey" />
          </div>
          <div className="mx-12 mt-5">
            {wallet && wallet.Balance > 0 ? (
              <h2 className="text-4xl">{`₹${wallet.Balance}`}</h2>
            ) : (
              <h2 className="text-4xl">₹0</h2>
            )}
          </div>
        </div>
      </div>
      <div className="mt-12 shadow-md rounded-md border">
        <table className="w-full">
          <thead className="h-10 ">
            <tr className="text-sm text-center text-slate-500 font-serif">
              <td>TRANSACTION ID</td>
              <td>AMOUNT</td>
              <td>TYPE</td>
              <td>DESCRIPTION</td>
              <td>DATE</td>
            </tr>
          </thead>
          <tbody>
            {wallet &&
              wallet.wallet.map((detail) => {
                return (
                  <tr className="border border-b-2 text-center h-12">
                    <td>{detail.id}</td>
                    <td>{detail.amount}</td>
                    <td>{detail.type}</td>
                    <td>{detail.Description}</td>
                    <td>{date.format(new Date(detail.Date), "D MMM YY")}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {loading && <div>
        <div className="flex justify-center align-middle mt-28">
          <SyncLoader
            color={"lightBlue"}
            // loading={loading}
            // cssOverride={override
            size={16}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        </div>}
      {!wallet && wallet.length === 0 && !loading ? (
        <div className="text-center pt-20 text-lg ">
          <p>No Transactions Yet</p>
        </div>
      ) : null}
    </div>
  );
}

export default WalletManagent;
