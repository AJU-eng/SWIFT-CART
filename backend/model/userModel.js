const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    Password: {
      type: String,
    },
    status: {
      type: String,
    },
    date:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
