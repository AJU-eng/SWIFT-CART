import React, { useEffect } from "react";
import iphone from "../components/product images/iphone 6/iphone_15.jpg";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishlist, getWishList } from "../../redux/features/userslice";
function Wishlist() {
  const dispatch = useDispatch();
  const WishList = useSelector((state) => state.user.WishList);
  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  return (
    <>
      <div className="flex space-x-5">
        {WishList &&
          WishList.map((product) => {
            return (
              <div className="h-[17rem] bg-white w-[10rem] shadow-md">
                <div className="bg-slate-100 h-[7rem]">
                  <div className="bg-contain">
                    <img
                      src={`${URL}images/${product.image}`}
                      alt=""
                    />
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
                          price: product.price,
                          image: product.image,
                        })
                      )
                    }
                    className="font-serif text-md text-blue-500 hover:text-white hover:bg-blue-500 border-blue-100 mt-3 border w-full h-8 bg-white"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Wishlist;
