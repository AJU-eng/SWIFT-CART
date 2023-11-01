import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import build from "otp-input-react";

const initialUserState = {
  loading: false,
  user: "",
  err: "",
  otp_status: "",
  login_status: "",
  products: "",
  SingleProduct: [],
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

export const verifyUser = createAsyncThunk(
  "user/verifyOtp",
  async (otp, { rejectWithValue }) => {
    const resp = await axios.post(
      "http://localhost:3000/user/verifyOtp",
      { otp },
      { headers: { "Content-Type": "application/json" } }
    );
    return resp.data;
  }
);

export const findProduct = createAsyncThunk("user/findProduct", async (id) => {
 const res= await axios.post(`http://localhost:3000/user/findProduct/${id}`);
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

export const logged = createAsyncThunk("user/logged", async () => {
  const res = await axios.get("http://localhost:3000/user/checkLogStatus");
  return res.data;
});
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    const res = await axios.post(
      "http://localhost:3000/user/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
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
        (state.loading = false), (state.err = action.error.message);
      });
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      state.otp_status = action.payload;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.login_status = action.payload;
    });
    builder.addCase(logouts.fulfilled, (state) => {
      state.login_status = "not logined";
    });
    builder.addCase(GetProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(findProduct.fulfilled, (state, action) => {
      state.SingleProduct = action.payload;
    });
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
