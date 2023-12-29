const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
    },
    orders: [
      {
        type: Object,
      },
    ],
  },
  
);

module.exports = mongoose.model("orders", OrderSchema);
