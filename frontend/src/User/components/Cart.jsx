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
import { getCouponCodesAdmin } from "../../redux/features/AdminSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Cart() {
  const dispatch = useDispatch();
  // let [total,setTotal]=useState("")
  const cartData = useSelector((state) => state.user.Cart);
  const quantity = useSelector((state) => state.user.quantity);
  const Orders = useSelector((state) => state.user.Orders);
  const stock = useSelector((state) => state.cartStock);
  const [code, setCode] = useState("");
  const CouponCode = useSelector((state) => state.user.coupon);
  const nav = useNavigate();

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCouponCodesAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (cartData) {
      console.log(cartData);
    }
    if (CouponCode) {
      console.log(CouponCode);
    }
   
  }, [cartData]);
if (stock) {
  console.log(stock);
}
  const proceed = () => {
    if (cartData) {
      dispatch(
        makeOrders({
          products: cartData,
          totalPrice: totalPrice(),
          status: "pending",
        })
      );
      nav("/checkout");
    }
  };

  const totalPrice = () => {
    let sum = 0;
    if (cartData) {
      for (let index = 0; index < cartData.length; index++) {
        sum += cartData[index].Price * cartData[index].quantity;
      }
    }
    // setTotal(sum)
    return sum;
  };

  let totals = totalPrice();

  const couponFunction = (code) => {
    // const total=totalPrice()
    if (code) {
      const data = CouponCode.find((i) => i.code === code);
      console.log(totals - data.value);
      totals = totals - data.value;
    } else {
      return totals;
    }
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

          {Array.isArray(cartData) &&
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
                    <div className=" px-2">
                      {/* <p className="px-20 text-sm bg-white w-19">stock limit reached</p> */}
                      <div className="mx-10 flex mt-7 space-x-4">
                        <div>
                          <button
                            onClick={() => {
                              if (product.quantity > 1) {
                                dispatch(
                                  decrementProduct({
                                    name: product.productName,
                                  })
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
                              if (stock) {
                                console.log(stock);
                                toast.error(stock);
                              } else {
                                dispatch(
                                  increment({ name: product.productName })
                                );
                                totalPrice();
                              }
                            }}
                            className="flex justify-center items-center bg-slate-50 shadow-md text-gray-400 h-8 w-8 text-[2rem] rounded-md"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-lg mt-7 mx-8 font-serif">
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
                <p>{totals}</p>
              </div>

              <div className="flex justify-around">
                <p className="px-12 pt-1">Discount</p>
                <p className="px-12 pt-1 text-green-400">0</p>
              </div>
              <div className="flex ">
                <p className="px-6 pt-1 ">Shipping Cost</p>
                <p className="px-7 pt-1">Free</p>
              </div>
              <hr className="mt-4" />
              <div className="flex justify-around pt-3 ">
                <p className="pr-[3rem] px-8">Total Price</p>
                <p className="pr-7">{totalPrice()}</p>
              </div>
              <div className="flex justify-center ">
                {cartData.length !== 0 ? (
                  <button
                    onClick={() => proceed()}
                    className="h-9 w-32 text-white text-md rounded-lg shadow-lg font-serif mt-5 bg-blue-500 "
                  >
                    Proceed to Buy
                  </button>
                ) : (
                  <button className="h-9 w-32 text-white text-md rounded-lg shadow-lg font-serif mt-5 bg-blue-500">
                    no items
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* <div className="mt-5 bg-white rounded-md shadow-md h-36 mx-32 w-56 ">
            <p className="px-5 py-3 font-serif">Coupon Code</p>
            <input
              type="text"
              onChange={(e) => setCode(e.target.value)}
              className=" border-2 mx-5"
              placeholder="Enter  Code here..."
            />
            <br />
            <button
              onClick={() => couponFunction(code)}
              className="text-sm bg-blue-400 mt-6 mx-14 w-32 h-7 font-serif text-white rounded-md"
            >
              {" "}
              Apply Coupon
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Cart;
