const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  Address: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      number: {
        type: String,
      },
      state: {
        type: String,
      },
      district: {
        type: String,
      },
      pincode: {
        type: String,
      },
      street: {
        type: String,
      },
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
  },
  products: [
    {
      type: Object,
    },
  ],
});

module.exports = mongoose.model("orders", OrderSchema);
