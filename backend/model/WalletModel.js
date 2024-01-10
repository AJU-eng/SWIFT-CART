const mongoose = require("mongoose");

const walletSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  wallet: [
    {
      type: Object,
    },
  ],

  Balance:{
    type:Number
  }
});

module.exports=mongoose.model("wallet",walletSchema)
