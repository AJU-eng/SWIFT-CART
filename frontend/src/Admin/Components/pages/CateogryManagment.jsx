import React, { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaUnlock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  blockCategory,
  getCategory,
  unblocksCategory,
} from "../../../redux/features/AdminSlice";
import date from "date-and-time";
import EditCategory from "./EditCategory";
function CateogryManagment() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState();
  const [edit, showEdit] = useState(false);

  const categories = useSelector((state) => state.admin.categories);
  const hanldeClose = () => {
    setShowModal(false);
    showEdit(false)
  };
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <>
      <div className="flex justify-end mt-5">
        <button
          className="w-36 rounded-lg font-semibold h-8 bg-blue-400 text-white"
          onClick={() => setShowModal(true)}
        >
          ADD CATEGORY
        </button>
      </div>
      <div className="mt-7  border rounded-xl shadow-md ">
        <table className="w-full">
          <thead className="border border-b-2 h-10  ">
            <tr className="text-sm text-center text-slate-500 font-serif">
              <td className="w-32">ID</td>
              <td className="w-36 ">CATEGORY</td>
              <td className="w-36">SALES</td>
              <td className="w-36">ADDED</td>
              <td className="w-36">STATUS</td>
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
                    <td>no data</td>

                    <td>
                      {category.createdAt
                        ? date.format(new Date(category.createdAt), "D MMM YY")
                        : "no data"}
                    </td>
                    <td className="px-20 ">
                      {category.status == "Unblocked" ? (
                        <div className="w-20 h-7 p-1 border tracking-widest rounded-lg text-sm text-green-900 bg-green-300">
                          ACTIVE
                        </div>
                      ) : (
                        <div className="w-24 h-7 p-1 border tracking-widest rounded-lg text-sm text-red-500 bg-red-200">
                          BLOCKED
                        </div>
                      )}
                    </td>
                    <td className="flex justify-center space-x-4 mt-2">
                      {category.status === "Unblocked" ? (
                        <FaUnlock
                          onClick={() => {
                            console.log("block user");
                            dispatch(blockCategory(category._id));
                          }}
                        />
                      ) : (
                        <BiSolidLockAlt
                          onClick={() => {
                            console.log("unblock clicked");
                            dispatch(unblocksCategory(category._id));
                          }}
                        />
                      )}

                      <FiEdit
                        onClick={() => {
                          console.log("edit button clicked");
                          showEdit(true);
                          setId(category._id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
         
        <AddCategory visible={showModal} onClose={hanldeClose} />
        <EditCategory visible={edit} id={id} onClose={hanldeClose} />
      </div>
    </>
  );
}

export default CateogryManagment;
