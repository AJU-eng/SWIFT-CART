import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findCategory } from "../../../redux/features/AdminSlice";
import { useParams } from "react-router";

function EditCategory({ visible, onClose, id }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const Category = useSelector((state) => state.admin.SingleCategory);

  useEffect(() => {
    if (visible) {
      dispatch(findCategory(id));
    }
  }, [dispatch, id, visible]);


  useEffect(() => {
    if (Category) {
      setName(Category.name);
    }
  }, [Category]);
  return (
    visible && (
      <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
        <button onClick={onClose}>x</button>
        <div className="bg-white p-2 rounded w-96 px-5">
          <form encType="multipart/form-data" action="" className="mt-5 mb-10">
            <label htmlFor="" className="font-serif">
              Category Name
            </label>
            <br />
            <input
              type="text"
              name="name"
              value={name}
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

              className="border border-cyan-600 mt-2 mb-3"
            />
            <br />
            <br />
            <div className="flex justify-center">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit Category
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default EditCategory;
