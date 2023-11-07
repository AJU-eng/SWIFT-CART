import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  AddProductspo,
  EditProducts,
  addCategory,
  findEditProduct,
  getCategory,
} from "../../../redux/features/AdminSlice";
import AddImages from "./add-button.png";
import { json, useParams } from "react-router";
import { findProduct } from "../../../redux/features/userslice";

function EditProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [preCategory, setPreCategory] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [fetchedImages, setfetchedImages] = useState([]);
  const [ActualImages, setActualImages] = useState([]);
  const dispatch = useDispatch();
  const SingleProduct = useSelector((state) => state.admin.ProductToEdit);
  const Cateogries = useSelector((state) => state.admin.categories);
  const ProductEdit = useSelector((state) => state.admin.ProductToEdit);
  const id = useParams();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(findEditProduct(id.id));
  }, [dispatch, id, findProduct]);

  useEffect(() => {
    if (ProductEdit) {
      setName(ProductEdit.name);
      setPrice(ProductEdit.price);
      setDescription(ProductEdit.description);
      setStock(ProductEdit.stock);
      setfetchedImages(ProductEdit.moreImage);
    }
  }, [ProductEdit]);

  const triggerFileInput = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };
  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files;
  //   const ImageArray = Array.from(selectedFile);
  //   const editIndex=e.target.getAttribute("data-edit-index");
  //   if(editIndex!=null)
  //   {
  //     const updatedImages=[...fetchedImages];
  //     updatedImages[editIndex]=ImageArray[0]
  //     setfetchedImages(updatedImages)

  //   }
  //   else{
  //     setfetchedImages(ImageArray)
  //   }
  //   console.log(ImageArray);
  //   setfetchedImages(ImageArray);
  //   console.log(fetchedImages);
  // };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files;
    const ImageArray = Array.from(selectedFile);
    const editIndex = e.target.getAttribute("data-edit-index");

    if (editIndex !== null) {
      // Editing an image
      const updatedImages = [...fetchedImages];
      updatedImages[editIndex] = ImageArray[0];
      setfetchedImages(updatedImages);
    } else {
      // Adding a new image
      setfetchedImages([...fetchedImages, ...ImageArray]);
    }
  };

  const handleEditImage = (index) => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.setAttribute("data-edit-index", index);
      fileInput.click();
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    console.log(fetchedImages);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("description", description);
    fetchedImages.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });
    console.log(name);
    console.log(price);
    console.log(stock);
    console.log(description);
    
    dispatch(EditProducts(formData));
  };
  return (
    <div>
      <h2 className="font-serif text-3xl font-medium ">Edit Products</h2>
      <div className=" w-96 mt-6 font-serif ">
        <form action="" onSubmit={editProduct}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=" mt-2 border-blue-300 border-2"
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-lg">
                    Product Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className=" mt-2 border-blue-300 border-2"
                  />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-lg">Description</p>
                <textarea
                  name="description"
                  id=""
                  cols="46"
                  value={description}
                  rows="10"
                  onChange={(e) => setDescription(e.target.value)}
                  className=" mt-2 border-blue-300 border-2 "
                ></textarea>
              </div>
              <div className="mt-3">
                <p className="text-lg">Category</p>
                <select
                  name=""
                  id=""
                  onChange={(e) => setCategory(e.target.value)}
                  className="border mt-3 border-blue-300 border-2"
                >
                  <option value="">Select your Category</option>
                  {/* {Cateogries.map((category) => (
                    <option key={category.id} value={category._id}>
                      {preCategory}
                    </option>
                  ))} */}
                </select>
              </div>
              <div className="mt-5">
                <p>Stock</p>
                <input
                  type="text"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className=" mt-3 border-blue-300 border-2 border-solid border-2"
                />
              </div>
            </div>
            <div className=" w-96 mx-5  ">
              <div className="w-96">
                <p className="text-xl mx-9">Cover Image</p>
                {fetchedImages && fetchedImages.length == 0 ? (
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
                        accept="image/png,image/jpeg"
                        id="fileInput"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center mt-10">
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      id="fileInput"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    <img
                      src={`http://localhost:3000/images/${ProductEdit.moreImage[0]}`}
                      onClick={triggerFileInput}
                      className="h-36 w-auto "
                      alt=""
                    />

                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      id="fileInput"
                      multiple
                      className="hidden"
                      // onChange={handleFileChange}
                    />
                  </div>
                )}

                <p className="text-xl mx-9">Views </p>
                <div className="flex justify-around space-x-4 mx-9 w-96 ">
                  {fetchedImages && fetchedImages.length != 0 ? (
                    fetchedImages.map((image, index) => {
                      if (index == 0) return;
                      return (
                        <div
                          key={index}
                          className="flex justify-center mt-10 w-64 h-24 outline-dashed outline-blue-300 object-center "
                        >
                          <AiFillCloseCircle
                            onClick={() => handleEditImage(index)}
                          />
                          <img
                            src={`http://localhost:3000/images/${ProductEdit.moreImage[index]}`}
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
          <button type="submit" className="bg-blue-500">
            Edit products
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
