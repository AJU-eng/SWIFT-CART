import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAddress } from "../../redux/features/userslice";
import { set } from "mongoose";
import AuthenticatedNavbar from "./Navbar/AuthenticatedNavbar";
function EditAddressModal({ visible, onClose, email }) {
  const dispatch = useDispatch();
  const [data,setData]=useState("")
  const [name, setName] = useState("");
  const [emails, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [street, setStreet] = useState("");
  const address = useSelector((state) => state.user.singleAddress[0]);
  // if (!visible) {
  //     return null
  // }
  useEffect(() => {
    dispatch(findAddress({ email: email }));
  }, [dispatch, email]);
  useEffect(()=>{
    if (address) {
      // console.log(data);
      setData(address)
    }
  },[address,data])
  return (
    visible && (
      <div>
        <AuthenticatedNavbar/>
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white rounded-md">
            <div className="flex justify-around space-x-5">
              <div>
                <p className="mx-5 px-7 pt-4 font-serif"> User name</p>
                <input
                  type="text"
                  value={data.name}
                    onChange={(e) => setName(e.target.value)}
                  className="border mx-12 mt-2"
                />
              </div>
              <div>
                <p className=" pt-4 font-serif"> Email</p>
                <input
                  type="email"
                  value={data.email}
                    onChange={(e) => setEmail(e.target.value)}
                  className="border  mt-2"
                />
              </div>
              <div className="mx-10">
                <p className=" pt-4 font-serif"> Phone number</p>
                <input
                  type="text"
                  value={data.number}
                    onChange={(e) => setNumber(e.target.value)}
                  className="border  mt-2"
                />
              </div>
            </div>
            <div className="flex">
              <div className="mx-3">
                <p className="mx-5 px-7 pt-4 font-serif"> State</p>
                <input
                  type="text"
                  value={data.state}
                    onChange={(e) => setState(e.target.value)}
                  className="border  mx-12 mt-2"
                />
              </div>
              <div className="mx-10">
                <p className=" pt-4 font-serif"> District</p>
                <input
                  type="text"
                  value={data.district}
                    onChange={(e) => setDistrict(e.target.value)}
                  className="border   mt-2"
                />
              </div>
              <div className="">
                <p className="px-2 pt-4 font-serif"> Pincode</p>
                <input
                  type="text"
                  value={data.pincode}
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
                  value={data.street}
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
                <input type="text" className="border  mx-2 mt-2 " />
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={() => {
                  //   dispatch(
                  //     AddAddress({
                  //       name: name,
                  //       email: email,
                  //       number: number,
                  //       state: state,
                  //       district: district,
                  //       pincode: pincode,
                  //       street: street,
                  //     })
                  //   );
                  onClose();
                }}
                className="mb-10 bg-blue-400 w-[5rem] text-white pt-1 font-serif text-lg "
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default EditAddressModal;
