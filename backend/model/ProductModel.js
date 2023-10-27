const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:{
        type:String
    },
    Details:{
        type:String
    },
    mainImage:{
        type:String
    },
    moreImageUrl:[
        {
            type:String
        }
    ],
    price:{
        type:String
    }
})

module.exports=mongoose.model("products",productSchema)