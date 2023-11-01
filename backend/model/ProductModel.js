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
    type: ObjectId,
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
});

module.exports = mongoose.model("products", productSchema);
