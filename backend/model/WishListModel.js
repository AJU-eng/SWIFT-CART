const mongoose = require("mongoose");

const WishListSchema = mongoose.Schema({
  Products: [
    {
      name: {
        type: String,
      },
      Price: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
  },
});

module.exports=mongoose.model('wishList',WishListSchema)