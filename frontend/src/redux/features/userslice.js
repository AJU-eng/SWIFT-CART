import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import build from "otp-input-react";
import { AiFillZhihuCircle } from "react-icons/ai";
import { MdExposureZero } from "react-icons/md";

const initialUserState = {
  loading: false,
  user: "",
  err: "",
  otp_status: "",
  login_status: "",
  products: "",
  SingleProduct: [],
  email: "",
  password_reset:""
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
      console.log(err.message + "=======================");
      return rejectWithValue(err);
    }
  }
);

export const passwordReset= createAsyncThunk("user/resetPassword",async(upData)=>{
  console.log(upData);
  const res=await axios.patch("http://localhost:3000/user/resetPassword",upData)
 
})

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

export const GetProducts = createAsyncThunk("user/products", async () => {
  const res = await axios.get("http://localhost:3000/user/getProducts");
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
      return rejectWithValue(err.response.data)
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
    return res.data
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
export const AdminLogout=createAsyncThunk("admin/logout",async()=>{

  const logout=await axios.get("http://localhost:3000/admin/logout")
  return logout.data
})
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err.response.data + "===========================");
      return rejectWithValue(err.response.data); // Pass the error message here
    }
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
        (state.loading = false), (state.err = action.error.message);
      });
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      state.otp_status = action.payload;
    });
    builder.addCase(verifyUser.rejected, (state, action) => {
      state.otp_status = action.payload;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.login_status = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log(action.error.message);
      state.err = action.payload;
    });
    builder.addCase(logouts.fulfilled, (state) => {
      state.login_status = "not logined";
      state.user = "";
    });
    builder.addCase(AdminLogout.fulfilled,(state)=>{
      state.login_status="not logined"
    })
    builder.addCase(GetProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(findProduct.fulfilled, (state, action) => {
      state.SingleProduct = action.payload;
    });
    builder.addCase(forgetOtp.fulfilled, (state, action) => {
      state.email = action.payload;
      console.log(state.email + "===============email");
    });
    builder.addCase(forgetOtp.rejected,(state,action)=>{
      state.err=action.payload
      console.log(state.err+"=========redux err");
      console.log(state.email+"==========redux sucess");
    })
    builder.addCase(verifyForgetOtps.fulfilled,(state,action)=>{
      state.otp_status=action.payload
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
