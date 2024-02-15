import React, { useEffect, useState } from "react";
import { GiCash } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";
import { CiWallet } from "react-icons/ci";
import iphone from "../components/product images/iphone 6/iphone13/iphone_13.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  AddAddress,
  getAddress,
  getWalletDetails,
  isBlocked,
  // onlinePayments,
  // placeOrders,
} from "../../redux/features/userslice";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router";
import AuthenticatedNavbar from "./Navbar/AuthenticatedNavbar";
import { BASE_URI } from "../../redux/features/api";
import validator from "validator";
import { onlinePayments, placeOrders } from "../../redux/features/OrderSlice";
import AddBilling from "./AddBilling";
function Checkout() {
  const [Razorpay] = useRazorpay();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [street, setStreet] = useState("");
  const [emailError, setError] = useState("");
  const [numberError, setNums] = useState("");
  const [choose, setChooseAddress] = useState("");
  // const [name,setName]=useState("")
  const order = useSelector((state) => state.Orders.online);
  const [paymentMode, setPaymentmode] = useState("");
  const walletBalance = useSelector((state) => state.user.Wallet.Balance);
  const [empty, setEmpty] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Orders.Orders);
  let Addres = useSelector((state) => state.user.Address);
  const [addressEmail, setMail] = useState("");
  const [adre, setAdre] = useState(false);
  const [AddressError, setAddressError] = useState("");

  useEffect(() => {
    dispatch(getAddress());
    dispatch(getWalletDetails());
    dispatch(isBlocked())
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      console.log(products);
    }
    // if (!products) {
    //   nav("/cart")
    // }
  }, [Addres, products]);

  const handleClose=()=>{
    setAdre(false)
  }

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
    // <AuthenticatedNavbar/>
    <>
      <AuthenticatedNavbar />

      <div className="flex">
        <div className="w-2/3   ">
          <div className="flex">
            <p className="px-12 pt-5 text-xl font-serif">
              Billing information{" "}
            </p>
            {AddressError ? (
              <p className="pt-6 text-red-500 font-serif">{AddressError}</p>
            ) : (
              choose && <p className="pt-6 text-red-500 font-serif">{choose}</p>
            )}
          </div>

          <hr className="mx-12 mt-2" />
          <div>
            {Addres && Addres.Address.length !== 0 ? (
              <div>
                <div className="flex justify-around mt-3">
                  {Addres &&
                    Addres.Address.map((address) => {
                      return (
                        <div>
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
                        </div>
                      );
                    })}
                </div>
                <button
                  onClick={() => {
                    setAdre(true);
                   
                  }}
                  className="bg-blue-400 text-white w-36 pb-1 pt-1 mx-10 text-[16px]   mt-10 font-serif shadow-md rounded-md"
                >
                  Add new Address
                </button>
              </div>
            ) :  (
              <div className="">
                <div className="flex justify-around space-x-5">
                  <div>
                    <p className="mx-5  px-7 pt-4 font-serif"> User name</p>
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
                    {emailError && <p className="text-red-600">{emailError}</p>}
                  </div>
                  <div className="mx-10">
                    <p className=" pt-4 font-serif"> Phone number</p>
                    <input
                      type="text"
                      onChange={(e) => setNumber(e.target.value)}
                      className="border  mt-2"
                    />
                    {numberError && (
                      <p className="text-red-500">{numberError}</p>
                    )}
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
                <button
                  className="bg-blue-400 text-white w-32 mx-10 mt-10 font-serif shadow-md rounded-md"
                  onClick={() => {
                    if (
                      name === "" ||
                      email === "" ||
                      number === "" ||
                      state === "" ||
                      district === "" ||
                      pincode === "" ||
                      street === ""
                    ) {
                      setAddressError("＊All fields are required");
                      setError("");
                      setChooseAddress("");
                      setNums("");
                    } else if (!validator.isEmail(email)) {
                      setError("invalid Email");
                      setAddressError("");
                      setChooseAddress("");
                      setNums("");
                    } else if (!validator.isNumeric(number)) {
                      setNums("Please enter the phone number");
                      setError("");
                      setAddressError("");
                      setChooseAddress("");
                    } else {
                      setNums("");
                      setError("");
                      setAddressError("");
                      setChooseAddress("");
                      dispatch(
                        AddAddress({
                          name: name,
                          email: email,
                          number: number,
                          state: state,
                          district: district,
                          pincode: pincode,
                          street: street,
                        })
                      );
                    }
                  }}
                >
                  Submit Address
                </button>
              </div>
            ) }
          </div>

          <div>
            <p className="px-14 pt-8 font-serif">Payment Method</p>
            <div className="flex">
              <div>
                <div className="flex mx-32 mt-5 space-x-1">
                  <input
                    onChange={(e) => setPaymentmode(e.target.value)}
                    type="radio"
                    value="COD"
                    name="NAME"
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
                    name="NAME"
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
                    name="NAME"
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
          <h1 className="flex justify-center mr-20 pt-5 text-red-600">
            {empty}
          </h1>
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
                        src={`${BASE_URI}images/${productr.productImage}`}
                        className="h-10"
                        alt=""
                      />
                      <p className="pt-1 px-2 font-serif">
                        {productr.productName}{" "}
                        <span>({productr.quantity})</span>
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
                  if (addressEmail === "") {
                    setChooseAddress("Please choose your Address");
                    setAddressError("");
                    setError("");
                  } else {
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
                      if (!walletBalance) {
                        setEmpty("Insufficent Balance");
                        setAddressError("");
                        setChooseAddress("");
                        setNums("");
                      } else if (walletBalance < products.totalPrice) {
                        setEmpty("Insufficent Wallet Balance");
                      } else {
                        dispatch(
                          placeOrders({
                            products: products,
                            paymentMode: paymentMode,
                            AdressMail: addressEmail,
                          })
                        );
                        nav("/orderSucess");
                      }
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
      <AddBilling  visible={adre} onClose={handleClose}/>
    </>
  );
}

export default Checkout;
