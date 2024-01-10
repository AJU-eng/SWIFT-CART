import React, { useEffect } from "react";
import banner from "./banner1.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "../../../redux/features/userslice";

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };
  const dispatch = useDispatch();

  const Banners = useSelector((state) => state.user.Banner);

  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);
  useEffect(() => {
    if (Banners) {
      console.log(Banners);
    }
  });
  return (
    <div>
      <Slider {...settings}>
        {Banners.length !== 0 &&
          Banners.map((banner) => {
            return (
              <div className="h-[35rem]">
                <img
                  src={`http://localhost:3000/images/${banner.Image}`}
                  className="h-[38rem] w-full"
                  alt=""
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
}

export default Banner;
