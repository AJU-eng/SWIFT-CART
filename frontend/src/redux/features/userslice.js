import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import build from "otp-input-react";
import { AiFillZhihuCircle } from "react-icons/ai";
import { MdExposureZero } from "react-icons/md";
import { BASE_URI } from "./api";
import { FaLessThanEqual } from "react-icons/fa";
// import { logout } from "../../../../backend/controller/userController";
const initialUserState = {
  loading: false,
  user: "",
  Wallet: "",
  Banner: [],
  Blocked:false,
  recent: "",
  logged: "",
  otp_err: "",
  err: "",
  singleAddress: "",
  Address: "",
  userData: "",
  AuthError: "",
  otp_status: "",
  login_status: "",
  email: "",
  password_reset: "",
};

export const registerUser = createAsyncThunk(
  "user/Register",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URI}user/generateOtp`,
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

export const passwordReset = createAsyncThunk(
  "user/resetPassword",
  async (upData) => {
    console.log(upData);
    const res = await axios.patch(`${BASE_URI}user/resetPassword`, upData);
  }
);

export const deleteAddress = createAsyncThunk(
  "user/delelteAddress",
  async (data) => {
    const res = await axios.post(`${BASE_URI}user/deleteAddress`, data);
    return res.data;
  }
);

export const verifyUser = createAsyncThunk(
  "user/verifyOtp",
  async (otp, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        `${BASE_URI}user/verifyOtp`,
        { otp },
        { headers: { "Content-Type": "application/json" } }
      );
      return resp.data;
    } catch (err) {
      // console.log(err+"==================err");
      return rejectWithValue(err.response.data);
    }
  }
);
export const returnOrder = createAsyncThunk(
  "user/returnOrder",
  async (data) => {
    const res = await axios.post(`${BASE_URI}user/return`, data);
  }
);
export const recentadd = createAsyncThunk("user/recent", async () => {
  const res = await axios.get(`${BASE_URI}user/recentAddress`);
  return res.data;
});
export const getBanner = createAsyncThunk("user/getBanner", async () => {
  const res = await axios.get(`${BASE_URI}admin/getBanner`);
  return res.data;
});

export const logouts = createAsyncThunk("user/logout", async () => {
  return axios.get(`${BASE_URI}user/logout`).then((res) => res.data);
});
export const forgetOtp = createAsyncThunk(
  "user/forgetOtp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URI}user/forgetPasswordOtp`, { email });
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
    const res = await axios.post(`${BASE_URI}user/verifyForgetOtp`, otp_sec);
    return res.data;
  }
);

export const resendOtps = createAsyncThunk(
  "user/resend",
  async (userCredentials) => {
    console.log(userCredentials);
    const res = await axios.post(`${BASE_URI}user/resendOtp`, userCredentials);
    return res.data;
  }
);
export const logged = createAsyncThunk("user/logged", async () => {
  const res = await axios.get(`${BASE_URI}user/checkLogStatus`);
  return res.data;
});

export const AdminLogout = createAsyncThunk("admin/logouts", async () => {
  const logout = await axios.get(`${BASE_URI}admin/logout`);
  return logout.data;
});

export const AddAddress = createAsyncThunk("user/addAddress", async (data) => {
  const res = await axios.post(`${BASE_URI}user/addAddress`, data);
  return res.data;
});
export const editUserData = createAsyncThunk(
  "user/editUser",
  async (userData) => {
    const res = await axios.patch(`${BASE_URI}user/editUser`, userData);
    return res.data;
  }
);

export const getWalletDetails = createAsyncThunk(
  "user/getWalletDetails",
  async () => {
    const res = await axios.get(`${BASE_URI}user/getWallet`);
    return res.data;
  }
);
export const userDetail = createAsyncThunk("user/userDetails", async () => {
  const res = await axios.get(`${BASE_URI}user/userData`);
  return res.data;
});

export const userLogin = createAsyncThunk(
  "user/login",
  async (hello, { rejectWithValue }) => {
    try {
      console.log(JSON.stringify(hello) + "redux login state=======");
      const res = await axios.post(`${BASE_URI}user/login`, hello, {
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

export const findAddress = createAsyncThunk("user/findAddres", async (data) => {
  const res = await axios.post(`${BASE_URI}user/findAdd`, data);
  return res.data;
});
export const getAddress = createAsyncThunk("user/address", async () => {
  const data = await axios.get(`${BASE_URI}user/address`);
  return data.data;
});

export const isBlocked=createAsyncThunk("user/isBlocked",async()=>{
  const res=await axios.get(`${BASE_URI}user/blockCheck`)
  return res.data
})

const userSlice = createSlice({
  name: "user",
  initialState: { ...initialUserState },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.err=""
    }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload);
        state.err = "";
      }),
      builder.addCase(registerUser.rejected, (state, action) => {
        console.log(action.payload + "======redux state");
        (state.loading = false), (state.err = action.payload);
      });
    builder.addCase(verifyUser.pending, (state, action) => {
      state.loading = true;
      state.err=""
    });
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      state.loading = false;
      state.otp_status = action.payload;
      state.logged = true;
      state.err=""
    });
    builder.addCase(verifyUser.rejected, (state, action) => {
      state.otp_status = action.payload;
      state.loading = false;
      state.err=""
      // state.otp_err=action.payload
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.err=""

    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.login_status = action.payload;
      state.err=""
      state.loading = false;
      if (action.payload === "logined") {
        state.logged = true;
      } else {
        state.logged = false;
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log(action.error.message);
      state.loading = false;
      state.err = action.payload;
    });

    builder.addCase(AdminLogout.fulfilled, (state) => {
      state.login_status = "not logined";
      state.loading=false
      state.err=""
    });

    builder.addCase(forgetOtp.fulfilled, (state, action) => {
      state.email = action.payload;
      console.log(state.email + "===============email");
      state.loading=false
      state.err=""
    });

    builder.addCase(forgetOtp.rejected, (state, action) => {
      state.loading=false
      state.err = action.payload;
      console.log(state.err + "=========redux err");
      console.log(state.email + "==========redux sucess");
    });
    builder.addCase(verifyForgetOtps.fulfilled, (state, action) => {
      state.otp_status = action.payload;
      state.loading=false
      state.err=""
    });
    builder.addCase(userDetail.pending,(state,action)=>{
      state.loading=true
      state.err=""
    })
    builder.addCase(userDetail.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.loading=false
      state.err=""
    });
    builder.addCase(editUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      console.log(state.userData + "=======redux user state");
      state.loading=false
      state.err=""
    });
    builder.addCase(getAddress.pending,(state,action)=>{
      state.loading=true
      state.err=""
    })
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.Address = action.payload;
      state.loading=false
      state.err=""
    });
   
    
    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.Banner = action.payload;
      state.loading=false
      state.err=""
    });

    builder.addCase(getWalletDetails.pending,(state,action)=>{
      state.loading=true
      state.err=""
    })

    builder.addCase(getWalletDetails.fulfilled, (state, action) => {
      state.Wallet = action.payload;
      state.loading=false
      state.err=""
    });
    builder.addCase(AddAddress.fulfilled, (state, action) => {
      state.Address = action.payload;
      state.loading=false
      state.err=""
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.Address = action.payload;
      state.loading=false
      state.err=""
    });
    builder.addCase(findAddress.fulfilled, (state, action) => {
      state.singleAddress = action.payload;
      state.loading=false
      state.err=""
    });
    builder.addCase(recentadd.pending,(state,action)=>{
      state.loading=true
      state.err=""
    })
    builder.addCase(recentadd.fulfilled, (state, action) => {
      state.recent = action.payload;
      state.loading=false
      state.err=""
    });
    builder.addCase(logouts.fulfilled, (state, action) => {
      state.logged = action.payload;
      state.loading=false
      state.err=""
    });
    builder.addCase(logged.fulfilled, (state, action) => {
      state.logged = action.payload;
      state.loading=false
      state.err=""
    });
    builder.addCase(isBlocked.fulfilled,(state,action)=>{
      state.loading=false,
      state.err="",
      state.Blocked=action.payload.success
      console.log(JSON.stringify(action.payload.success)+"payload");
    })
  },
});

export const userReducer = userSlice.reducer;
