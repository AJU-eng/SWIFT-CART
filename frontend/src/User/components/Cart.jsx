import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "./Navbar/AuthenticatedNavbar";
import iphone from "./product images/15plus/iphone main.webp";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementProduct,
  deleteCartProduct,
  getCart,
  increment,
  makeOrders,
} from "../../redux/features/userslice";
import { useNavigate } from "react-router";

function Cart() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.user.Cart);
  const quantity = useSelector((state) => state.user.quantity);
  const Orders = useSelector((state) => state.user.Orders);
  const nav = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (cartData) {
      console.log(cartData);
    }
  }, [cartData]);

  const proceed = () => {
    dispatch(
      makeOrders({
        products: cartData,
        totalPrice: totalPrice(),
        status:"pending"
      })
    );
    nav("/checkout");
  };

  const totalPrice = () => {
    let sum = 0;
    if (cartData) {
      for (let index = 0; index < cartData.length; index++) {
        sum += cartData[index].Price * cartData[index].quantity;
      }
    }
    return sum;
  };
  return (
    <>
      <AuthenticatedNavbar />

      <div className="flex">
        <div className=" px-12 bg-slate-50 min-h-screen w-2/3">
          <div className="flex  w-[49rem] mt-10 rounded-lg shadow-md   bg-white ">
            <p className="mx-7 font-serif">PRODUCT</p>
            <p className="font-serif w-2 px-32">PRICE</p>
            <p className="font-serif px-7">QUANTITY</p>
            <p className="font-serif px-12">SUB TOTAL</p>
          </div>

          {cartData &&
            cartData.map((product) => {
              return (
                <div className="h-[6rem] w-[49rem]  mt-1 rounded-lg bg-white shadow-lg">
                  <div className="flex ">
                    <div>
                      <img
                        src={`http://localhost:3000/images/${product.productImage}`}
                        className="h-20 mt-2 mx-5 "
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-lg mt-7 font-serif">
                        {product.productName}
                      </p>
                    </div>
                    <div className="text-lg mt-7 mx-14 font-serif">
                      <p>{product.Price}</p>
                    </div>
                    <div className="mx-10 flex mt-7 space-x-4">
                      <div>
                        <button
                          onClick={() => {
                            if (product.quantity > 1) {
                              dispatch(
                                decrementProduct({ name: product.productName })
                              );
                            }
                          }}
                          className="flex justify-center items-center bg-slate-50 shadow-md text-gray-400 h-8 w-8 text-3xl rounded-md"
                        >
                          -
                        </button>
                      </div>
                      <div className="mt-1 text-xl font-normal">
                        {product.quantity}
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            dispatch(increment({ name: product.productName }));
                            totalPrice();
                          }}
                          className="flex justify-center items-center bg-slate-50 shadow-md text-gray-400 h-8 w-8 text-[2rem] rounded-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-lg mt-7 mx-5 font-serif">
                      <p>{Number(product.Price) * product.quantity}</p>
                    </div>
                    <div className="mt-7 mx-12 ">
                      <AiOutlineDelete
                        onClick={() =>
                          dispatch(
                            deleteCartProduct({ name: product.productName })
                          )
                        }
                        size={30}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="bg-gray-50">
          <div className=" h-64 w-[15rem] bg-white shadow-xl mx-32 mt-10 font-serif">
            <p className="font-serif text-center pt-3 text-lg">Price Details</p>
            <div className="mt-2">
              <div className="flex justify-around font-serif">
                <p>Price({`${cartData && cartData.length} items`})</p>
                <p>{totalPrice()}</p>
              </div>

              <div className="flex">
                <p className="px-6 pt-1">Discount</p>
                <p className="px-16 pt-1 text-green-400">0</p>
              </div>
              <div className="flex ">
                <p className="px-6 pt-1 ">Shipping Cost</p>
                <p className="px-7 pt-1">Free</p>
              </div>
              <hr className="mt-4" />
              <div className="flex justify-end pt-3 ">
                <p className="pr-[3rem] ">Total Price</p>
                <p className="pr-7">{totalPrice()}</p>
              </div>
              <div className="flex justify-center ">
                <button
                  onClick={() => proceed()}
                  className="h-9 w-32 text-white text-md rounded-lg shadow-lg font-serif mt-5 bg-blue-500 "
                >
                  Proceed to Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
