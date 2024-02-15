import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URI } from "./api";
import axios from "axios";
const initialCartState = {
  cartStock: "",
  quantity: 1,
  coupon: "",
  Cart: "",
  err:"",
  loading: false,
  
};

export const getCart = createAsyncThunk("user/getCart", async () => {
  const res = await axios.get(`${BASE_URI}user/getCartData`);
  return res.data;
});

export const deleteCartProduct = createAsyncThunk(
  "user/deleteCartProduct",
  async (name) => {
    const res = await axios.patch(`${BASE_URI}user/deleteCartProduct`, name);
    return res.data;
  }
);



export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (Products, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${BASE_URI}user/addToCart`, Products, {
        headers: { "Content-Type": "application/json" },
      });
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
        const res = await axios.post(`${BASE_URI}user/incrementProduct`, productName);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const decrementProduct = createAsyncThunk(
    "user/decrement",
    async (name) => {
      const hel = await axios.patch(`${BASE_URI}user/decrement`, name);
      return hel.data;
    }
  );

  export const getCouponCodes = createAsyncThunk("user/getCoupon", async () => {
    const res = await axios.get(`${BASE_URI}admin/getCoupon`);
    console.log(res.data);
    return res.data;
  });


  const cartSlice=createSlice({
    name:"Cart",
    initialState:{...initialCartState},
    extraReducers:(builder)=>{
        builder.addCase(getCart.pending,(state,action)=>{
            state.Cart="",
            state.cartStock="",
           
            state.loading=true,
            state.quantity=1
        })

        builder.addCase(getCart.fulfilled,(state,action)=>{
            

                state.Cart=action.payload,
                state.cartStock="",
               
                state.loading=false
                
            
        }),
        builder.addCase(increment.fulfilled,(state,action)=>{
            state.Cart=action.payload,
            state.cartStock="",
            
            state.loading=false
            
        })
        builder.addCase(increment.rejected,(state,action)=>{
          
            state.cartStock=action.payload,
         state.loading=false

     
        })

       

        builder.addCase(deleteCartProduct.fulfilled,(state,action)=>{
            state.Cart=action.payload,
            state.cartStock="",
           
            state.loading=false
        })

        builder.addCase

        builder.addCase(decrementProduct.fulfilled,(state,action)=>{
            state.Cart=action.payload,
            state.cartStock="",
            state.loading=false

        })

        builder.addCase(getCouponCodes.fulfilled,(state,action)=>{
          state.coupon=action.payload
          state.loading=false
          state.cartStock=""
        })
    }
  })


  export const cartReducer=cartSlice.reducer