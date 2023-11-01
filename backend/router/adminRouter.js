const express=require('express')
const {getUser,userBlock, userUnblock, userDelete, CategoryAdd, getCategories, AddProducts, getCate} = require('../controller/adminController')

const adminRouter=express.Router()
const upload=require("../Middleware/Multer")
const router = require('./userRouter')
const { getProducts } = require('../controller/ProductContoller')

adminRouter.get("/getUser",getUser)
adminRouter.post("/blockUser",userBlock)
adminRouter.post("/userUnblock",userUnblock)
adminRouter.post("/userDelete",userDelete)
adminRouter.post("/categoryAdd",upload.any(), CategoryAdd)
adminRouter.get("/getCategories",getCategories)
adminRouter.post("/AddProducts",upload.any(),AddProducts)


module.exports=adminRouter