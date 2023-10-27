import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ReactConfirmAlert from "react-confirm-alert";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {
  BlockUsers,
  DeleteUser,
  UnblockUsers,
  fetchUsers,
} from "../../../redux/features/AdminSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";  
import { FaUnlock } from "react-icons/fa";

function UserManagement() {
  const users = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div className="mt-20  border rounded-xl shadow-md ">
      <table className="w-full">
        <thead className="border border-b-2 h-10  ">
          <tr className="text-sm text-center text-slate-500 font-serif">
            <td className="w-32">ID</td>
            <td className="w-36 ">NAME</td>
            <td className="w-36">EMAIL</td>
            <td className="w-36">STATUS</td>
            <td className="w-36">CREATED</td>
            <td className="w-36">ACTION</td>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              return (
                <tr className="border border-b-2 text-center h-12 font-serif">
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="flex justify-center  ">
                    {user.status == "unblocked" ? (
                      <div className="w-20 h-7 p-1 border tracking-widest rounded-lg text-sm text-green-900 bg-green-300">
                        ACTIVE
                      </div>
                    ) : (
                      <div className="w-24 h-7 p-1 border tracking-widest rounded-lg text-sm text-red-500 bg-red-200">
                        BLOCKED
                      </div>
                    )}
                  </td>
                  <td>5</td>
                  <td className="flex justify-center space-x-4 mt-2">
                    {user.status == "unblocked" ? (
                      <FaUnlock
                        onClick={() => {
                          console.log("block user");
                          dispatch(BlockUsers(user._id));
                        }}
                      />
                    ) : (
                      <BiSolidLockAlt
                        onClick={() => {
                          console.log("unblock clicked");
                          dispatch(UnblockUsers(user._id));
                        }}
                      />
                    )}

                    <FiEdit />
                    <AiTwotoneDelete
                      onClick={() => {
                        console.log("delete user");
                        confirmAlert({
                          title: 'Confirm to submit',
                          message: 'Are you sure to do this.',
                          buttons: [
                            {
                              label: 'Yes',
                              onClick: () => dispatch(DeleteUser(user._id))
                            },
                            {
                              label: 'No',
                              onClick: () => alert('Click No')
                            }
                          ]
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
    </div>
  );
}

export default UserManagement;
