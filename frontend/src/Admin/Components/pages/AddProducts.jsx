import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  // AddProductspo,
  CategoriesProductAdd,
  addCategory,
  getCategory,
} from "../../../redux/features/AdminSlice";
import AddImages from "./add-button.png";
import { useNavigate } from "react-router";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddProductspo } from "../../../redux/features/ProductSlice";
function AddProducts() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [selectedImages, setselectedImages] = useState([]);
  const dispatch = useDispatch();
  const Cateogries = useSelector((state) => state.admin.CategoriesProduct);
  const nav=useNavigate()
  useEffect(() => {
    dispatch(CategoriesProductAdd());
  }, [dispatch, getCategory]);

  const triggerFileInput = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
    // console.log(Cateogries);
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files;
    const ImageArray = Array.from(selectedFile);
    console.log(ImageArray);
    setselectedImages(ImageArray);
    console.log(selectedImages);
  };

  const addProducts = (e) => {
    e.preventDefault();
    if (name!==""&&price!==""&&category!==""&&stock!==""&&description!==""&&selectedImages.length!==0) {
      
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("description", description);
      selectedImages.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });
      
      dispatch(AddProductspo(formData));
      // nav("")
      nav("/admin/products")
      toast.success("product added Sucessfully")
    }
    else{
      toast.error("All feilds are required")
    }
  };
  return (
    <div>
      <h2 className="font-serif text-3xl font-medium ">Add Products</h2>
      <div className=" w-96 mt-6 font-serif ">
        <form action="" onSubmit={addProducts}>
          <div className="flex w-full">
            <div>
              <div className="flex justify-around space-x-10 ">
                <div>
                  <label htmlFor="" className="text-lg">
                    Product name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className=" mt-2 border-blue-300 border"
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-lg">
                    Product Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    className=" mt-2 border-blue-300 border"
                  />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-lg">Description</p>
                <textarea
                  name="description"
                  id=""
                  cols="46"
                  rows="10"
                  onChange={(e) => setDescription(e.target.value)}
                  className=" mt-2 border-blue-300 border "
                ></textarea>
              </div>
              <div className="flex">
                <div className="mt-3">
                  <p className="text-lg">Category</p>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setCategory(e.target.value)}
                    className="border mt-3 border-blue-300 "
                  >
                    <option value="">Select your Category</option>
                    {Cateogries.map((category) => (
                      <option key={category.id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4 mx-7">
                  <p>Stock</p>
                  <input
                    type="text"
                    onChange={(e) => setStock(e.target.value)}
                    className=" mt-3 border-blue-300 border border-solid "
                  />
                </div>
              </div>
            </div>
            <div className=" w-96 mx-5  ">
              <div className="w-96">
                <p className="text-xl mx-9">Cover Image</p>
                {selectedImages.length == 0 ? (
                  <div className="w-64  h-36  items-center mx-10 my-10 outline-dashed outline-blue-200 border rounded-lg">
                    <div className="flex justify-center mt-10">
                      <img
                        src={AddImages}
                        onClick={triggerFileInput}
                        className="h-11 "
                        alt=""
                      />
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        id="fileInput"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center mt-10">
                    <AiFillCloseCircle
                      onClick={() =>
                        setselectedImages(
                          selectedImages.filter((image) => image[0] != image)
                        )
                      }
                    />
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      id="fileInput"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <img
                      src={URL.createObjectURL(selectedImages[0])}
                      // onClick={triggerFileInput}
                      className="h-36 w-auto "
                      alt=""
                    />
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      id="fileInput"
                      multiple
                      className="hidden"
                      // onChange={handleFileChange}
                    />
                  </div>
                )}

                <p className="text-xl mx-9">Views </p>
                <div className="flex justify-around space-x-4 mx-9 w-96 ">
                  {selectedImages.length != 0 ? (
                    selectedImages.map((image, index) => {
                      if (index == 0) return;
                      return (
                        <div
                          key={index}
                          className="flex justify-center mt-10 w-64 h-24 outline-dashed outline-blue-300 object-center "
                        >
                          <AiFillCloseCircle
                            onClick={() =>
                              setselectedImages(
                                selectedImages.filter((e) => e !== image)
                              )
                            }
                          />
                          <img
                            src={URL.createObjectURL(image)}
                            className="h-auto w-auto   "
                            alt=""
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex mx-12 space-x-4">
                      <div className="flex justify-center mt-10 w-28 h-24 outline-dashed outline-blue-300">
                        <img src={AddImages} className="h-10 mt-6 " alt="" />
                      </div>
                      <div className="flex justify-center mt-10 w-28 h-24 outline-dashed outline-blue-300">
                        <img src={AddImages} className="h-10 mt-6 " alt="" />
                      </div>
                      <div className="flex justify-center mt-10 w-28 h-24 outline-dashed outline-blue-300">
                        <img src={AddImages} className="h-10 mt-6 " alt="" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-400 rounded-lg mt-10 w-32 h-10 text-base font-serif font-bold text-white"
          >
            Add Products
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default AddProducts;
