const express = require("express");
const app=express()
require('dotenv').config()
const monngoose=require('mongoose')
const cookie=require('cookie-parser')
const cors=require('cors')
const session=require('express-session');
// const { default: App } = require("../frontend/src/App");
const router = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookie())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({
    secret:'ajau',
    resave:false,
    saveUninitialized:true
}))
app.use('/user',router)
app.use('/admin',adminRouter)

monngoose.connect(process.env.MONGO_URI).then(()=>app.listen(3000,()=>console.log("server started")))


