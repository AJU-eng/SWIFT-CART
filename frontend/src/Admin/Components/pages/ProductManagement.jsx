import React, { useEffect, useState } from "react";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaUnlock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import date from "date-and-time";
import EditProduct from "./EditProduct";
import { Link, Navigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { BASE_URI } from "../../../redux/features/api";
import { useNavigate } from "react-router-dom";
import {
  DeleteProduct,
  GetProductsAdmin,
} from "../../../redux/features/ProductSlice";
function ProductManagement() {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const nav = useNavigate();
  const products = useSelector((state) => state.products.AdminProducts);
  useEffect(() => {
    dispatch(GetProductsAdmin());
  }, [dispatch]);
  useEffect(() => {
    if (products) {
      console.log(products);
    }
  }, [products]);
  if (products) {
    var filteredData = products.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  console.log(products);
  return (
    <>
      <input
        type="text"
        className="border mt-5 w-[20rem] rounded-lg px-2"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="🔍 Search here....."
      />
      <div className="mt-10  border rounded-xl shadow-md ">
        <div></div>
        <table className="w-full">
          <thead className=" h-10  ">
            <tr className="text-sm text-center text-slate-500 font-serif">
              <td className="w-32">IMAGE</td>
              <td className="w-36 ">PRODUCT NAME</td>
              <td className="w-36">ADDED</td>
              <td className="w-36">PRICE</td>
              <td className="w-36">STATUS</td>
              <td className="w-36">ACTION</td>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((product, index) => {
                return (
                  <tr className="border border-b-2 text-center h-12 font-serif">
                    <td>
                      <img
                        src={`${BASE_URI}images/${product.moreImage[0]}`}
                        alt=""
                        className="h-12 mx-11"
                      />
                    </td>
                    <td className="flex justify-center  ">{product.name}</td>
                    <td>
                      {product.createdAt
                        ? date.format(
                            new Date(product.createdAt),
                            "DD /MM /YYYY"
                          )
                        : "no data"}
                    </td>
                    <td>{product.price}</td>
                    <td>
                      {product.stock == 0 ? (
                        <div className="w-24  mx-16 h-7 p-1  border tracking-widest rounded-lg text-sm text-red-500 bg-red-200">
                          stock out
                        </div>
                      ) : (
                        <div className="w-24 h-7 p-1 mx-16  border tracking-widest rounded-lg text-sm text-teal-800 bg-teal-200">
                          in stock
                        </div>
                      )}
                    </td>
                    <td className="flex justify-center space-x-4 mt-2">
                      <FiEdit
                        onClick={() => nav(`editProducts/${product._id}`)}
                      />
                      <AiTwotoneDelete
                        onClick={() => {
                          console.log("delete user");
                          confirmAlert({
                            title: "Confirm to submit",
                            message: "Are you sure to do this.",
                            buttons: [
                              {
                                label: "Yes",
                                onClick: () =>
                                  dispatch(DeleteProduct(product._id)),
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
        {/* <EditProduct visible={visible}/> */}
      </div>
    </>
  );
}

export default ProductManagement;
