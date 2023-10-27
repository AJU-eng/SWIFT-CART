import React from "react";
import headphone from "./categoryImages/headphone.jpg"
import watches from "./categoryImages/watches.jpeg"
// import airpod from "./categoryImages/airpod.jpg"
import watch_yellow from "./categoryImages/watch_yello.webp"
function Category() {
  return (
    <div>
      <h1 className="text-center text-2xl lg:text-4xl mt-[32rem] lg:mt-48 text-teal-800 font-semibold font-serif ">
        Category
      </h1>
      <div className="flex justify-around mt-6 lg:mt-16">
        <div className=" w-28 lg:w-56 h-28 bg-center rounded-lg ">
           <img src={headphone} className="lg:rounded-3xl" alt="" />
        </div>
        <div className="  w-28 lg:w-56 h-28 bg-cover rounded-lg">
             <img src={watches} className="lg:rounded-3xl"  alt="" />
        </div>
        <div className="bg-green-600 w-28 lg:w-56 h-28 shadow-lg">
          <img src={watch_yellow} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Category;
