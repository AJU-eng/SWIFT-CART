import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from "validator";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AddAddress } from '../../redux/features/userslice';
function AddBilling({ visible, onClose }) {
    if (!visible) {
        return null;
      }
    
      const dispatch = useDispatch();
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [number, setNumber] = useState("");
      const [state, setState] = useState("");
      const [district, setDistrict] = useState("");
      const [pincode, setPincode] = useState("");
      const [street, setStreet] = useState("");
      const [Error,setError]=useState("")
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-md">
        <div className="flex mt-3 justify-end mr-10">
        <IoMdCloseCircleOutline size={25} onClick={()=>onClose()} />

        </div>
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
              Apartment,floor <span className="text-slate-400">(Optional)</span>
            </p>
            <input type="text" className="border  mx-2 mt-2 " />
          </div>
        </div>
        <div className="flex justify-center  mt-10">
          <button
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
                setError("All feilds are required")
              }else if (!validator.isEmail(email)) {
                setError("Invalid Email")
              }else if (!validator.isNumeric(number)) {
                setError("Invalid number")
              }else{
                setError("")
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
                onClose();
              }
            }}
            className="mb-10 bg-blue-400 w-[5rem] text-white pt-1 font-serif text-lg "
          >
            Add
          </button>
          <p className="px-7 text-red-600 font-serif">{Error}</p>
        </div>
      </div>
    </div>
  )
}

export default AddBilling