const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  Products: [
    {
      Price: {
        type: Number,
      },
      productName: {
        type: String,
      },
      productImage: {
        type: String,
      },
      quantity:{
        type:Number,
        default:1
      }
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
