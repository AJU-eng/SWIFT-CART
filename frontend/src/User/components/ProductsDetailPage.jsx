import React, { useEffect, useState } from "react";
import rating from "./product images/star.webp";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, findProduct } from "../../redux/features/userslice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./zoom.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Rating } from "react-simple-star-rating";
function ProductsDetailPage() {
  const error = useSelector((state) => state.user.AuthError);
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.user.SingleProduct);
  const Loading = useSelector((state) => state.user.loading);
  // Inside your component function
  const [isImageHovered, setIsImageHovered] = useState(false);

  const [currentImage, setCurrentImage] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(findProduct(id));
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchData();
  }, [dispatch, id]);
  useEffect(() => {
    // Update currentImage when product data is available
    if (product && product.moreImage && product.moreImage.length > 0) {
      setCurrentImage(`http://localhost:3000/images/${product.moreImage[0]}`);
    }
  }, [product]);

  console.log(product.name);

  return (
    <div className="flex ">
      {Loading ? (
        <div className="flex">
          <div className=" w-1/2">
            <div>
              <Skeleton height={450} className="mx-60 mt-7" width={400} />
            </div>
            <div className="flex mx-[17rem] space-x-4 mt-7">
              <Skeleton height={100} width={100} />
              <Skeleton height={100} width={100} />
              <Skeleton height={100} width={100} />
            </div>
          </div>
          <div className="w-1/2 ">
            <div className="mt-7 mx-14">
              <Skeleton height={40} width={300} />
              <Skeleton height={30} className="mt-4" width={300} />
              <Skeleton height={10} className="mt-4" width={100} />
              <div className="mx-10 ">
                <Skeleton height={10} width={400} count={15} />
              </div>
            </div>
            <div>
              <Skeleton height={40} width={100} className="mt-5 mx-7" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gray-50 w-1/2 min-h-screen">
            <div className=" bg-white w-1/2 h-[28rem] flex justify-center items-center mt-7 shadow-lg mx-44">
              <img
                src={currentImage}
                className={`w-72 h-[22rem] ${
                  isImageHovered ? "hover-zoom" : ""
                }`}
                alt=""
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              />
            </div>
            <div className="flex w-full mx-[12rem] space-x-3 mt-[1rem] h-[5rem]">
              {product && product.moreImage ? (
                <div
                  className="bg-white shadow-lg w-24 h-10"
                  onClick={() =>
                    setCurrentImage(
                      `http://localhost:3000/images/${product.moreImage[1]}`
                    )
                  }
                >
                  <img
                    src={`http://localhost:3000/images/${product.moreImage[1]}`}
                    alt=""
                  />
                </div>
              ) : null}
              {product && product.moreImage ? (
                <div
                  className="bg-white shadow-lg w-24 h-10 "
                  onClick={() =>
                    setCurrentImage(
                      `http://localhost:3000/images/${product.moreImage[2]}`
                    )
                  }
                >
                  <img
                    src={`http://localhost:3000/images/${product.moreImage[2]}`}
                    alt=""
                  />
                </div>
              ) : null}
              {product && product.moreImage ? (
                <div
                  className="bg-white shadow-lg w-24 h-10"
                  onClick={() =>
                    setCurrentImage(
                      `http://localhost:3000/images/${product.moreImage[3]}`
                    )
                  }
                >
                  <img
                    src={`http://localhost:3000/images/${product.moreImage[3]}`}
                    alt=""
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className="bg-gray-50 w-1/2">
            {product ? (
              <>
                <h2 className="mx-1 text-3xl font-serif mt-10">
                  {product.name}
                </h2>

                <h2 className="mx-1 text-3xl font-serif mt-5">{`₹${product.price}`}</h2>
                {product.description && (
                  <div className="mx-1 mt-3">
                    <h3 className="text-lg font-serif">About this item</h3>
                    <ul className="mt-4 mx-10">
                      {product.description.split("\n").map((item, index) => (
                        <li
                          key={index}
                          className="text-sm font-serif list-disc"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  onClick={() => {
                    console.log(product.price + "hello guyse");
                    if (error === "not logined") {
                      nav("/login");
                    } else {
                      dispatch(
                        addToCart({
                          ProductName: product.name,
                          Price: product.price,
                          ProductImage: product.moreImage[0],
                        })
                      );
                      toast.success("Great Choice ! Item added to Cart");
                    }
                  }}
                  className="bg-blue-400 rounded-lg mt-10 w-36 h-12 text-lg font-serif font-bold text-white"
                >
                  Add to Cart
                </button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default ProductsDetailPage;
