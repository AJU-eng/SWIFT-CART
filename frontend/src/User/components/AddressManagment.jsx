import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import AddressModal from "./AddressModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, getAddress } from "../../redux/features/userslice";
import { MdDeleteOutline } from "react-icons/md";
import EditAddressModal from "./EditAddressModal";
import { CiEdit } from "react-icons/ci";

function AddressManagment() {
  const [visible, setVisible] = useState(false);
  const [modal, showModal] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const address = useSelector((state) => state.user.Address);
  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);
  const handleclose = () => {
    setVisible(false);
  };
  return (
    <div>
      <div className="w-1/2 h-[2rem] mt-10 bg-white border rounded-md shadow-md">
        <div className="flex" onClick={() => setVisible(true)}>
          <div className="mx-7 mt-1">
            <IoIosAdd size={25} />
          </div>
          <div>
            <p className="text-center pt-1 tracking-widest   font-serif ">
              Manage Address
            </p>
          </div>
        </div>
      </div>
      <div className="flex space-x-6">
        {address.length !== 0 &&
          address.Address.map((addres) => {
            return (
              <div className="w-72 flex justify-between px-10 mt-40 bg-white  shadow-md pb-4 pt-2   space-y-2">
                <div>
                  <p>{addres.name}</p>
                  <p>{addres.number}</p>
                  <p>{addres.email}</p>
                  <p>{addres.state}</p>
                  <p>{addres.district}</p>
                  <p>{addres.street}</p>
                </div>
                <div className="flex space-x-2">
                  <MdDeleteOutline
                    onClick={() =>
                      dispatch(deleteAddress({ email: addres.email }))
                    }
                    size={22}
                  />
                  <CiEdit
                    size={22}
                    onClick={() => {
                      showModal(true);
                      setEmail(addres.email)
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <AddressModal visible={visible} onClose={handleclose} />
      <EditAddressModal visible={modal} onClose={handleclose} email={email} />
    </div>
  );
}

export default AddressManagment;
