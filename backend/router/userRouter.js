const express=require('express')
const { generate, verifyOtp,loggedIn,logout, login } = require('../controller/userController')

const router=express.Router()

router.post('/generateOtp',generate)
router.post('/verifyOtp',verifyOtp)
router.get('/checkLogStatus',loggedIn)
router.get('/logout',logout)
router.get('/login',login)

module.exports=router