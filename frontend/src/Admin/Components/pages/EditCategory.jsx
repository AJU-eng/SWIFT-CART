import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditCate, findCategory } from "../../../redux/features/AdminSlice";
import { useParams } from "react-router";

function EditCategory({ visible, onClose, id }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image,setImage]=useState(null)
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("id",id)
    formData.append("image", image);
    console.log(formData);
    dispatch(EditCate(formData));
  };
  return (
    visible && (
      <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
        <button onClick={onClose}>x</button>
        <div className="bg-white p-2 rounded w-96 px-5">
          <form encType="multipart/form-data" onSubmit={handleSubmit} action="" className="mt-5 mb-10">
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
              onChange={(e)=>setImage(e.target.files[0])}
              className="border border-cyan-600 mt-2 mb-3"
            />
            <br />
            <br />
            <div className="flex justify-center">
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
