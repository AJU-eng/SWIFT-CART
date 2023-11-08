const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const productSchema = mongoose.Schema({
  name: {
    type: String,
  },

  moreImage: [
    {
      type: String,
    },
  ],
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Category"
  },
  description: {        
    
    type: String,
  },
  price: {
    type: String,
  },
  stock: {
    type: String,
  },
  isDelete:{
    type:Boolean
  }
},{timestamps:true});

module.exports = mongoose.model("products", productSchema);
