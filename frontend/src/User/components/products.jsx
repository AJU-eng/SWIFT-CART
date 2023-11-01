import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import applewatch from "../components/product images/apple.jpg";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../../redux/features/userslice";
import { Link } from "react-router-dom";
function products() {
  const dispatch = useDispatch();
  const productsArray = useSelector((state) => state.user.products);
  useEffect(() => {
    async function fetchData(){
      try{
        await dispatch(GetProducts())
      }catch(err){
        console.error("Error fetching products:", error);
      }
    }
   fetchData()
  }, [dispatch]);
  // console.log(productsArray);
  return (
    <div>
      <h1 className="text-center text-2xl lg:text-4xl mt-5 lg:mt-48 text-teal-800 font-semibold font-serif ">
        Products
      </h1>
      <div className="flex justify-around mt-5 flex-wrap lg:flex-wrap">
        {productsArray &&
          productsArray.map((product) => {
            return (
              <Link to={`/ProductDetail/${product._id}`}>
              <div className=" w-40 lg:w-56  shadow-lg mt-10">
                <div className=" bg-contain">
                  <img src={`http://localhost:3000/images/${product.moreImage[0]}`} alt="" />
                </div>
                <div className=" mb-8 h-1/2 ">
                  <p className="lg:tracking-widest  pt-2 px-2 text-lg font-serif">
                    {product.name}
                  </p>
                  <p className="font-serif px-2 lg:text-lg lg:tracking-widest">
                    with 60 hours...
                  </p>
                  <p className="px-2 font-serif lg:text-xl">{`₹${product.price}`}</p>
                  <div className="flex justify-between  mt-3 lg:mt-5">
                    <div className="w-1/2 px-2 ">
                      <AiOutlineShoppingCart size={25} />
                    </div>
                    <div className="w-1/2 px-6 lg:px-14">
                      <AiOutlineHeart size={25} />
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default products;
