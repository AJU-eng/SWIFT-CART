const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    unique:true,
  },
 
  status: {
    type: String,
  },
  CategoryImage:{
    type:String
  },


},{timestamps:true});

module.exports=mongoose.model("Category",CategorySchema)