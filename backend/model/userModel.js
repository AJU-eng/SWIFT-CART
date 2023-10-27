const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
      name:{
        type:String,
      },
      email:{
        type:String
      },
      Password:{
        type:String
      },
      status:{
        type:String
      }
})

module.exports=mongoose.model("user",userSchema)