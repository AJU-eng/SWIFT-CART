import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import build from "otp-input-react";
import { AiFillZhihuCircle } from "react-icons/ai";
import { MdExposureZero } from "react-icons/md";

const initialUserState = {
  loading: false,
  user: "",
  Wallet:"",
  Banner: [],
  err: "",
  singleOrders: "",
  orrderHistory: [],
  cartStock: "",
  online: "",
  Address: "",
  userData: "",
  coupon: "",
  Orders: [],
  AuthError: "",
  Cart: "",
  OrderedData: [],
  WishList: null,
  quantity: 1,
  otp_status: "",
  login_status: "",
  products: "",
  SingleProduct: [],
  email: "",
  password_reset: "",
};

const initialLoggedState = {
  logged: false,
};

export const registerUser = createAsyncThunk(
  "user/Register",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/generateOtp",
        { userCredentials },
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data;
    } catch (err) {
      console.log(err.response.data + "=======================");
      return rejectWithValue(err.response.data);
    }
  }
);
export const cancelOrder = createAsyncThunk(
  "user/cancelOrder",
  async (price) => {
    const res = await axios.post(
      "http://localhost:3000/user/caancelOrder",
      price
    );
    return res.data;
  }
);
export const passwordReset = createAsyncThunk(
  "user/resetPassword",
  async (upData) => {
    console.log(upData);
    const res = await axios.patch(
      "http://localhost:3000/user/resetPassword",
      upData
    );
  }
);

export const verifyUser = createAsyncThunk(
  "user/verifyOtp",
  async (otp, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/user/verifyOtp",
        { otp },
        { headers: { "Content-Type": "application/json" } }
      );
      return resp.data;
    } catch (err) {
      // console.log(err+"==================err");
      return rejectWithValue(err);
    }
  }
);

export const findProduct = createAsyncThunk("user/findProduct", async (id) => {
  const res = await axios.post(`http://localhost:3000/user/findProduct/${id}`);
  console.log(res.data);
  return res.data;
});
export const getBanner = createAsyncThunk("user/getBanner", async () => {
  const res = await axios.get("http://localhost:3000/admin/getBanner");
  return res.data;
});
export const GetProducts = createAsyncThunk("user/products", async () => {
  const res = await axios.get("http://localhost:3000/user/getProducts");
  return res.data;
});
export const getCart = createAsyncThunk("user/getCart", async () => {
  const res = await axios.get("http://localhost:3000/user/getCartData");
  return res.data;
});
export const logouts = createAsyncThunk("user/logout", async () => {
  return axios.get("http://localhost:3000/user/logout").then((res) => res.data);
});
export const forgetOtp = createAsyncThunk(
  "user/forgetOtp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/forgetPasswordOtp",
        { email }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const verifyForgetOtps = createAsyncThunk(
  "user/forgetOtpVerify",
  async (otp_sec) => {
    console.log(otp_sec);
    const res = await axios.post(
      "http://localhost:3000/user/verifyForgetOtp",
      otp_sec
    );
    return res.data;
  }
);
export const singleOrder = createAsyncThunk(
  "user/singleOrder",
  async (data) => {
    const res = await axios.post(
      "http://localhost:3000/user/singleOrder",
      data
    );
    return res.data;
  }
);

export const returnOrder = createAsyncThunk(
  "user/returnOrder",
  async (data) => {
    const res = await axios.post("http://localhost:3000/user/return", data);
  }
);
export const resendOtps = createAsyncThunk(
  "user/resend",
  async (userCredentials) => {
    console.log(userCredentials);
    const res = await axios.post(
      "http://localhost:3000/user/resendOtp",
      userCredentials
    );
    return res.data;
  }
);
export const logged = createAsyncThunk("user/logged", async () => {
  const res = await axios.get("http://localhost:3000/user/checkLogStatus");
  return res.data;
});
// export const userLogin = createAsyncThunk(
//   "user/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {

//       const res = await axios.post(
//         "http://localhost:3000/user/login",
//         { email, password },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       // console.log(res.data);
//       return res.data;
//     }catch(err){
//       console.log(err);
//       return rejectWithValue(err)
//     }
//   }
// );
export const AdminLogout = createAsyncThunk("admin/logout", async () => {
  const logout = await axios.get("http://localhost:3000/admin/logout");
  return logout.data;
});
export const getWishList = createAsyncThunk("user/getwish", async () => {
  const res = await axios.get("http://localhost:3000/user/getWishlist");
  return res.data;
});
export const deleteWishlist = createAsyncThunk(
  "user/deleteWish",
  async (product) => {
    const res = await axios.post(
      "http://localhost:3000/user/deleteWish",
      product
    );
    return res.data;
  }
);
export const deleteCartProduct = createAsyncThunk(
  "user/deleteCartProduct",
  async (name) => {
    const res = await axios.patch(
      "http://localhost:3000/user/deleteCartProduct",
      name
    );
    return res.data;
  }
);
export const editUserData = createAsyncThunk(
  "user/editUser",
  async (userData) => {
    const res = await axios.patch(
      "http://localhost:3000/user/editUser",
      userData
    );
    return res.data;
  }
);
export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (Products, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        "http://localhost:3000/user/addToCart",
        Products,
        { headers: { "Content-Type": "application/json" } }
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const increment = createAsyncThunk(
  "user/incrementProduct",
  async (productName, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/incrementProduct",
        productName
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const placeOrders = createAsyncThunk(
  "user/placeOrder",
  async (OrderDetails) => {
    const res = await axios.post(
      "http://localhost:3000/user/placeOrder",
      OrderDetails
    );
    return res.data;
  }
);
export const OrderedDataAction = createAsyncThunk(
  "user/getOrders",
  async () => {
    const res = await axios.get("http://localhost:3000/user/getOrder");
    return res.data;
  }
);
export const AddToWish = createAsyncThunk(
  "user/wish",
  async (productName, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/wishlist",
        productName
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const makeOrders = createAsyncThunk("user/order", async (products) => {
  const res = await axios.post(
    "http://localhost:3000/user/makeOrder",
    products
  );
  return res.data;
});

export const getWalletDetails=createAsyncThunk("user/getWalletDetails",async()=>{
   const res=await axios.get("http://localhost:3000/user/getWallet")
   return res.data
})
export const userDetail = createAsyncThunk("user/userDetails", async () => {
  const res = await axios.get("http://localhost:3000/user/userData");
  return res.data;
});
export const onlinePayments = createAsyncThunk(
  "user/onlinePay",
  async (data) => {
    const res = await axios.post(
      "http://localhost:3000/user/onlinePayment",
      data
    );
    return res.data;
  }
);
export const userLogin = createAsyncThunk(
  "user/login",
  async (hello, { rejectWithValue }) => {
    try {
      console.log(JSON.stringify(hello) + "redux login state=======");
      const res = await axios.post("http://localhost:3000/user/login", hello, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      console.log(err.response.data + "===========================");
      return rejectWithValue(err.response.data); // Pass the error message here
    }
  }
);
export const getAddress = createAsyncThunk("user/address", async () => {
  const data = await axios.get("http://localhost:3000/user/address");
  return data.data;
});
export const decrementProduct = createAsyncThunk(
  "user/decrement",
  async (name) => {
    const hel = await axios.patch("http://localhost:3000/user/decrement", name);
    return hel.data;
  }
);
export const getCouponCodes = createAsyncThunk("user/getCoupon", async () => {
  const res = await axios.get("http://localhost:3000/admin/getCoupon");
  return res.data;
});

export const getOrderHistory = createAsyncThunk(
  "user/orderHistory",
  async () => {
    const res = await axios.get("http://localhost:3000/user/orderHistory");
    return res.data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: { ...initialUserState },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload);
        state.err = "";
      }),
      builder.addCase(registerUser.rejected, (state, action) => {
        console.log(action.payload + "======redux state");
        (state.loading = false), (state.err = action.payload);
      });
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      state.otp_status = action.payload;
    });
    builder.addCase(verifyUser.rejected, (state, action) => {
      state.otp_status = action.payload;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.login_status = action.payload;
      state.loading = false;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log(action.error.message);
      state.loading = false;
      state.err = action.payload;
    });
    builder.addCase(getWishList.fulfilled, (state, action) => {
      state.WishList = action.payload;
    });
    builder.addCase(logouts.fulfilled, (state) => {
      state.login_status = "not logined";
      state.user = "";
    });
    builder.addCase(AdminLogout.fulfilled, (state) => {
      state.login_status = "not logined";
    });
    builder.addCase(GetProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(findProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findProduct.fulfilled, (state, action) => {
      state.SingleProduct = action.payload;
      state.loading = false;
    });
    builder.addCase(forgetOtp.fulfilled, (state, action) => {
      state.email = action.payload;
      console.log(state.email + "===============email");
    });

    builder.addCase(forgetOtp.rejected, (state, action) => {
      state.err = action.payload;
      console.log(state.err + "=========redux err");
      console.log(state.email + "==========redux sucess");
    });
    builder.addCase(verifyForgetOtps.fulfilled, (state, action) => {
      state.otp_status = action.payload;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.Cart = action.payload;
    });
    builder.addCase(userDetail.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(editUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      console.log(state.userData + "=======redux user state");
    });
    builder.addCase(increment.fulfilled, (state, action) => {
      console.log(action.payload);
      state.Cart = action.payload;
      console.log(state.Cart + "===========redux quantity");
    });
    builder.addCase(increment.rejected, (state, action) => {
      state.cartStock = action.payload;
    });
    builder.addCase(makeOrders.fulfilled, (state, action) => {
      state.Orders = action.payload;
    });
    builder.addCase(placeOrders.fulfilled, (state, action) => {
      state.Cart = action.payload;
    });
    builder.addCase(deleteCartProduct.fulfilled, (state, action) => {
      // console.log(typeof action.payload);
      state.Cart = action.payload;
    });
    builder.addCase(decrementProduct.fulfilled, (state, action) => {
      state.Cart = action.payload;
      console.log(state.Cart);
    });
    builder.addCase(deleteWishlist.fulfilled, (state, action) => {
      state.WishList = action.payload;
    });
    builder.addCase(OrderedDataAction.fulfilled, (state, action) => {
      state.OrderedData = action.payload;
    });
    builder.addCase(cancelOrder.fulfilled, (state, action) => {
      state.OrderedData = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      console.log(action.payload);
      state.AuthError = action.payload;
    });
    builder.addCase(AddToWish.rejected, (state, action) => {
      state.AuthError = action.payload;
    });
    //  builder.addCase()
    builder.addCase(onlinePayments.fulfilled, (state, action) => {
      state.online = action.payload;
    });
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.Address = action.payload;
    });
    builder.addCase(getCouponCodes.fulfilled, (state, action) => {
      state.coupon = action.payload;
    });
    builder.addCase(getOrderHistory.fulfilled, (state, action) => {
      state.orrderHistory = action.payload;
    });
    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.Banner = action.payload;
    });
    builder.addCase(singleOrder.fulfilled, (state, action) => {
      state.singleOrders = action.payload;
    });
    builder.addCase(getWalletDetails.fulfilled,(state,action)=>{
      state.Wallet=action.payload
    })
  },
});

const loggedSlice = createSlice({
  name: "logged",
  initialState: { ...initialLoggedState },
  extraReducers: (builder) => {
    builder.addCase(logged.fulfilled, (state, action) => {
      state.logged = action.payload;
    }),
      builder.addCase(logouts.fulfilled, (state, action) => {
        state.logged = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
export const loggedReducer = loggedSlice.reducer;
