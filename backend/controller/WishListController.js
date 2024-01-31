const WishModel = require("../model/WishListModel");
const CartModel = require("../model/CartModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const AddToList = async (req, res) => {
  const { name, price, image } = req.body;
  try {
    const { user_id, iat } = jwt.decode(
      req.cookies.token,
      process.env.SECRET_KEY
    );
    const data = await WishModel.findOne({ userId: user_id });
    if (data ) {

      const items = await WishModel.findOne({ "Products.name": name });
      if (items) {
        throw new Error("item Already exists");
      } else {
        const info = await WishModel.findOneAndUpdate(
          { userId: user_id },
          {
            $push: {
              Products: {
                name: name,
                Price: price,
                image: image,
              },
            },
          },
          { new: true }
        );
        res.send(info);
      }
    } else {
      const info = await WishModel.create({
        Products: [
          {
            name: name,
            Price: price,
            image: image,
          },
        ],
        userId: user_id,
      });

      res.send(info);
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).send(error.message);
  }
};

const getWishList = async (req, res) => {
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  console.log(user_id);
  const data = await WishModel.findOne({ userId: user_id });
  if (data) {
    
    res.status(200).send(data.Products);
  }
  console.log(data);
};
const deleteWishlist = async (req, res) => {
  console.log(req.body);
  const { name, price, image } = req.body;
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const data = await WishModel.findOneAndUpdate(
    { userId: user_id },
    { $pull: { Products: { name: name } } },
    { new: true }
  );
  const cartData = await CartModel.findOne({ userId: user_id });
  if (cartData) {
    const inso = await CartModel.findOne({
      userId: user_id,
      "Products.productName": name,
    });
    if (inso) {
      const update = await CartModel.findOneAndUpdate(
        { userId: user_id, "Products.productName": name },
        { $inc: { "Products.$.quantity": 1 } }
      );
    } else {
      const info = await CartModel.findOneAndUpdate(
        { userId: user_id },
        {
          $push: {
            Products: { productName: name, Price: price, productImage: image },
          },
        }
      );
      if (info) {
        console.log("cart added");
      }
    }
  } else {
    const insert = await CartModel.create({
      userId: user_id,
      Products: [
        {
          productName: name,
          Price: price,
          productImage: image,
        },
      ],
    });
  }
  console.log(data);
  res.send(data.Products);
};
module.exports = {
  AddToList,
  getWishList,
  deleteWishlist,
};
