import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URI } from "./api";
import axios from "axios";
const initialWishListState={
    loading:false,
    wishErr: "",
    WishList: null,
}


export const getWishList = createAsyncThunk("user/getwish", async () => {
    const res = await axios.get(`${BASE_URI}user/getWishlist`);
    return res.data;
  });

  export const deleteWishlist = createAsyncThunk(
    "user/deleteWish",
    async (product) => {
      const res = await axios.post(`${BASE_URI}user/deleteWish`, product);
      return res.data;
    }
  );

  export const AddToWish = createAsyncThunk(
    "user/wish",
    async (productName, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${BASE_URI}user/wishlist`, productName);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  const wishSlice=createSlice({
    name:"wishlist",
    initialState:{...initialWishListState},
    extraReducers:(builder)=>{
        builder.addCase(getWishList.pending,(state,action)=>{
            state.loading=true,
            state.WishList=null,
            state.wishErr=""
        })
        builder.addCase(getWishList.fulfilled,(state,action)=>{
            state.loading=false,
            state.WishList=action.payload,
            state.wishErr=""
        })

        builder.addCase(deleteWishlist.fulfilled,(state,action)=>{
            state.loading=false,
            state.WishList=action.payload,
            state.wishErr=""
        })

        builder.addCase(AddToWish.fulfilled,(state,action)=>{
            state.loading=false,
            state.WishList=null,
            state.wishErr="Added"
        })
        builder.addCase(AddToWish.rejected,(state,action)=>{
            state.wishErr=action.payload
            state.loading=false
        })
    }
  })

  export const wishListReducer=wishSlice.reducer