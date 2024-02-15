import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleOrder } from "../../redux/features/OrderSlice";
import { useParams } from "react-router";
import phone from "./product images/iphone 14/iphone_14.jpg";
import ReturnModal from "../components/requestModal";
import { FaLessThanEqual } from "react-icons/fa";
import { BASE_URI } from "../../redux/features/api";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
function OrderDetails() {
  let [obj, setObj] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const singleOrderum = useSelector((state) => state.Orders.singleOrders[0]);
  const loading = useSelector((state) => state.Orders.loading);
  let Address;
  const steps = ["Proccessing", "Shipped", "Delivered"];

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
    <>
      {loading ? (
        <p>loading.........</p>
      ) : (
        <div>
          <h2 className="text-xl">Order Details</h2>
          <div className="mt-5 ">
            {singleOrderum && singleOrderum.orders.status === "pending" ? (
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={1} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            ) : singleOrderum && singleOrderum.orders.status === "Shipped" ? (
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={2} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            ) : (
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={3} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex mt-10 font-serif">
              <h2 className="text-lg">OrderedAt</h2>
              <p className="px-1  text-lg">=</p>
              <p className="px-2 text-lg">
                {singleOrderum && singleOrderum.orders.OrderedAt}
              </p>
            </div>
            <div className="flex mt-10 font-serif mr-20">
              <h2 className="text-lg">Payment Method</h2>
              <p className="px-1  text-lg">=</p>
              <p className="px-2 text-lg">
                {singleOrderum && singleOrderum.orders.paymentMode}
              </p>
            </div>
          </div>
          <div className="flex space-x-24 ">
            <div className="  border border-slate-100 shadow-lg w-[25rem]  mt-16">
              <div>
                {singleOrderum &&
                  singleOrderum.orders.products.map((order) => {
                    return (
                      <div className="flex">
                        <div className="mx-10 pt-7">
                          <img
                            src={`${BASE_URI}images/${order.productImage}`}
                            className="h-20"
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="pt-16 font-serif">
                            {order.productName}
                          </p>
                        </div>
                        {singleOrderum.orders.status === "Delivered" && (
                          <div className="mx-7 mt-16">
                            {order.return === "not requested" ? (
                              <button
                                onClick={() => {
                                  setObj({
                                    name: order.productName,
                                    price: order.Price,
                                    orderId: singleOrderum.orders.OrderId,
                                    productId: order._id,
                                  });
                                  setVisible(true);
                                }}
                                className="w-[5rem] font-serif text-lg rounded-md  text-white bg-blue-400"
                              >
                                return
                              </button>
                            ) : order.return === "requested" ? (
                              <button className="w-[5rem] h-[2rem] rounded-md font-serif text-md text-white bg-blue-400">
                                requested
                              </button>
                            ) : (
                              <button className="w-[5rem] h-[2rem] rounded-md font-serif text-md text-white bg-blue-400">
                                returned
                              </button>
                            )}
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
            <p className="px-2">
              {singleOrderum && singleOrderum.orders.totalPrice}
            </p>
          </div>
          <ReturnModal obj={obj} visible={visible} />
        </div>
      )}
    </>
  );
}

export default OrderDetails;
