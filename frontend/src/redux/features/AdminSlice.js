import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialDataState = {
  loading: false,
  users: [],
  categories: [],
  updatedCategories: [],
  err: "",
};

export const fetchUsers = createAsyncThunk("admin/FetchUser", () => {
  return axios
    .get("http://localhost:3000/admin/getUser")
    .then((res) => res.data);
});

export const BlockUsers = createAsyncThunk(
  "admin/BlockUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/blockUser",
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
      const res = await axios.post("http://localhost:3000/admin/userUnblock", {
        id,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const DeleteUser = createAsyncThunk(
  "admin/Delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/admin/userDelete", {
        id,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCategory = createAsyncThunk("admin/getCat", async () => {
  const res = await axios.get("http://localhost:3000/admin/getCategories");
  return res.data;
});

export const addCategory = createAsyncThunk(
  "admin/category",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/admin/categoryAdd",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const AddProductspo=createAsyncThunk("admin/addProducts",async(formData,{rejectWithValue})=>{
  const res=axios.post("http://localhost:3000/admin/AddProducts",formData)
  return (await res).data
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
  },
});

export default adminSlice.reducer;
