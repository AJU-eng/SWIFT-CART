import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
// import product1 from "../assets/product1.png";
import applewatch from "../components/product images/apple.jpg";
// import './Offer.css'
function TopOffers() {
  return (
    <div className="h-80 ">
      <h1 className="text-center text-2xl lg:text-4xl mt-5 lg:mt-16 text-teal-800 font-semibold font-serif ">
        Top Offers
      </h1>
      <div className="flex justify-around mt-4 flex-wrap">
      <div className=" w-40 lg:w-56  shadow-lg mt-10 bg-white">
          <div className=" bg-contain">
            <img src={applewatch} alt="" />
          </div>
          <div className=" mb-8 h-1/2 ">
            <p className="tracking-widest  pt-2 px-2 text-lg font-serif">
              Boult Z40|Earbuds
            </p>
            <p className="font-serif px-2 text-lg tracking-widest">with 60 hours...</p>
            <p className="px-2 font-serif lg:text-xl">₹10,000</p>
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
        <div className=" w-40 lg:w-56  shadow-lg mt-10">
          <div className=" bg-contain">
            <img src={applewatch} alt="" />
          </div>
          <div className=" mb-8 h-1/2 ">
            <p className="tracking-widest  pt-2 px-2 text-lg font-serif">
              Boult Z40|Earbuds
            </p>
            <p className="font-serif px-2 text-lg tracking-widest">with 60 hours...</p>
            <p className="px-2 font-serif lg:text-xl">₹10,000</p>
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
        <div className=" w-40 lg:w-56  shadow-lg mt-10">
          <div className=" bg-contain">
            <img src={applewatch} alt="" />
          </div>
          <div className=" mb-8 h-1/2 ">
            <p className="tracking-widest  pt-2 px-2 text-lg font-serif">
              Boult Z40|Earbuds
            </p>
            <p className="font-serif px-2 text-lg tracking-widest">with 60 hours...</p>
            <p className="px-2 font-serif lg:text-xl">₹10,000</p>
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
        <div className=" w-40 lg:w-56  shadow-lg mt-10">
          <div className=" bg-contain">
            <img src={applewatch} alt="" />
          </div>
          <div className=" mb-8 h-1/2 ">
            <p className="lg:tracking-widest  pt-2 px-2 text-lg font-serif">
              Boult Z40|Earbuds
            </p>
            <p className="font-serif px-2 lg:text-lg lg:tracking-widest">with 60 hours...</p>
            <p className="px-2 font-serif lg:text-xl">₹10,000</p>
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
      </div>
    </div>
  );
}

export default TopOffers;
