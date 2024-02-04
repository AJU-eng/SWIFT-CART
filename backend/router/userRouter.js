const express=require('express')
const { generate, verifyOtp,loggedIn,logout, login, forgetPasswordOtp, verifyForgetOtp, resetPassword, resentOtp, fetchUser, editUser, BlockedCheck } = require('../controller/userController')
const { getProducts, findProduct } = require('../controller/ProductContoller')
const { AddtoCart, getCartData, IncrementProduct, deleteCart, deleteCartData, DecrementProduct } = require('../controller/CartController')
const { AddToList, getWishList, deleteWishlist } = require('../controller/WishListController')
const { makeOrder, PlaceOrder, getOrder, cancelOrder, orderHistory, onlinePayment, salesReport, singleOrder } = require('../controller/OrderController')
const auth=require("../Middleware/auth")
const { addAddress, getAddresses, deleteAddress, findAddress, EditAddress, getRecentAddress } = require('../controller/AddressController')
const { returnRequest } = require('../controller/returnController')
const getWallet = require('../controller/WalletController')

const router=express.Router()

router.post('/generateOtp',generate)
router.post("/resendOtp",resentOtp)
router.post('/verifyOtp',verifyOtp)
router.get('/checkLogStatus',loggedIn)
router.get('/logout',logout)
router.post('/login',login)
router.get("/getProducts",getProducts)
router.post("/addToCart",auth,AddtoCart)
router.get("/getOrder",auth,getOrder)
router.get("/getCartData",auth,getCartData)
router.post("/incrementProduct",auth,IncrementProduct)
router.patch("/decrement",auth,DecrementProduct)
router.post("/findProduct/:id",findProduct)
router.post("/wishlist",auth,AddToList)
router.post("/makeOrder",auth,makeOrder)
router.get("/sales",salesReport)
router.post("/onlinePayment",onlinePayment)
router.post("/addAddress",addAddress)
router.get("/address",getAddresses)
router.post("/placeOrder",auth,PlaceOrder)
router.patch("/deleteCartProduct",auth,deleteCartData)
router.get("/getWishlist",auth,getWishList)
router.post("/deleteWish",auth,deleteWishlist)
router.post("/caancelOrder",auth,cancelOrder)
router.get("/userData",auth,fetchUser)
router.get("/orderHistory",auth,orderHistory)
router.patch("/editUser",auth,editUser)
router.post("/forgetPasswordOtp",forgetPasswordOtp)
router.post("/verifyForgetOtp",verifyForgetOtp)
router.patch("/resetPassword",resetPassword)
router.post("/singleOrder",singleOrder)
router.post("/return",returnRequest)
router.get("/getWallet",auth,getWallet)
router.post("/deleteAddress",auth,deleteAddress)
router.post("/findAdd",auth,findAddress)
router.post("/editAddress",auth,EditAddress)
router.get("/recentAddress",getRecentAddress)
router.get("/blockCheck",BlockedCheck)
module.exports=router