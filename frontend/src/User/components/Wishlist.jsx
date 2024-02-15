import React, { useEffect } from "react";
import iphone from "../components/product images/iphone 6/iphone_15.jpg";
import { useDispatch, useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import {
  deleteWishlist,
  getWishList,
} from "../../redux/features/wishListSlice";
import { BASE_URI } from "../../redux/features/api";
import wish from "../components/assets/wishl.jpg";
import { isBlocked } from "../../redux/features/userslice";
function Wishlist() {
  const dispatch = useDispatch();
  const WishList = useSelector((state) => state.wishlist.WishList);
  const loading = useSelector((state) => state.wishlist.loading);
  useEffect(() => {
    dispatch(getWishList());
    dispatch(isBlocked())
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center align-middle mt-28">
        <RingLoader
          color={"lightBlue"}
          // loading={loading}
          // cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      ) : (
        <div className="flex space-x-5">
          {WishList && WishList.length !== 0 ? (
            WishList.map((product) => {
              return (
                <div className="h-[17rem] bg-white w-[10rem] shadow-md">
                  <div className="bg-slate-100 h-[7rem]">
                    <div className="bg-contain">
                      <img src={`${BASE_URI}images/${product.image}`} alt="" />
                    </div>
                  </div>
                  <div>
                    <p className="lg:tracking-widest  pt-12 px-2 text-md  font-serif">
                      {product.name}
                    </p>
                    <p className="font-serif px-2 lg:text-sm lg:tracking-widest">
                      with 60 hours...
                    </p>
                    <p className="px-2 font-serif lg:text-md">{`${product.Price}`}</p>
                    <button
                      onClick={() =>
                        dispatch(
                          deleteWishlist({
                            name: product.name,
                            price: product.Price,
                            image: product.image,
                          })
                        ).catch((err) => console.log(err))
                      }
                      className="font-serif text-md text-blue-500 hover:text-white hover:bg-blue-500 border-blue-100 mt-3 border w-full h-8 bg-white"
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-80 pt-14">
              <img src={wish} className="h-[20rem]" alt="" />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Wishlist;
