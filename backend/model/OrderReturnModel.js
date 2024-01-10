const mongoose = require("mongoose");
const ReturnSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

 returns: [{ type: Object }],
});


module.exports=mongoose.model("Returns",ReturnSchema)