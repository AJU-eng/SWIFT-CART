const express=require('express')
const {getUser,userBlock, userUnblock, userDelete, CategoryAdd, getCategories, AddProducts, getCate, BlockCategories, UnblockCategories, adminLogout, adminLoggedIn, getCategoriesAdd, getTotalCustomer, getPendingTotal, getDeliveredTotal, getShippedTotal, TotalData} = require('../controller/adminController')

const adminRouter=express.Router()
const upload=require("../Middleware/Multer")
const router = require('./userRouter')
const { getProducts, editProduct, deleteProduct } = require('../controller/ProductContoller')
const { EditCategory, FindCategory } = require('../controller/CategoryController')
const { getAdminOrders, updateOrderStatus, salesReport, monthly_sales, yearlySales } = require('../controller/OrderController')

adminRouter.get("/getUser",getUser)
adminRouter.post("/blockUser",userBlock)
adminRouter.post("/userUnblock",userUnblock)
adminRouter.delete("/userDelete/:id",userDelete)
adminRouter.post("/categoryAdd",upload.any(), CategoryAdd)
adminRouter.get("/getCategories",getCategories)
adminRouter.post("/AddProducts",upload.any(),AddProducts)
adminRouter.get("./getProducts",getProducts)
adminRouter.post("/blockCategory",BlockCategories)
adminRouter.post("/unblockcategory",UnblockCategories)
adminRouter.get("/getOrder",getAdminOrders)
adminRouter.get("/getTotalData",TotalData)
adminRouter.post("/editOrderstatus",updateOrderStatus)
adminRouter.post("/editCategory",upload.any(),EditCategory)
adminRouter.post("/findCategory",FindCategory)
adminRouter.patch("/editProduct",upload.any(),editProduct)
adminRouter.delete("/deleteProduct/:id",deleteProduct)
adminRouter.get("/logout",adminLogout)
adminRouter.get("/adminLogged",adminLoggedIn)
adminRouter.get("/getCateProduct",getCategoriesAdd)
adminRouter.get("/sales",salesReport)
adminRouter.get("/montly_sales",monthly_sales)
adminRouter.get("/yearly",yearlySales)
module.exports=adminRouter