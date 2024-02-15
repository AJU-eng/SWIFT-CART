import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FcCancel } from "react-icons/fc";
import { cancelOrder } from "../../redux/features/OrderSlice";
import { useNavigate } from "react-router";

function CancelOrderModal({ data, visible, onClose }) {
  if (!visible) {
    return null;
  }
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const dispatch = useDispatch();
  const nav=useNavigate()
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-64  rounded-md pt-4 ">
        <div className="flex justify-center">
          <FcCancel size={55} />
        </div>
        <p className="font-serif text-center text-xl pt-2 ">Are You Sure?</p>
        <p className="font-serif text-center pt-2">
          your order will be cancelled
        </p>
        <div className="flex justify-around mb-7 mt-5">
          <button
            onClick={() => {
              dispatch(cancelOrder({ orderId:data.orderId, price: data.price, mode: data.mode }));
            //   nav("/routes/orders")
            onClose()
            }}
            className="bg-white border w-20 text-red-600 font-serif hover:bg-red-600 hover:text-white border-red-600 "
          >
            confirm
          </button>
          <button onClick={()=>onClose()} className="bg-white border w-20 font-serif hover:bg-blue-500 hover:text-white  border-blue-500">
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelOrderModal;
