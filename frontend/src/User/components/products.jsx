import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import applewatch from "../components/product images/apple.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToWish,
  GetProducts,
  addToCart,
} from "../../redux/features/userslice";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function products() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const err = useSelector((state) => state.user.AuthError);
  const productsArray = useSelector((state) => state.user.products);
  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(GetProducts());
      } catch (err) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, [dispatch]);
  // console.log(productsArray);
  return (
    <div>
      <h1 className="text-center text-2xl lg:text-4xl mt-5 lg:mt-60 text-teal-800 font-semibold font-serif ">
        Products
      </h1>
      <div className="flex justify-around mt-5 flex-wrap lg:flex-wrap">
        {productsArray &&
          productsArray.map((product) => {
            return (
              // <Link to={`/ProductDetail/${product._id}`}>
              <div className=" w-40 lg:w-56  shadow-lg mt-10">
                <Link to={`/ProductDetail/${product._id}`}>
                  <div className=" bg-contain">
                    <img
                      src={`http://localhost:3000/images/${product.moreImage[0]}`}
                      alt=""
                    />
                  </div>
                </Link>
                <div className=" mb-8 h-1/2 ">
                  <p className="lg:tracking-widest  pt-2 px-2 text-lg font-serif">
                    {product.name}
                  </p>
                  <p className="font-serif px-2 lg:text-lg lg:tracking-widest">
                    with 60 hours...
                  </p>
                  <p className="px-2 font-serif lg:text-xl">{`₹${product.price}`}</p>
                  <div className="flex justify-between  mt-3 lg:mt-5">
                    <div className="w-1/2 px-2 mb-5">
                      <AiOutlineShoppingCart
                        onClick={() => {
                          console.log(err+"frontend");
                          if (err === "not logined") {
                            nav("/login");
                          } else {
                            dispatch(
                              addToCart({
                                ProductName: product.name,
                                Price: product.price,
                                ProductImage: product.moreImage[0],
                              })
                            );
                            toast.success("Added to Cart");
                          }
                        }}
                        size={25}
                      />
                    </div>
                    <div className="w-1/2 px-6 lg:px-14">
                      <AiOutlineHeart
                        size={25}
                        onClick={() => {
                          if (err === "not logined") {
                            nav("/login");
                          } else {
                            dispatch(
                              AddToWish({
                                name: product.name,
                                price: product.price,
                                image: product.moreImage[0],
                              })
                            ),
                              toast.success("Item Added to wishList");
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default products;
