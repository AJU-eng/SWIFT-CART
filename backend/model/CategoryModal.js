const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
  },
  Stock: {
    type: Number,
  },
  CategoryImage:{
    type:String
  },

},{timestampsP:true});

module.exports=mongoose.model("Category",CategorySchema)