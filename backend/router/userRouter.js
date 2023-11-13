const express=require('express')
const { generate, verifyOtp,loggedIn,logout, login, forgetPasswordOtp, verifyForgetOtp, resetPassword, resentOtp } = require('../controller/userController')
const { getProducts, findProduct } = require('../controller/ProductContoller')

const router=express.Router()

router.post('/generateOtp',generate)
router.post("/resendOtp",resentOtp)
router.post('/verifyOtp',verifyOtp)
router.get('/checkLogStatus',loggedIn)
router.get('/logout',logout)
router.post('/login',login)
router.get("/getProducts",getProducts)
router.post("/findProduct/:id",findProduct)
router.post("/forgetPasswordOtp",forgetPasswordOtp)
router.post("/verifyForgetOtp",verifyForgetOtp)
router.patch("/resetPassword",resetPassword)
module.exports=router