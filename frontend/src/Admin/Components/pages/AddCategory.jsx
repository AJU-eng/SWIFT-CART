import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/features/AdminSlice";

function AddCategory({ visible, onClose }) {
  if (!visible) {
    return null;
  }
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const CategorySubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Image:", image);
    console.log("Stock:", stock);
  
    const formData = new FormData();
    formData.append("name",name)
    formData.append("stock",stock)
    formData.append("image",image)
    console.log(formData);
    // for (const key of formData.keys()) {
    //   console.log(`${key}: ${JSON.stringify(formData.get(key))}`);
    // }
    dispatch(addCategory(formData));
    
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <button onClick={onClose}>x</button>
      <div className="bg-white p-2 rounded w-96 px-5">
        <form onSubmit={CategorySubmit} encType="multipart/form-data"  action="" className="mt-5 mb-10">
          <label htmlFor="" className="font-serif">
            Category Name
          </label>
          <br />
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="border border-cyan-600 mt-2 mb-3"
          />
          <br />
          <label htmlFor="" className="font-serif mt-6">
            Category Image
          </label>
          <br />
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-cyan-600 mt-2 mb-3"
          />
          <br />
          <label htmlFor="" className="font-serif">
            Stock
          </label>
          <br />
          <input type="text" name="stock" onChange={(e)=>setStock(e.target.value)} className="border border-cyan-600 mt-2 " />
          <br />
          <br />
          <div className="flex justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
