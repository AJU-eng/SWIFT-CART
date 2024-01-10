const mongoose=require("mongoose")

const BannerSchema=mongoose.Schema({
    Image:{
        type:String
    }
})

module.exports=mongoose.model("Banner",BannerSchema)