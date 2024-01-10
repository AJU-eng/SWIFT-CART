const mongoose=require("mongoose")

const CouponSchema=mongoose.Schema({
    code:{
        type:String,
        unique:true
    },
    expirationDate:{
        type:Date
    },
    value:{
     type:Number
    },
    status:{
        type:String
    }
},{timestamps:true})

CouponSchema.index({expirationDate:1},{expireAfterSeconds:0});

module.exports=mongoose.model("Coupon",CouponSchema)

