import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "./Navbar/AuthenticatedNavbar";
import iphone from "./product images/15plus/iphone main.webp";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import empty from "../components/assets/helu-removebg-preview.png";
import {
  decrementProduct,
  deleteCartProduct,
  getCart,
  increment,
} from "../../redux/features/cartSlice";
import { CiShoppingCart } from "react-icons/ci";
import img from "../components/assets/hey-removebg-preview.png";
import { useNavigate } from "react-router";
import { getCouponCodes } from "../../redux/features/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URI } from "../../redux/features/api";
import { makeOrders } from "../../redux/features/OrderSlice";
import ReactLoading from "react-loading";
import { isBlocked } from "../../redux/features/userslice";
function Cart() {
  const dispatch = useDispatch();
  // let [total,setTotal]=useState("")
  const cartData = useSelector((state) => state.Cart.Cart);
  const stock = useSelector((state) => state.Cart.cartStock);
  const loading = useSelector((state) => state.Cart.loading);
  // const loading=true
  const [discount, setDiscount] = useState(0);
  const [displayedTotal, setDisplayedTotal] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [code, setCode] = useState("");
  const CouponCode = useSelector((state) => state.Cart.coupon);
  let limit = useSelector((state) => state.Cart.cartStock);
  const nav = useNavigate();
  useEffect(() => {
    dispatch(getCouponCodes());
    dispatch(getCart());
    dispatch(isBlocked())
  }, [dispatch]);

  useEffect(() => {
    if (cartData) {
      console.log(cartData);
    }
    if (limit) {
      console.log(limit);
      toast.error("stock limit reached");
    }
    if (CouponCode) {
      console.log(CouponCode);
    }
    updateDisplayedTotal();
  }, [cartData, discount]);
  if (stock) {
    console.log(stock);
  }
  const proceed = () => {
    if (cartData) {
      dispatch(
        makeOrders({
          products: cartData,
          totalPrice: displayedTotal,
          status: "pending",
        })
      );
      nav("/checkout");
    }
  };

  const updateDisplayedTotal = () => {
    const calculatedTotal = totalPrice();
    setDisplayedTotal(calculatedTotal);
  };

  const totalPrice = () => {
    let sum = 0;
    if (cartData) {
      for (let index = 0; index < cartData.length; index++) {
        sum += cartData[index].Price * cartData[index].quantity;
      }
    }
    // setTotal(sum)
    return sum - discount;
  };

  // let totals = totalPrice();

  const couponFunction = (code) => {
    // const total=totalPrice()
    // console.log(CouponCode.minPurchaseAmount);
    if (totalPrice() < CouponCode[0].minPurchaseAmount) {
      console.log(totalPrice());
      setCouponError(
        `Min Purchase Amount is ${CouponCode[0].minPurchaseAmount}`
      );
    } else if (totalPrice() > CouponCode[0].maxPurchaseAmount) {
      setCouponError(
        `Max Purchase Amount is ${CouponCode[0].maxPurchaseAmount}`
      );
    } else {
      const data = CouponCode.find((i) => i.code === code);
      setDiscount(data.value);
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
          {loading && (
            <div className="flex justify-center mt-20">
              <ReactLoading
                type="spin"
                color="lightBlue"
                height={"10%"}
                width={"10%"}
              />
            </div>
          )}
          {Array.isArray(cartData) && cartData.length !== 0 && !loading ? (
            cartData.map((product) => {
              return (
                <div className="h-[6rem] w-[49rem]  mt-1 rounded-lg bg-white shadow-lg">
                  <div className="flex ">
                    <div>
                      <img
                        src={`${BASE_URI}images/${product.productImage}`}
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
            })
          ) : Array.isArray(cartData) && cartData.length === 0 ? (
            <div>
              <div className="flex justify-center align-middle mr-20">
                <img src={img} className="h-64 pt-12" alt="" />
              </div>
              {/* <p className="text-center text-4xl font-serif mr-20">no items</p> */}
            </div>
          ) : null}
        </div>
        <div className="bg-gray-50">
          <div className="  w-[15rem] bg-white shadow-xl mx-32 mt-10 font-serif">
            <p className="font-serif text-center pt-3 text-lg">Price Details</p>
            <div className="mt-2">
              <div className="flex justify-around font-serif">
                <p>Price({`${cartData && cartData.length} items`})</p>
                <p>{displayedTotal}</p>
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
                    className="h-9 w-32 mb-5 text-white text-md rounded-lg shadow-lg font-serif mt-5 bg-blue-500 "
                  >
                    Proceed to Buy
                  </button>
                ) : (
                  <button className="h-9 w-32 text-white text-md rounded-lg shadow-lg mb-5 font-serif mt-5 bg-blue-500">
                    no items
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 bg-white rounded-md shadow-md  mx-32 w-56 ">
            <p className="px-5 py-3 font-serif">Coupon Code</p>
            <input
              type="text"
              onChange={(e) => setCode(e.target.value)}
              className=" border-2 mx-5"
              placeholder="Enter  Code here..."
            />
            <br />
            <p className="text-sm text-center pt-3 text-red-600">
              {couponError}
            </p>
            <button
              onClick={() => couponFunction(code)}
              className="text-sm bg-blue-400 mt-6 mx-14 w-32 h-7 mb-5 font-serif text-white rounded-md"
            >
              {" "}
              Apply Coupon
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Cart;
