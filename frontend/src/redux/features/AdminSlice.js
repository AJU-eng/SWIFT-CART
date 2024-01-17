import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import products from "../../User/components/products";
import { BiAccessibility } from "react-icons/bi";

const initialDataState = {
  loading: false,
  users: [],
  categories: [],
  returns:"",
  csvfile:"",
  singleReturn:"",
  Banner: "",
  coupon: [],
  TotalData: "",
  sales: "",
  logged: "",
  Orders: [],
  Products: [],
  CategoriesProduct: [],
  err: "",
  ProductToEdit: "",
  category_status: "",
  SingleCategory: "",
};

export const fetchUsers = createAsyncThunk("admin/FetchUser", () => {
  return axios
    .get(`${URL}admin/getUser`)
    .then((res) => res.data);
});
export const findEditProduct = createAsyncThunk(
  "admin/productEdit",
  async (id) => {
    console.log(id);
    const res = await axios.post(
      `${URL}user/findProduct/${id}`
    );
    // console.log((await res).data);
    return await res.data;
  }
);
export const CategoriesProductAdd = createAsyncThunk(
  "admin/cateProduct",
  async () => {
    const res = await axios.get(`${URL}admin/getCateProduct`);
    return res.data;
  }
);
export const BlockUsers = createAsyncThunk(
  "admin/BlockUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}admin/blockUser`,
        { id }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const UnblockUsers = createAsyncThunk(
  "admin/Unblock",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${URL}admin/userUnblock`, {
        id,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const getCouponCodesAdmin = createAsyncThunk(
  "admin/getCoupon",
  async () => {
    const res = await axios.get(`${URL}admin/getCoupon`);
    return res.data;
  }
);

export const DeleteUser = createAsyncThunk(
  "admin/Delete",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${URL}admin/userDelete/${id}`,
        id
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const singleReturns=createAsyncThunk("admin/singleReturns",async(data)=>{
  const res=await axios.post(`${URL}admin/singleReturn`,data)
  return res.data
})
export const GetProductsAdmin = createAsyncThunk("user/products", async () => {
  const res = await axios.get(`${URL}user/getProducts`);
  return res.data;
});

export const getCategory = createAsyncThunk("admin/getCat", async () => {
  const res = await axios.get(`${URL}admin/getCategories`);
  return res.data;
});

export const addCategory = createAsyncThunk(
  "admin/category",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${URL}admin/categoryAdd`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const findCategory = createAsyncThunk(
  "admin/CategoryEdit",
  async (id) => {
    const res = await axios.post(`${URL}admin/findCategory`, {
      id,
    });
    return res.data;
  }
);
export const EditCate = createAsyncThunk("admin/editCate", async (formdata) => {
  console.log(formdata);
  const res = await axios.post(
    `${URL}admin/editCategory`,
    formdata,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
});
export const EditProducts = createAsyncThunk(
  "admin/editProduct",
  async (formData) => {
    const data = await axios.patch(
      `${URL}admin/editProduct`,
      formData
    );
    return data.data;
  }
);

export const DeleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id) => {
    console.log(id);
    const data = await axios.delete(
      `${URL}admin/deleteProduct/${id}`
    );
    return data.data;
  }
);

export const adminLogged = createAsyncThunk("admin/logged", async () => {
  const adminLog = axios.get(`${URL}admin/adminLogged`);
  return (await adminLog).data;
});

export const getOrders = createAsyncThunk("admin/getOrdersAdmin", async () => {
  const res = await axios.get(`${URL}admin/getOrder`);
  return res.data;
});
export const AddProductspo = createAsyncThunk(
  "admin/addProducts",
  async (formData, { rejectWithValue }) => {
    const res = axios.post(`${URL}admin/AddProducts`, formData);
    return (await res).data;
  }
);
export const blockCategory = createAsyncThunk(
  "admin/blockCategory",
  async (id) => {
    const res = await axios.post(`${URL}admin/blockCategory`, {
      id,
    });
    return res.data;
  }
);
export const editOrderstatus = createAsyncThunk(
  "admin/editOrderstatus",
  async (status) => {
    const edit = axios.post(
      `${URL}admin/editOrderstatus`,
      status
    );
  }
);
export const getTotalData = createAsyncThunk("admin/getTotals", async () => {
  const res = await axios.get(`${URL}admin/getTotalData`);
  return res.data;
});

export const unblocksCategory = createAsyncThunk(
  "admin/categoryunblock",
  async (id) => {
    const res = await axios.post(
      `${URL}admin/unblockCategory`,
      { id }
    );
    return res.data;
  }
);
export const weeklySales = createAsyncThunk("admin/weekly", async () => {
  const data = await axios.get(`${URL}admin/sales`);
  return data.data;
});
export const monthlySales = createAsyncThunk("admin/monthly", async () => {
  const data = await axios.get(`${URL}admin/montly_sales`);
  return data.data;
});
export const YearlySales = createAsyncThunk("admin/yearly", async () => {
  const res = await axios.get(`${URL}admin/yearly`);
  return res.data;
});
export const AddBanner = createAsyncThunk("admin/bannerAdd", async (data) => {
  const res = await axios.post(`${URL}admin/BannerAdd`, data);
  return res.data;
});
export const addCoupon = createAsyncThunk("admin/addCoupon", async (data) => {
  console.log(data);
  const res = await axios.post(`${URL}admin/addCoupon`, data);
  return res.data;
});

export const BlockCoupon = createAsyncThunk(
  "admin/couponBlock",
  async (data) => {
    const res = await axios.post(
      `${URL}admin/couponBlock`,
      data
    );
    return res.data;
  }
);
export const getBanners=createAsyncThunk("admin/getBanner",async()=>{
  
    
    const res=await axios.get( `${URL}admin/getBanner`)
    return res.data
  
})
export const getReturns=createAsyncThunk("admin/returns",async()=>{
  const res=await axios.get(`${URL}admin/getReturn`)
  return res.data
})
export const unBlockCoupon = createAsyncThunk(
  "admin/unBlockCoupon",
  async (data) => {
    const res = await axios.post(
     ` ${URL}admin/couponunBlock`,
      data
    );
    return res.data;
  }
);
export const deleteBanners=createAsyncThunk("admin/deleteBanner",async(id)=>{
  const res=await axios.post(`${URL}admin/deleteBanner`,id)
  return res.data
})

export const downloadReport=createAsyncThunk("admin/report",async(data)=>{
    const res=await axios.post("http://localhost:300/admin/report",data)
    return res.data
})

export const approveReturns=createAsyncThunk("admin/approveReturn",async(data)=>{
   const res=await axios.post(`${URL}admin/approveReturn`,data)
   
})
const adminSlice = createSlice({
  name: "admin",
  initialState: { ...initialDataState },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        (state.loading = false),
          (state.users = action.payload),
          (state.err = "");
      }),
      builder.addCase(fetchUsers.rejected, (state, action) => {
        (state.loading = false),
          (state.users = []),
          (state.err = action.error.message);
      });
    builder.addCase(BlockUsers.fulfilled, (state, action) => {
      const blockuser = state.users.map((user) => {
        if (user._id === action.payload._id) {
          user.status = action.payload.status;
        }
        return user;
      });
      state.users = blockuser;
    });
    builder.addCase(UnblockUsers.fulfilled, (state, action) => {
      const unblockuser = state.users.map((user) => {
        if (user._id === action.payload._id) {
          user.status = action.payload.status;
        }
        return user;
      });
      state.users = unblockuser;
    });
    builder.addCase(DeleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(
        (user) => user._id != action.payload._id
      );
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
    });

    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.updatedCategories = [...state.categories, action.payload];
    });
    builder.addCase(blockCategory.fulfilled, (state, action) => {
      const blockCategory = state.categories.map((category) => {
        if (category._id === action.payload._id) {
          category.status = action.payload.status;
        }
        return category;
      });
      state.categories = blockCategory;
    });
    builder.addCase(unblocksCategory.fulfilled, (state, action) => {
      const unblockCateegory = state.categories.map((category) => {
        if (category._id === action.payload._id) {
          category.status = action.payload.status;
        }
        return category;
      });
      state.categories = unblockCateegory;
    });
    builder.addCase(findCategory.fulfilled, (state, action) => {
      state.SingleCategory = action.payload;
    });
    builder.addCase(GetProductsAdmin.fulfilled, (state, action) => {
      state.Products = action.payload;
    });
    builder.addCase(DeleteProduct.fulfilled, (state, action) => {
      state.Products = state.Products.filter(
        (product) => product._id !== action.payload._id
      );
    });
    builder.addCase(downloadReport.fulfilled,(state,action)=>{
        state.csvfile=action.payload
    })
    builder.addCase(findEditProduct.fulfilled, (state, action) => {
      // console.log(JSON.stringify(action.payload)+"=======================reduxstate");
      state.ProductToEdit = action.payload;
      console.log(
        JSON.stringify(state.ProductToEdit) +
          "=============================redux"
      );
    });
    builder.addCase(adminLogged.fulfilled, (state, action) => {
      state.logged = action.payload;
      console.log(state.logged + "===============logged slice");
    });
    builder.addCase(CategoriesProductAdd.fulfilled, (state, action) => {
      state.CategoriesProduct = action.payload;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.Orders = action.payload;
    });
    builder.addCase(getTotalData.fulfilled, (state, action) => {
      state.TotalData = action.payload;
    });
    builder.addCase(weeklySales.fulfilled, (state, action) => {
      state.sales = action.payload;
      console.log(action.payload);
    });
    builder.addCase(monthlySales.fulfilled, (state, action) => {
      state.sales = action.payload;
    });
    builder.addCase(YearlySales.fulfilled, (state, action) => {
      state.sales = action.payload;
    });
    builder.addCase(getCouponCodesAdmin.fulfilled, (state, action) => {
      state.coupon = action.payload;
    });
    builder.addCase(BlockCoupon.fulfilled, (state, action) => {
      const blockCoupon = state.coupon.map((item) => {
        if (item._id === action.payload._id) {
          item.status = action.payload.status;
        }
        return item;
      });
      console.log(blockCoupon);
      state.coupon = blockCoupon;
    });
    builder.addCase(unBlockCoupon.fulfilled, (state, action) => {
      const unblock = state.coupon.map((item) => {
        if (item._id === action.payload._id) {
          item.status = action.payload.status;
        }
        return item;
      });
      state.coupon = unblock;
    });
    builder.addCase(AddBanner.fulfilled, (state, action) => {
      state.Banner = action.payload;
    });
    builder.addCase(getBanners.fulfilled,(state,action)=>{
      state.Banner=action.payload
    })
    builder.addCase(deleteBanners.fulfilled,(state,action)=>{
      state.Banner=state.Banner.filter((item)=>{
        item._id!==action.payload._id
      })
    })
    builder.addCase(getReturns.fulfilled,(state,action)=>{
      state.returns=action.payload
    })
    builder.addCase(singleReturns.fulfilled,(state,action)=>{
      state.returns=action.payload
    })
  },
});

export default adminSlice.reducer;
