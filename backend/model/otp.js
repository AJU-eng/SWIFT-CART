const mongoose=require('mongoose')

const schema=mongoose.Schema

const otpSchema=schema({
    otp:{
      type:Number,  
    },
    email:{
      type:String
    },
    createdAt: {
        type: Date,
        expires: 60, 
        default: Date.now 
    }
})


module.exports=mongoose.model("OTP",otpSchema)