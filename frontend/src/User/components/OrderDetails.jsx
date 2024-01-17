import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleOrder } from "../../redux/features/userslice";
import { useParams } from "react-router";
import phone from "./product images/iphone 14/iphone_14.jpg";
import ReturnModal from "../components/requestModal";
import { FaLessThanEqual } from "react-icons/fa";
import { URL } from "../../redux/features/api";
function OrderDetails() {
  let [obj, setObj] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const singleOrderum = useSelector((state) => state.user.singleOrders[0]);
  let Address;
  useEffect(() => {
    dispatch(singleOrder({ _id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleOrderum) {
      console.log(singleOrderum);
      singleOrderum.orders.products.map((order) => {
        console.log(order.productImage);
      });
      Address = singleOrderum.orders.Address;
    }
  }, [singleOrderum]);
  return (
    <div>
      <h2 className="text-xl">Order Details</h2>

      <div className="w-50 h-3 mt-5 bg-slate-500 ">
        {/* <div className="bg-slate-300">fd</div> */}
      </div>
      <div className="flex mt-5 font-serif">
        <h2 className="text-lg">OrderedAt</h2>
        <p className="px-1  text-lg">=</p>
        <p className="px-2 text-lg">2023-10-12</p>
      </div>
      <div className="flex space-x-24 ">
        <div className="  border border-slate-100 shadow-lg w-[21rem]  mt-16">
          <div>
            {singleOrderum &&
              singleOrderum.orders.products.map((order) => {
                return (
                  <div className="flex">
                    <div className="mx-10">
                      <img
                        src={`${URL}images/${order.productImage}`}
                        className="h-20"
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="pt-16 font-serif">{order.productName}</p>
                    </div>
                    {singleOrderum.orders.status === "Delivered" && (
                      <div className="mx-7 mt-16">
                        <button
                          onClick={() => {
                            setObj({
                              name: order.productName,
                              price: order.Price,
                            });
                            setVisible(true);
                          }}
                          className="w-[3rem] rounded-md  text-white bg-blue-400"
                        >
                          return
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        <div>
          <h1 className="pt-10 text-xl font-serif">Billing Address</h1>

          <div className="w-80 font-serif bg-white shadow-md border-2 pt-2 mt-8 px-10 ">
            {singleOrderum && (
              <div className="space-y-2 ">
                <p>{singleOrderum.orders.Address.name}</p>
                <p>{singleOrderum.orders.Address.email}</p>
                <p>{singleOrderum.orders.Address.number}</p>
                <p>{singleOrderum.orders.Address.state}</p>
                <p>{singleOrderum.orders.Address.district}</p>
                <p>{singleOrderum.orders.Address.street}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex mt-10 mx-4 text-xl font-serif">
        <h3>Total Price</h3>
        <p className="px-1">=</p>
        <p className="px-2">23000</p>
      </div>
      <ReturnModal obj={obj} visible={visible} />
    </div>
  );
}

export default OrderDetails;
