import React, { useEffect, useState } from "react";
import verfied from "../components/assets/tick.png";
import AuthenticatedNavbar from "./Navbar/AuthenticatedNavbar";
import { useSelector } from "react-redux";
import { BASE_URI } from "../../redux/features/api";
import { useNavigate } from "react-router";
import RingLoader from "react-spinners/RingLoader";
function OrderSucessPage() {
  const summary = useSelector((state) => state.Orders.summary);
  const loading = useSelector((state) => state.Orders.loading);
  // const loading = true;
  const [data, setData] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    if (summary) {
      console.log("Hello world: ", summary.products);
      setData(summary.products);
    }
  }, [summary]);
  return (
    <>
      <AuthenticatedNavbar />

      {loading ? (
        <div className="flex flex-col items-center mt-28 justify-start h-screen">
          <div>
            <RingLoader
              color={"lightBlue"}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          <p className="mt-4 text-2xl pt-4 font-serif text-gray-600">
            Your Order is Being Processing......
          </p>
        </div>
      ) : (
        <div>
          <div className="flex justify-center ">
            <img src={verfied} className="h-24 mt-10" alt="" />
          </div>
          <p className="text-center font-serif pt-3 text-xl">
            <span className="text-green-400">THANK YOU!</span> Your Order Has
            Been Processed{" "}
          </p>
          <div className="flex justify-center mt-10">
            <div className="w-80 h-72 bg-white shadow-md">
              <p className="font-serif text-center text-lg pt-3">
                Order Summary
              </p>

              {data.length !== 0 &&
                data.map((productr) => {
                  return (
                    <div className="flex">
                      <div className="flex mx-3 mt-4">
                        <img
                          src={`${BASE_URI}images/${productr.productImage}`}
                          className="h-10"
                          alt=""
                        />
                        <p className="pt-1 px-2 font-serif">
                          {productr.productName}{" "}
                          <span>({productr.quantity})</span>
                        </p>
                      </div>
                      <div className="mt-4 mx-8">
                        <p>{productr.Price * productr.quantity}</p>
                      </div>
                    </div>
                  );
                })}

              <div className="flex justify-around mx-5">
                <p className="font-serif px-6">Shipping</p>
                <p className="px-2 pr-10 font-serif">Free</p>
              </div>

              <hr className="mt-3" />
              <div className="flex justify-around mt-3">
                <p className="px-11 font-serif">Total Price</p>
                <p className=" font-serif pr-14">{summary.totalPrice}</p>
              </div>
              <div className="flex justify-center ">
                <p
                  className="pt-5 font-serif text-blue-700 underline cursor-pointer"
                  onClick={() =>
                    nav(`/routes/Orders/orderDetail/${summary.OrderId}`)
                  }
                >
                  View Details
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderSucessPage;
