import React, { useEffect, useRef, useState } from "react";
import AddImage from "./add-button.png";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AddBanner, deleteBanners, getBanners } from "../../../redux/features/AdminSlice";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { BASE_URI } from "../../../redux/features/api";
function BannerManagement() {
  const refs = useRef();
  const [preview, setPreview] = useState();
  const dispatch = useDispatch();
  const Banners = useSelector((state) => state.admin.Banner);
  const [banner,setBanner]=useState("")
  

  useEffect(()=>{
    dispatch(getBanners())
  },[dispatch])

  useEffect(()=>{
    setBanner(Banners)
  },[Banners])
  const formData = new FormData();
  const uploadBanner = () => {
    formData.append("file", preview);
    dispatch(AddBanner(formData));
    setPreview(null)
  };

  useEffect(() => {
    if (Banners.length !== 0) {
      setBanner(Banners)
    }
  }, [Banners]);
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-serif text-xl ">Banner Management</p>
        {preview?<button
          onClick={() => {
            refs.current.click();
            console.log(preview);
          }}
          className="bg-blue-400 rounded-lg pt-1 font-medium   w-[15rem]  text-white flex "
        >
          <IoMdAdd className="mx-2" size={23} />
          <span className="px-1 pb-1">CHANGE BANNER IMAGE</span>
        </button>:<button
          onClick={() => {
            refs.current.click();
            console.log(preview);
          }}
          className="bg-blue-400 rounded-lg pt-1 font-medium   w-[11rem]  text-white flex "
        >
          <IoMdAdd className="mx-2" size={23} />
          <span className="px-1 pb-1"> BANNER IMAGE</span>
        </button>}
       
        <input
          onChange={(e) => setPreview(e.target.files[0])}
          accept="image/*"
          ref={refs}
          type="file"
          className="hidden"
        />
      </div>
      <div className="flex justify-center">
        <div className=" h-[17rem] border w-[31rem] flex justify-center items-center rounded-md mt-4 object-contain bg-slate-50">
          {preview ? (
            <img
              src={URL.createObjectURL(preview)}
              className="w-full h-full object-contain"
              alt=""
            />
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-lg font-serif">No Preview Avaliable</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center ">
        {preview && (
          <button
            onClick={() => uploadBanner()}
            className="mt-5 font-serif bg-blue-400 w-28 h-8 text-white rounded-md text-md"
          >
            upload Image
          </button>
        )}
      </div>
      <div className="flex mt-8 ">
        {/* <Slider> */}

        {banner.length !== 0 &&
          banner.map((Banner) => {
            console.log(Banner._id)
            return (
              <div className="bg-slate-100 h-[12rem] w-80 mx-3 ">
                <AiFillCloseCircle onClick={()=>{
                  dispatch(deleteBanners({_id:Banner._id}))
                }}/>
                <img
                  src={`${BASE_URI}images/${Banner.Image}`}
                  alt=""
                />
              </div>
            );
          })}
        {/* </Slider> */}
      </div>
    </div>
  );
}

export default BannerManagement;
