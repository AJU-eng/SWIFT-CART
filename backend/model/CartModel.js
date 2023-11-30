const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  Products: [
    {
      Price: {
        type: String,
      },
      productName: {
        type: String,
      },
      productImage: {
        type: String,
      },
      
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
