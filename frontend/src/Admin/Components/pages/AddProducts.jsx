import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/features/AdminSlice";

function AddProducts({ visible, onClose }) {
  return (
    <div>
      <h2 className="font-serif text-3xl font-medium ">Add Products</h2>
      <div className=" w-96 mt-5 font-serif">
        <form action="">
          <p className="text-xl">Product name</p>
          <input type="text" className="border border-gray-950 mt-2 " />
          <p className="text-xl mt-5  ">Product Description</p>
          <textarea
            type="text"
            cols={30}
            rows={4}
            className="border border-gray-950 mt-1"
          />
          <p className="text-xl mt-5">Product Image</p>
          <input type="file" className="border border-gray-950 mt-1" />
          <p className="text-xl mt-5">Product Price</p>
          <input type="text" className="border border-gray-950 mt-1" /><br /><br />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Products
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProducts;
