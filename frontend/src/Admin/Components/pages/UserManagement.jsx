// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import ReactConfirmAlert from "react-confirm-alert";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// import date from "date-and-time";

// import {
//   BlockUsers,
//   DeleteUser,
//   UnblockUsers,
//   fetchUsers,
// } from "../../../redux/features/AdminSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { BiSolidLockAlt } from "react-icons/bi";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { FiEdit } from "react-icons/fi";
// import { FaUnlock } from "react-icons/fa";

// function UserManagement() {
//   const users = useSelector((state) => state.admin.users);
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);
//   const filteredData = users.filter((user) =>
//     user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   return (
//     <>
//       <input
//         type="text"
//         className="border mt-5 w-[20rem] rounded-lg px-2"
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="🔍 Search here....."
//       />

//       <div className="mt-10  border rounded-xl shadow-md ">
//         <table className="w-full">
//           <thead className="border border-b-2 h-10  ">
//             <tr className="text-sm text-center text-slate-500 font-serif">
//               <td className="w-32">ID</td>
//               <td className="w-36 ">NAME</td>
//               <td className="w-36">EMAIL</td>
//               <td className="w-36">STATUS</td>
//               <td className="w-36">CREATED</td>
//               <td className="w-36">ACTION</td>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData ?
//               filteredData.map((user, index) => {
//                 return (
//                   <tr className="border border-b-2 text-center h-12 font-serif">
//                     <td>{index + 1}</td>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td className="flex justify-center  ">
//                       {user.status == "unblocked" ? (
//                         <div className="w-20 h-7 p-1 border tracking-widest rounded-lg text-sm text-green-900 bg-green-300">
//                           ACTIVE
//                         </div>
//                       ) : (
//                         <div className="w-24 h-7 p-1 border tracking-widest rounded-lg text-sm text-red-500 bg-red-200">
//                           BLOCKED
//                         </div>
//                       )}
//                     </td>
//                     <td>
//                       {user.createdAt
//                         ? date.format(new Date(user.createdAt), "D MMM YY")
//                         : "no data"}
//                     </td>
//                     <td className="flex justify-center space-x-4 mt-2">
//                       {user.status == "unblocked" ? (
//                         <FaUnlock
//                           onClick={() => {
//                             console.log("block user");
//                             dispatch(BlockUsers(user._id));
//                           }}
//                         />
//                       ) : (
//                         <BiSolidLockAlt
//                           onClick={() => {
//                             console.log("unblock clicked");
//                             dispatch(UnblockUsers(user._id));
//                           }}
//                         />
//                       )}

//                       <FiEdit />
//                       <AiTwotoneDelete
//                         onClick={() => {
//                           console.log("delete user");
//                           confirmAlert({
//                             title: "Confirm to submit",
//                             message: "Are you sure to do this.",
//                             buttons: [
//                               {
//                                 label: "Yes",
//                                 onClick: () => dispatch(DeleteUser(user._id)),
//                               },
//                               {
//                                 label: "No",
//                                 onClick: () => alert("Click No"),
//                               },
//                             ],
//                           });
//                           // dispatch(DeleteUser(user._id));
//                         }}
//                       />
//                     </td>
//                   </tr>
//                 );
//               }):<h1>no Data</h1>}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default UserManagement;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import date from "date-and-time";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this to your desired number of items per page

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredData = users.filter(
    (user) =>
      user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
  const renderTableData = currentItems.map((user, index) => {
    const globalIndex = indexOfFirstItem + index + 1; // Calculate global index

    return (
      <tr key={globalIndex} className="border border-b-2 text-center h-12 font-serif">
        <td>{globalIndex}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td className="flex justify-center  ">
          {user.status === "unblocked" ? (
            <div className="w-20 h-7 p-1 border tracking-widest rounded-lg text-sm text-green-900 bg-green-300">
              ACTIVE
            </div>
          ) : (
            <div className="w-24 h-7 p-1 border tracking-widest rounded-lg text-sm text-red-500 bg-red-200">
              BLOCKED
            </div>
          )}
        </td>
        <td>
          {user.createdAt
            ? date.format(new Date(user.createdAt), "D MMM YY")
            : "no data"}
        </td>
        <td className="flex justify-center space-x-4 mt-2">
          {user.status === "unblocked" ? (
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
                title: "Confirm to submit",
                message: "Are you sure to do this.",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => dispatch(DeleteUser(user._id)),
                  },
                  {
                    label: "No",
                    onClick: () => alert("Click No"),
                  },
                ],
              });
            }}
          />
        </td>
      </tr>
    );
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={() => handlePageChange(number)}
        className={`cursor-pointer mx-1 px-3 py-1 rounded-lg ${
          currentPage === number ? "bg-gray-300" : ""
        }`}
      >
        {number}
      </li>
    );
  });

  return (
    <>
      <input
        type="text"
        className="border mt-5 w-[20rem] rounded-lg px-2"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="🔍 Search here....."
      />

      <div className="mt-10  border rounded-xl shadow-md relative">
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
          <tbody>{renderTableData}</tbody>
        </table>
        <ul className=" flex justify-end mb-3 mt-4">{renderPageNumbers}</ul>
      </div>
    </>
  );
}

export default UserManagement;
