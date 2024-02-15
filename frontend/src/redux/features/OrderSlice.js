import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BiAccessibility } from "react-icons/bi";
import { BASE_URI } from "./api";
import axios from "axios";
const initialOrderState = {
  OrderedData: [],
  Orders: [],
  orrderHistory: [],
  singleOrders: "",
  summary: "",
  AdminOrders: [],
  loading: false,
  err: "",
  online: "",
};

export const cancelOrder = createAsyncThunk(
  "user/cancelOrder",
  async (price) => {
    const res = await axios.post(`${BASE_URI}user/caancelOrder`, price);
    return res.data;
  }
);

export const getOrders = createAsyncThunk("admin/getOrdersAdmin", async () => {
  const res = await axios.get(`${BASE_URI}admin/getOrder`);
  return res.data;
});

export const singleOrder = createAsyncThunk(
  "user/singleOrder",
  async (data) => {
    const res = await axios.post(`${BASE_URI}user/singleOrder`, data);
    return res.data;
  }
);

export const placeOrders = createAsyncThunk(
  "user/placeOrder",
  async (OrderDetails) => {
    const res = await axios.post(`${BASE_URI}user/placeOrder`, OrderDetails);
    return res.data;
  }
);

export const OrderedDataAction = createAsyncThunk(
  "user/getOrders",
  async () => {
    const res = await axios.get(`${BASE_URI}user/getOrder`);
    return res.data;
  }
);

export const makeOrders = createAsyncThunk(
  "user/MakeOrder",
  async (products) => {
    const res = await axios.post(`${BASE_URI}user/makeOrder`, products);
    return res.data;
  }
);

export const onlinePayments = createAsyncThunk(
  "user/onlinePay",
  async (data) => {
    const res = await axios.post(`${BASE_URI}user/onlinePayment`, data);
    return res.data;
  }
);

export const getOrderHistory = createAsyncThunk(
  "user/orderHistory",
  async () => {
    const res = await axios.get(`${BASE_URI}user/orderHistory`);
    return res.data;
  }
);

export const returnOrder = createAsyncThunk(
  "user/returnOrder",
  async (data) => {
    const res = await axios.post(`${BASE_URI}user/return`, data);
  }
);

const OrderSlice = createSlice({
  name: "Orders",
  initialState: { ...initialOrderState },
  extraReducers: (builder) => {
    builder.addCase(cancelOrder.fulfilled, (state, action) => {
      state.OrderedData = action.payload;

      state.loading = false;
    });
    builder.addCase(singleOrder.pending, (state, action) => {
      state.singleOrders = "";
      (state.OrderedData = []),
        (state.AdminOrders = []),
        (state.Orders = []),
        (state.err = ""),
        (state.loading = true),
        (state.orrderHistory = []),
        (state.singleOrders = ""),
        (state.summary = ""),
        (state.err = "");
      state.online = "";
    });
    builder.addCase(singleOrder.fulfilled, (state, action) => {
      (state.singleOrders = action.payload), (state.loading = false);
    });
    builder.addCase(OrderedDataAction.pending, (state, action) => {
      state.loading = true;
      state.err = "";
    });
    builder.addCase(OrderedDataAction.fulfilled, (state, action) => {
      (state.OrderedData = action.payload), (state.err = "");
      state.loading = false;
    }),
      builder.addCase(makeOrders.fulfilled, (state, action) => {
        (state.Orders = action.payload), (state.loading = false);
      });

    builder.addCase(placeOrders.pending, (state, action) => {
      //   (state.Orders = []),
      (state.singleOrders = ""),
        (state.AdminOrders = ""),
        (state.err = ""),
        (state.loading = true),
        (state.orrderHistory = []),
        (state.summary = ""),
        (state.err = "");
      state.online = "";
    });
    builder.addCase(placeOrders.fulfilled, (state, action) => {
      //   (state.Orders = []),

      (state.loading = false), (state.summary = action.payload);
    });

    builder.addCase(onlinePayments.fulfilled, (state, action) => {
      //   (state.Orders = []),

      (state.loading = false), (state.online = action.payload);
    });
    builder.addCase(getOrderHistory.pending, (state, action) => {
      (state.Orders = []),
        (state.singleOrders = ""),
        (state.AdminOrders = ""),
        (state.err = ""),
        (state.loading = true),
        (state.orrderHistory = []),
        (state.summary = ""),
        (state.err = "");
      state.online = "";
    });
    builder.addCase(getOrderHistory.fulfilled, (state, action) => {
      (state.loading = false), (state.orrderHistory = action.payload);
    });

    builder.addCase(getOrders.pending, (state, action) => {
      (state.Orders = []),
        (state.singleOrders = ""),
        (state.AdminOrders = ""),
        (state.err = ""),
        (state.loading = true),
        (state.orrderHistory = []),
        (state.summary = ""),
        (state.err = "");
      state.online = "";
    });

    builder.addCase(getOrders.fulfilled, (state, action) => {
      (state.AdminOrders = action.payload), (state.loading = false);
    });
  },
});

export const orderReducer = OrderSlice.reducer;
