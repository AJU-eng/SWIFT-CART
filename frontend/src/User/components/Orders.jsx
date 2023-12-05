import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderedDataAction, cancelOrder } from "../../redux/features/userslice";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.user.OrderedData);

  useEffect(() => {
    dispatch(OrderedDataAction());
  }, [dispatch]);

  return (
    <div className="flex">
      <div className=" px-12  min-h-screen w-2/3">
        <div className="flex  w-[54rem] justify-center mt-10 rounded-lg shadow-md   bg-white ">
          <p className="font-serif ">PRODUCT IMAGE</p>
          <p className="mx-7 font-serif px-10">PRODUCT </p>
          <p className="font-serif  px-2">QUANTITY</p>
          <p className="font-serif px-10">TOTAL PRICE</p>
          <p className="font-serif ">STATUS</p>
        </div>

        {orders.map((item) => {
          return (
            <div className=" w-[54rem]  mt-1 rounded-lg bg-white shadow-lg">
              <div className="flex   ">
                <div className=" mx-20 ">
                  {item.products.map((order) => {
                    return (
                      <div className="h-20   flex   font-serif">
                        <img
                          src={`http://localhost:3000/images/${order.productImage}`}
                          className="h-20 "
                          alt=""
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="">
                  {item.products.map((order) => {
                    return (
                      <div className=" px-8 h-[5rem] ">
                        <p className="text-[1rem] pt-3 font-serif ">
                          {order.productName}
                        </p>
                        <p className="pt-2">{`₹${order.Price}`}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="text-lg  font-serif">
                  {item.products.map((order) => {
                    return (
                      <div className=" px-16  h-[5rem] ">
                        <p className="text-xl pt-3  ">{order.quantity}</p>
                      </div>
                    );
                  })}
                </div>

                <div className=" flex mt-7  ">
                  <div className="mt-1 px-5 ">
                    <p className="pt-2 text-lg  ">{`₹${item.totalPrice}`}</p>
                  </div>
                </div>
                <div className="text-lg    font-serif">
                  <div className="px-16">
                    {item.status === "pending" ? (
                      <div className="h-8 mt-10 flex  rounded-lg w-[5rem] bg-orange-200">
                        <p className="text-center text-md pt-1 px-3 text-[0.95rem] text-orange-500 ">Pending</p>
                        <button onClick={()=>dispatch(cancelOrder({price:item.totalPrice}))} className="px-5 h-7 w-[5rem] mx-3 rounded-lg text-red-500  bg-red-200 text-[0.95rem]">cancel</button>
                      </div>
                    ) : item.status === "Shipped" ? (
                      <div className="h-8 mt-10 rounded-lg w-[5rem] bg-orange-200 ">
                        <p className="text-center text-md pt-1 text-[0.98rem] text-orange-500 ">Shipped</p>
                      </div>
                    ) : item.status==="cancelled"?(
                        <div className="h-8 mt-10 rounded-lg w-[5rem] bg-red-100">

                            <p className="text-center text-md pt-1 text-[0.98rem] text-red-500">Canelled</p>
                        </div>
                    ):(
                        <div className="h-8 mt-10 rounded-lg w-[5rem] bg-teal-100">

                        <p className="text-center text-md pt-1 text-[0.98rem] text-teal-500">Delivered</p>
                    </div>  
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
