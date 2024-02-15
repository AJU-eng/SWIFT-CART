import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ringloader from "react-spinners/RingLoader";
import {
  editUserData,
  isBlocked,
  recentadd,
  userDetail,
} from "../../redux/features/userslice";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const loading = useSelector((state) => state.user.loading);
  // const loading = true;
  const [date, setDate] = useState("");
  const address = useSelector((state) => state.user.recent);
  useEffect(() => {
    dispatch(userDetail());
    dispatch(recentadd());
    dispatch(isBlocked())
  }, [dispatch]);

  const editUser = () => {
    dispatch(editUserData({ name: name, date: date }));
  };

  const userDp = () => {
    if (user) {
      let name = user.name.split(" ");
      if (name.length > 1) {
        let firstName = name[0][0];
        let secondName = name[1][0];
        return [firstName, secondName];
      } else {
        let b = name[0];
        return [b];
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center align-middle mt-28">
          <Ringloader
            color={"lightBlue"}
            // loading={loading}
            // cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <h2 className="font-serif ">
            PROFILE <span className="font-serif mx-1">MANAGMENT</span>
          </h2>
          <hr className="mt-3" />
          <div className="flex ">
            <div className="w-1/3 ">
              <div className="bg-orange-300 h-36 w-36 mx-[8rem] rounded-full mt-[2rem] flex justify-center items-center">
                <p className="text-4xl tracking-widest font-serif text-white">
                  {userDp()}
                </p>
              </div>
              <div>
                {edit ? (
                  <button
                    onClick={() => {
                      dispatch(editUserData({ name: name, date: date }));
                      setEdit(false);
                    }}
                    className="font-serif h-7 text-white w-32 text-md bg-blue-400 shadow-md rounded-md mx-[9rem] mt-10"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEdit(true);
                    }}
                    className="font-serif h-7 text-white w-32 text-md bg-blue-400 shadow-md rounded-md mx-[9rem] mt-10"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
            <div className="h-56 w-[.15rem] mt-4 bg-slate-100"></div>
            {edit ? (
              <div>
                <p className="px-6 text-slate-500 font-serif pt-[2rem]">
                  USER NAME
                </p>
                <div className="flex items-center mx-6 mt-2">
                  <FaRegUser className="mx-2 text-gray-500" size={17} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-b border-gray-300 focus:outline-none font-serif focus:border-blue-400 py-2"
                  />
                </div>
                <div className="mt-5">
                  <p className="px-6 text-slate-500 font-serif ">EMAIL</p>
                  <div className="h-7 w-60 bg-white border mx-6 mt-2">
                    <div className="flex">
                      <MdOutlineMailOutline className="mx-2 mt-1" size={16} />
                      <p className="font-serif text-slate-600">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="px-6 text-slate-500 font-serif ">
                    DATE OF BIRTH
                  </p>
                  <div className="flex items-center mx-6 mt-2">
                    {/* <BsCalendar2Date className="mx-2  text-gray-500" size={20} /> */}
                    <input
                      type="date"
                      onChange={(e) => setDate(e.target.value)}
                      className="border-b border-gray-300 focus:outline-none focus:border-blue-400 py-2"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="px-6 text-slate-500 font-serif pt-[2rem]">
                  USER NAME
                </p>
                <div className="h-7 w-40 bg-white border mx-6 mt-2">
                  <div className="flex">
                    <FaRegUser className="mx-2 mt-1" size={14} />

                    <p className="font-serif text-slate-600">{user.name}</p>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="px-6 text-slate-500 font-serif ">EMAIL</p>
                  <div className="h-7 w-60 bg-white border mx-6 mt-2">
                    <div className="flex">
                      <MdOutlineMailOutline className="mx-2 mt-1" size={16} />
                      <p className="font-serif text-slate-600">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="px-6 text-slate-500 font-serif ">
                    DATE OF BIRTH
                  </p>
                  <div className="h-7 w-40 bg-white border mx-6 mt-2">
                    <div className="flex">
                      <BsCalendar2Date className="mx-2 mt-1" />
                      <p>{user.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-10 ">
            <h2 className="font-serif"> SHIPPING ADDRESS</h2>
            <hr className="mt-2" />

            {address ? (
              <div className="mt-5 tracking-wide  space-y-1 text-lg">
                <div className="flex space-x-2 font-serif">
                  <p>Name:</p>
                  <p>{address.name}</p>
                </div>
                <div className="flex space-x-3 font-serif">
                  <p>Email:</p>
                  <p>{address.email}</p>
                </div>
                <div className="flex space-x-3 ">
                  <p>Phone Number:</p>
                  <p>{address.number}</p>
                </div>
                <div className="flex space-x-3 font-serif">
                  <p>State:</p>
                  <p>{address.state}</p>
                </div>
                <div className="flex space-x-3 font-serif">
                  <p>District:</p>
                  <p>{address.district}</p>
                </div>
                <div className="flex space-x-3 font-serif">
                  <p>Street:</p>
                  <p>{address.street}</p>
                </div>
                <div className="flex space-x-3 ">
                  <p>Pincode:</p>
                  <p>{address.pincode}</p>
                </div>
              </div>
            ) : (
              <p className=" text-center mt-24 font-serif">
                No recent Address found
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
