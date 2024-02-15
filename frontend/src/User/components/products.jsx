import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import applewatch from "../components/product images/apple.jpg";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URI } from "../../redux/features/api";
import { GetProducts } from "../../redux/features/ProductSlice";
import { addToCart } from "../../redux/features/cartSlice";
import { AddToWish } from "../../redux/features/wishListSlice";

function products() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user.logged);
  const err = useSelector((state) => state.user.AuthError);
  const productsArray = useSelector((state) => state.products.products);
  const wishError = useSelector((state) => state.wishlist.wishErr);
  const [heart,setHeart]=useState([])
  const [added, setAdded] = useState("");
  useEffect(() => {
    dispatch(GetProducts());
  }, [dispatch]);

  useEffect(() => {
    if (wishError == "item Already exists") {
      console.log(wishError);
      toast.error("item already exits");
    } else if (wishError === "Added") {
      toast.success("Added to Wishlist");
    }
  }, [wishError]);

  return (
    <div id="Products">
      <h1 className="text-center text-2xl lg:text-4xl mt-5 lg:mt-60  text-teal-800 font-semibold font-serif ">
        Products
      </h1>
      <div className="flex justify-around mt-5 flex-wrap lg:flex-wrap">
        {productsArray &&
          productsArray.map((product) => {
            const isAddedToWishlist = heart.includes(product._id);
            return (
              // <Link to={`/ProductDetail/${product._id}`}>
              <div className=" w-40 lg:w-56  shadow-lg mt-10">
                <Link to={`/ProductDetail/${product._id}`}>
                  <div className=" bg-contain">
                    <img src={`${BASE_URI}images/${product.moreImage[0]}`} alt="" />
                  </div>
                </Link>
                <div className=" mb-8 h-1/2 ">
                  <p className="lg:tracking-widest  pt-2 px-2 text-lg font-serif">
                    {product.name}
                  </p>
                  <p className="font-serif px-2 lg:text-lg lg:tracking-widest">
                    with 60 hours...
                  </p>
                  {product.offer ? (
                    <p className="line-through text-gray-600">
                      {product.price}
                    </p>
                  ) : (
                    <p>{product.price}</p>
                  )}
                  {product.offer && (
                    <p className="font-serif text-xl px-2">{product.offer}</p>
                  )}
                  {/* <p className="px-2 font-serif lg:text-xl">{`₹${product.price}`}</p> */}
                  <div className="flex justify-between  mt-3 lg:mt-5">
                    <div className="w-1/2 px-2 mb-5">
                      <AiOutlineShoppingCart
                        onClick={() => {
                          if (user) {
                            if (product.offer) {
                              dispatch(
                                addToCart({
                                  ProductName: product.name,
                                  Price: product.offer,
                                  ProductImage: product.moreImage[0],
                                })
                              );
                              toast.success("Added to Cart");
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
                          } else {
                            nav("/login");
                          }
                        }}
                        size={25}
                      />
                    </div>
                    <div className="w-1/2 px-6 lg:px-14">
                      {isAddedToWishlist ?<FaHeart size={25} onClick={()=>setHeart([])} color="red"/>:<AiOutlineHeart
                        size={25}
                        onClick={() => {
                          if (user) {
                            dispatch(
                              AddToWish({
                                name: product.name,
                                price: product.price,
                                image: product.moreImage[0],
                              })
                            );
                            // setHeart(true)
                            setHeart((prev)=>[...prev,product._id])
                            // setAdded("Added")
                          } else {
                            nav("/login");
                          }
                        }}
                      />}
                      
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
