import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editOrderstatus, getOrders } from "../../../redux/features/AdminSlice";

function OrdersManagment() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.admin.Orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      orders.map((items) => {
        items.products.map((item) => {
          console.log(item.totalPrice);
        });
      });
    }
  }, [orders]);
  return (
    <div className="flex">
      <div className=" px-12  min-h-screen w-2/3">
        <div className="flex  w-[52rem] justify-center mt-10 rounded-lg shadow-md   bg-white ">
          <p className="font-serif ">PRODUCT IMAGE</p>
          <p className="mx-7 font-serif px-10">PRODUCT </p>
          <p className="font-serif  px-2">QUANTITY</p>
          <p className="font-serif px-10">TOTAL PRICE</p>
          <p className="font-serif ">ACTION</p>
        </div>
        {orders.map((item) => {
          return item.products.map((items) => {
            return (
              <div>
                <div className=" w-[52rem]   mt-1 rounded-lg  bg-white shadow-lg">
                  <div className="flex">
                    <div>
                      {items.products.map((product) => {
                        return (
                          <div>
                            <div className="">
                              <div className="  px-20    font-serif">
                                <img
                                  src={`http://localhost:3000/images/${product.productImage}`}
                                  className="h-14 "
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mx-12">
                      {items.products.map((product) => {
                        return (
                          <div className="">
                            <div className=" px-3  h-[4rem] ">
                              <p className="text-[1rem] pt-3 font-serif ">
                                {product.productName}
                              </p>
                              <p className="">{`₹${product.Price}`}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      {items.products.map((product) => {
                        return (
                          <div>
                            <div className="text-lg  font-serif">
                              <div className=" px-14  h-[5rem] ">
                                <p className="text-xl pt-3  ">
                                  {product.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <div className="  mt-7 space-x-4">
                        <div className="mt-1  ">
                          <p className="pt-2 px-12 text-lg  ">{`₹${items.totalPrice}`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-md mt-7  font-serif">
                      <div>
                        {items.status==="cancelled"?(
                            <div className="h-7 w-20  rounded-lg bg-red-100">
                                <p className="text-center pt-1 text-red-500 ">cancelled</p>
                            </div>
                        ):( <select className="border" onChange={(e)=>dispatch(editOrderstatus({price:items.totalPrice,status:e.target.value}))} name="" id="">
                            <option value="In Progress">{items.status}</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>)}
                       
                      </div>
                    </div>
                    {/* <div className="mt-7 mx-12 "></div> */}
                  </div>
                </div>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default OrdersManagment;
