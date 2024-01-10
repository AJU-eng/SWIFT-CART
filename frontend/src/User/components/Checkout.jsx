import React, { useEffect, useState } from "react";
import { GiCash } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";
import { CiWallet } from "react-icons/ci";
import iphone from "../components/product images/iphone 6/iphone13/iphone_13.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddress,
  getWalletDetails,
  onlinePayments,
  placeOrders,
} from "../../redux/features/userslice";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router";
function Checkout() {
  const [Razorpay] = useRazorpay();
  const order = useSelector((state) => state.user.online);
  const [paymentMode, setPaymentmode] = useState("");
  const walletBalance=useSelector((state)=>state.user.Wallet.Balance)
  const [empty,setEmpty]=useState("")
  const nav = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.user.Orders);
  const Addres = useSelector((state) => state.user.Address);
  const [addressEmail, setMail] = useState("");
  useEffect(() => {
    dispatch(getAddress());
    dispatch(getWalletDetails())
  }, [dispatch]);

  useEffect(() => {
    if (Addres) {
      console.log(Addres);
    }
    // if (!products) {
    //   nav("/cart")
    // }
  }, [Addres, products]);

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
        // console.log("response", response);
        dispatch(
          placeOrders({
            products: products,
            paymentMode: paymentMode,
            AdressMail: addressEmail,
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
        <p className="px-12 pt-5 text-xl font-serif">Billing information </p>

        <hr className="mx-12 mt-2" />
        <div className="flex justify-around mt-3">
          {Addres &&
            Addres.Address.map((address) => {
              return (
                <div className="w-60 px-5 font-serif bg-white rounded-md shadow-md ">
                  <input
                    type="radio"
                    name="address"
                    value={address.email}
                    onChange={(e) => setMail(e.target.value)}
                  />
                  <p>{address.name}</p>
                  <p>{address.email}</p>
                  <p>{address.number}</p>
                  <p>{address.state}</p>
                  <p>{address.district}</p>
                  <p>{address.pincode}</p>
                  <p className="mb-3">{address.street}</p>
                </div>
              );
            })}
        </div>
        {/* <div className="">
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
        </div> */}
        <div>
          <p className="px-14 pt-8 font-serif">Payment Method</p>
          <div className="flex">
            <div>
              <div className="flex mx-32 mt-5 space-x-1">
                <input
                  onChange={(e) => setPaymentmode(e.target.value)}
                  type="radio"
                  value="COD"
                />
                <GiCash size={30} />
              </div>
              <p className="flex justify-center text-sm font-serif pt-2">
                Cash On Delivery
              </p>
            </div>
            <div>
              <div className="flex  mt-5 space-x-2">
                <input
                  onChange={(e) => setPaymentmode(e.target.value)}
                  type="radio"
                  value="NetBanking"
                />
                <MdOutlinePayment size={30} />
              </div>
              <p className="flex justify-center text-sm font-serif pt-2">
                Online Payment
              </p>
            </div>
            <div className="">
              <div className="flex mx-24 mt-5 space-x-2">
                <input
                  value="wallet"
                  onChange={(e) => setPaymentmode(e.target.value)}
                  type="radio"
                />
                <CiWallet size={30} />
              </div>
              <p className="flex justify-center text-sm font-serif pt-2">
                Wallet
              </p>
            </div>
          </div>
        </div>
        <h1 className="flex justify-center mr-20 pt-5 text-red-600">{empty}</h1>
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
            <p className="font-serif px-6">Shipping</p>
            <p className="px-2 pr-10 font-serif">Free</p>
          </div>

          <hr className="mt-3" />
          <div className="flex justify-around mt-3">
            <p className="px-11 font-serif">Total Price</p>
            <p className=" font-serif pr-14">{products.totalPrice}</p>
          </div>
          <div className="flex justify-center ">
            <button
              onClick={() => {
                if (paymentMode === "COD") {
                  dispatch(
                    placeOrders({
                      products: products,
                      paymentMode: paymentMode,
                      AdressMail: addressEmail,
                    })
                  );
                  nav("/orderSucess");
                } else if (paymentMode === "NetBanking") {
                  dispatch(onlinePayments({ amount: products.totalPrice }));
                  initPayment(order);

                  //  dispatch(onlinePayments({amount:products.totalPrice}))
                } else {
                  if (walletBalance<products.totalPrice) {
                    setEmpty("Insufficent Wallet Balance")
                  }
                  else{

                    dispatch(
                      placeOrders({
                        products: products,
                        paymentMode: paymentMode,
                        AdressMail: addressEmail,
                      })
                    );
                    nav("/orderSucess")
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
