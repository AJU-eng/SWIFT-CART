const CartModel = require("../model/CartModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Adding items to cart
const AddtoCart = async (req, res) => {
  console.log(req.body);
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );

  const { ProductName, Price, ProductImage } = req.body;

  const from = await CartModel.findOne({ userId: user_id });
  //   console.log(from);
  if (from) {
    console.log("user found");
    const hel = await CartModel.findOneAndUpdate(
      { userId: user_id },
      {
        $push: {
          Products: {
            productName: ProductName,
            Price: Price,
            productImage: ProductImage,
          },
        },
      },
      { new: true }
    );
    if (hel) {
      console.log(hel);
      res.send(hel);
    }
  } else {
    const data = await CartModel.create({
      Products: [
        {
          productName: ProductName,
          Price: Price,
          productImage: ProductImage,
        },
      ],
      userId: user_id,
    });
    if (data) {
      res.send(data);
      console.log("data saved");
    }
  }
};

// fetching items from cart
const getCartData = async (req, res) => {
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );

  const data = await CartModel.findOne({ userId: user_id });
  if (data) {
    console.log(data.Products);
    res.status(200).send(data.Products);
  }
};

const deleteCart=async(req,res)=>{
  console.log(req.body);
}


//Increment cart quantity
const IncrementProduct=async(req,res)=>{
    console.log(req.body);
    res.send("ok")
}

module.exports = {
  AddtoCart,
  getCartData,
  IncrementProduct,
  deleteCart
};
