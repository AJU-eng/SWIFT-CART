import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderedDataAction, cancelOrder } from "../../redux/features/userslice";
import { Navigate, useNavigate } from "react-router";
import { URL } from "../../redux/features/api";
function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.user.OrderedData);
  const nav=useNavigate()
  useEffect(() => {
    dispatch(OrderedDataAction());
  }, [dispatch]);
  useEffect(()=>{
   if (orders) {
    orders.map((order)=>{
      console.log(order.products);
    })
   }
  },[orders])

  return (
    <div className="flex">
      <div className=" px-12  min-h-screen w-2/3">
        <div className="flex  w-[58rem] justify-center mt-10 rounded-lg shadow-md   bg-white ">
          <p className="font-serif ">PRODUCT IMAGE</p>
          <p className="mx-7 font-serif px-10">PRODUCT </p>
          <p className="font-serif  px-2">QUANTITY</p>
          <p className="font-serif px-10">TOTAL PRICE</p>
          <p className="font-serif ">STATUS</p>
        </div>

        {orders.map((item) => {
          return (
            // <Navigate to="orderDetail">
            <div onClick={()=>nav(`orderDetail/${item.OrderId}`)} className=" w-[58rem]  mt-1 rounded-lg bg-white shadow-lg">
              <div className="flex justify-center  ">
                <div className=" mx-20 ">
                  {item.products.map((order) => {
                    return (
                      <div className="h-20   flex   font-serif">
                        <img
                          src={`${URL}images/${order.productImage}`}
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
                      <div className=" px-16 mx-4  h-[5rem] ">
                        <p className="text-xl pt-3  ">{order.quantity}</p>
                      </div>
                    );
                  })}
                </div>

                <div className=" flex mt-7  ">
                  <div className="mt-1  mx-5 ">
                    <p className="pt-2 text-lg  ">{`₹${item.totalPrice}`}</p>
                  </div>
                </div>
                <div className="text-lg    font-serif">
                  <div className="px-16">
                    {item.status === "pending" ? (
                      <div className="h-8 mt-10 flex  rounded-lg w-[5rem] bg-orange-200">
                        <p className="text-center text-md pt-1 px-3 text-[0.95rem] text-orange-500 ">
                          Pending
                        </p>
                        <button
                          onClick={() =>
                            dispatch(cancelOrder({ price: item.totalPrice }))
                          }
                          className="px-5 h-8 w-[5rem] mx-3 rounded-lg text-red-500  bg-red-200 text-[1rem]"
                        >
                          cancel
                        </button>
                      </div>
                    ) : item.status === "Shipped" ? (
                      <div className="h-8 mt-10 rounded-lg w-[5rem] bg-orange-200 ">
                        <p className="text-center text-md pt-1 text-[0.98rem] text-orange-500 ">
                          Shipped
                        </p>
                      </div>
                    ) : item.status === "cancelled" ? (
                      <div className="h-8 mt-10 rounded-lg w-[5rem] bg-red-100">
                        <p className="text-center text-md pt-1 text-[0.98rem] text-red-400">
                          cancelled
                        </p>
                      </div>
                    ) : (
                      

                      <div className="h-8 mt-10 flex rounded-lg w-[5rem] bg-green-300">
                        <p className="px-2 text-md pt-1 text-[0.98rem] text-green-700">
                          Delivered
                        </p>
                       
                      </div>
                     
                     
                    )}
                  </div>
                </div>
              </div>
            </div>
            // </Navigate>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
