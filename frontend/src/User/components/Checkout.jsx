import React, { useState } from "react";
import { GiCash } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";
import { CiWallet } from "react-icons/ci";
import iphone from "../components/product images/iphone 6/iphone13/iphone_13.jpg";
import { useDispatch, useSelector } from "react-redux";
import { onlinePayments, placeOrders } from "../../redux/features/userslice";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router";
function Checkout() {
  const [name, setName] = useState("");
  const [Razorpay] = useRazorpay();
  const order = useSelector((state) => state.user.online);
  const [email, setEmail] = useState("");
  const [number, setNUmber] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [street, setStreet] = useState("");
  const [paymentMode, setPaymentmode] = useState("");
  const [err, setError] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();
  let products = useSelector((state) => state.user.Orders);

  const initPayment = (data) => {
    console.log("amount", data.order.amount);
    const options = {
      key: "rzp_test_9uTB8CFJuA8KJ4", // Enter the Key ID generated from the Dashboard
      amount: data.order.amount / 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "SWIFT CART",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: async (response) => {
        alert("hello world");
        console.log("response", response);
        dispatch(
          placeOrders({
            Address: {
              name: name,
              email: email,
              number: number,
              state: state,
              district: district,
              pincode: pincode,
              street: street,
            },
            products: products,
            paymentMode: paymentMode,
          })
        );
        nav("/orderSucess");
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="flex">
      <div className="w-2/3   ">
        <p className="px-12 pt-5 text-xl font-serif">
          Billing information{" "}
          <span className="px-10 text-md text-red-500">{err}</span>
        </p>

        <hr className="mx-12 mt-2" />
        <div className="">
          <div className="flex justify-around space-x-5">
            <div>
              <p className="mx-5 px-7 pt-4 font-serif"> User name</p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="border mx-12 mt-2"
              />
            </div>
            <div>
              <p className=" pt-4 font-serif"> Email</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border  mt-2"
              />
            </div>
            <div className="mx-10">
              <p className=" pt-4 font-serif"> Phone number</p>
              <input
                type="text"
                onChange={(e) => setNUmber(e.target.value)}
                className="border  mt-2"
              />
            </div>
          </div>
          <div className="flex">
            <div className="mx-3">
              <p className="mx-5 px-7 pt-4 font-serif"> State</p>
              <input
                type="text"
                onChange={(e) => setState(e.target.value)}
                className="border  mx-12 mt-2"
              />
            </div>
            <div className="mx-10">
              <p className=" pt-4 font-serif"> District</p>
              <input
                type="text"
                onChange={(e) => setDistrict(e.target.value)}
                className="border   mt-2"
              />
            </div>
            <div className="">
              <p className="px-2 pt-4 font-serif"> Pincode</p>
              <input
                type="text"
                onChange={(e) => setPincode(e.target.value)}
                className="border  mx-2 mt-2"
              />
            </div>
          </div>
          <div className="flex">
            <div className="mx-12">
              <p className="px-2 pt-4 font-serif"> Street</p>
              <input
                type="text"
                onChange={(e) => setStreet(e.target.value)}
                className="border  mx-2 mt-2"
              />
            </div>
            <div className="mx-10">
              <p className="px-2 pt-4 font-serif">
                {" "}
                Apartment,floor{" "}
                <span className="text-slate-400">(Optional)</span>
              </p>
              <input type="text" className="border  mx-2 mt-2" />
            </div>
          </div>
        </div>
        <div>
          <p className="px-14 pt-8 font-serif">Payment Method</p>
          <div className="flex">
            <div className="flex mx-32 mt-5 space-x-1">
              <input
                onChange={(e) => setPaymentmode(e.target.value)}
                type="radio"
                value="COD"
              />
              <GiCash size={30} />
            </div>
            <div className="flex  mt-5 space-x-2">
              <input
                onChange={(e) => setPaymentmode(e.target.value)}
                type="radio"
                value="NetBanking"
              />
              <MdOutlinePayment size={30} />
            </div>
            <div className="flex mx-24 mt-5 space-x-2">
              <input
                value="wallet"
                onChange={(e) => setPaymentmode(e.target.value)}
                type="radio"
              />
              <CiWallet size={30} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-center mt-10">
        <div className="w-80 h-72 bg-white shadow-md">
          <p className="font-serif text-center text-lg pt-3">Order Summary</p>

          {products.products &&
            products.products.map((productr) => {
              return (
                <div className="flex">
                  <div className="flex mx-3 mt-4">
                    <img
                      src={`http://localhost:3000/images/${productr.productImage}`}
                      className="h-10"
                      alt=""
                    />
                    <p className="pt-1 px-2 font-serif">
                      {productr.productName} <span>({productr.quantity})</span>
                    </p>
                  </div>
                  <div className="mt-4 mx-8">
                    <p>{productr.Price * productr.quantity}</p>
                  </div>
                </div>
              );
            })}

          <div className="flex justify-around mx-5">
            <p>Shipping</p>
            <p className="px-2">Free</p>
          </div>

          <hr className="mt-3" />
          <div className="flex justify-around mt-3">
            <p className="px-5 font-serif">Total Price</p>
            <p className=" font-serif">{products.totalPrice}</p>
          </div>
          <div className="flex justify-center ">
            <button
              onClick={() => {
                if (
                  name == "" ||
                  email === "" ||
                  state === "" ||
                  number === "" ||
                  district === "" ||
                  pincode === "" ||
                  street === "" ||
                  paymentMode === ""
                ) {
                  setError("All feilds are required");
                  console.log(err);
                } else {
                  if (paymentMode === "COD") {
                    dispatch(
                      placeOrders({
                        Address: {
                          name: name,
                          email: email,
                          number: number,
                          state: state,
                          district: district,
                          pincode: pincode,
                          street: street,
                        },
                        products: products,
                        paymentMode: paymentMode,
                      })
                    );
                    nav("/orderSucess");
                  } else if (paymentMode === "NetBanking") {
                    dispatch(onlinePayments({ amount: products.totalPrice }));
                    initPayment(order);

                    //  dispatch(onlinePayments({amount:products.totalPrice}))
                  }
                }
              }}
              className="h-8  w-[6rem] mt-3 font-serif text-white shadow-md rounded-lg bg-blue-400 text-md"
            >
              place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
