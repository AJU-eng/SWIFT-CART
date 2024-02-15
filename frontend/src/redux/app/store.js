import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// const userReducer = require("../features/userslice")
import { userReducer } from "../features/userslice";
// import { loggedReducer,userReducer } from "../features/userslice";
import { createLogger } from "redux-logger";
const logger = createLogger();
import adminReducers from "../features/AdminSlice";
import { cartReducer } from "../features/cartSlice";
import { orderReducer } from "../features/OrderSlice";
import { productReducer } from "../features/ProductSlice";
import { wishListReducer } from "../features/wishListSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducers,
    Cart: cartReducer,
    Orders: orderReducer,
    products: productReducer,
    wishlist:wishListReducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
