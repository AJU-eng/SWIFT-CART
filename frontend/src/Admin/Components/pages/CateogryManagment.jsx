import React, { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaUnlock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/features/AdminSlice";
function CateogryManagment() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const categories = useSelector((state) => state.admin.updatedCategories);
  const hanldeClose = () => setShowModal(false);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <>
      <div className="flex justify-end mt-5">
        <button
          className="w-auto h-auto bg-blue-400 text-white"
          onClick={() => setShowModal(true)}
        >
          ADD CATEGORY
        </button>
      </div>
      <div className="mt-20  border rounded-xl shadow-md ">
        <table className="w-full">
          <thead className="border border-b-2 h-10  ">
            <tr className="text-sm text-center text-slate-500 font-serif">
              <td className="w-32">ID</td>
              <td className="w-36 ">CATEGORY</td>
              <td className="w-36">SALES</td>
              <td className="w-36">STOCK</td>
              <td className="w-36">ADDED</td>
              <td className="w-36">ACTION</td>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category, index) => {
                return (
                  <tr className="border border-b-2 text-center h-12 font-serif">
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>0</td>
                    <td className="flex justify-center  ">{category.Stock}</td>
                    <td></td>
                    <td className="flex justify-center space-x-4 mt-2">
                      <FaUnlock
                        onClick={() => {
                          console.log("block user");
                          dispatch(BlockUsers(category._id));
                        }}
                      />

                      <BiSolidLockAlt
                        onClick={() => {
                          console.log("unblock clicked");
                          dispatch(UnblockUsers(category._id));
                        }}
                      />

                      <FiEdit />
                      <AiTwotoneDelete
                        onClick={() => {
                          console.log("delete user");
                          confirmAlert({
                            title: "Confirm to submit",
                            message: "Are you sure to do this.",
                            buttons: [
                              {
                                label: "Yes",
                                // onClick: () => dispatch(DeleteUser(user._id))
                              },
                              {
                                label: "No",
                                onClick: () => alert("Click No"),
                              },
                            ],
                          });
                          // dispatch(DeleteUser(user._id));
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <AddCategory visible={showModal} />
      </div>
    </>
  );
}

export default CateogryManagment;
