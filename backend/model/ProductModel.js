const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  Details: {
    type: String,
  },
  mainImage: {
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
  iDelete:{
    type:Boolean
  }
},{timestamps:true});

module.exports = mongoose.model("products", productSchema);
