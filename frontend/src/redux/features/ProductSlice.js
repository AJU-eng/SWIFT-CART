import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URI } from "./api";
import axios  from "axios";
const initalProductState = {
  loading: false,
  products: "",
  SingleProduct: [],
  ProductToEdit: "",
  AdminProducts: [],
};

export const findProduct = createAsyncThunk("user/findProduct", async (id) => {
  const res = await axios.post(`${BASE_URI}user/findProduct/${id}`);
  console.log(res.data);
  return res.data;
});

export const GetProductsAdmin = createAsyncThunk("user/Adminproducts", async () => {
  const res = await axios.get(`${BASE_URI}user/getProducts`);
  return res.data;
});

export const GetProducts = createAsyncThunk("user/products", async () => {
  const res = await axios.get(`${BASE_URI}user/getProducts`);
  return res.data;
});

export const EditProducts = createAsyncThunk(
  "admin/editProduct",
  async (formData) => {
    const data = await axios.patch(`${BASE_URI}admin/editProduct`, formData);
    return data.data;
  }
);

export const DeleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id) => {
    console.log(id);
    const data = await axios.delete(`${BASE_URI}admin/deleteProduct/${id}`);
    return data.data;
  }
);
export const findEditProduct = createAsyncThunk(
  "admin/productEdit",
  async (id) => {
    console.log(id);
    const res = await axios.post(`${BASE_URI}user/findProduct/${id}`);
    // console.log((await res).data);
    return await res.data;
  }
);

export const AddProductspo = createAsyncThunk(
  "admin/addProducts",
  async (formData, { rejectWithValue }) => {
    const res = axios.post(`${BASE_URI}admin/AddProducts`, formData);
    return (await res).data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { ...initalProductState },
  extraReducers: (builder) => {
    builder.addCase(findProduct.pending, (state, action) => {
      (state.loading = true),
        (state.ProductToEdit = ""),
        (state.SingleProduct = []),
        (state.products = "");
      state.AdminProducts = [];
    }),
      builder.addCase(findProduct.fulfilled, (state, action) => {
        (state.loading = false),
          (state.ProductToEdit = ""),
          (state.SingleProduct = action.payload),
          (state.products = "");
        state.AdminProducts = [];
      });

    builder.addCase(GetProducts.pending, (state, action) => {
      (state.loading = true),
        (state.ProductToEdit = ""),
        (state.SingleProduct = []),
        (state.products = "");
      state.AdminProducts = [];
    });
    builder.addCase(GetProducts.fulfilled, (state, action) => {
      (state.loading = false),
        (state.ProductToEdit = ""),
        (state.SingleProduct = []),
        (state.products = action.payload);
      state.AdminProducts = [];
    });

    builder.addCase(GetProductsAdmin.pending, (state, action) => {
      (state.loading = true),
        (state.AdminProducts = []),
        (state.ProductToEdit = ""),
        (state.SingleProduct = []),
        (state.products = "");
      state.AdminProducts = [];
    });
    builder.addCase(GetProductsAdmin.fulfilled, (state, action) => {
      (state.loading = false),
        (state.AdminProducts = action.payload),
        (state.ProductToEdit = ""),
        (state.SingleProduct = []),
        (state.products = "");
    });

    builder.addCase(findEditProduct.pending,(state,action)=>{
        state.loading=true,
        state.AdminProducts=[],
        state.ProductToEdit="",
        state.SingleProduct=[],
        state.products=""
    })

    builder.addCase(findEditProduct.fulfilled,(state,action)=>{
        state.loading=false,
        state.AdminProducts=[],
        state.ProductToEdit=action.payload,
        state.SingleProduct=[],
        state.products=""
    })

    builder.addCase(DeleteProduct.fulfilled, (state, action) => {
        state.AdminProducts = state.AdminProducts.filter(
          (product) => product._id !== action.payload._id
        );
      });
  },
});


export const productReducer=productSlice.reducer
