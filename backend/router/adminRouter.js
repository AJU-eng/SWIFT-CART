const express=require('express')
const {getUser,userBlock, userUnblock, userDelete, CategoryAdd, getCategories, AddProducts, getCate, BlockCategories, UnblockCategories} = require('../controller/adminController')

const adminRouter=express.Router()
const upload=require("../Middleware/Multer")
const router = require('./userRouter')
const { getProducts, editProduct, deleteProduct } = require('../controller/ProductContoller')
const { EditCategory, FindCategory } = require('../controller/CategoryController')

adminRouter.get("/getUser",getUser)
adminRouter.post("/blockUser",userBlock)
adminRouter.post("/userUnblock",userUnblock)
adminRouter.delete("/userDelete",userDelete)
adminRouter.post("/categoryAdd",upload.any(), CategoryAdd)
adminRouter.get("/getCategories",getCategories)
adminRouter.post("/AddProducts",upload.any(),AddProducts)
adminRouter.get("./getProducts",getProducts)
adminRouter.post("/blockCategory",BlockCategories)
adminRouter.post("/unblockcategory",UnblockCategories)
adminRouter.post("/editCategory",upload.any(),EditCategory)
adminRouter.post("/findCategory",FindCategory)
adminRouter.patch("/editProduct",upload.any(),editProduct)
adminRouter.delete("/deleteProduct/:id",deleteProduct)

module.exports=adminRouter