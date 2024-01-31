const CartModel = require("../model/CartModel");
const jwt = require("jsonwebtoken");
const ProductModel = require("../model/ProductModel");
require("dotenv").config();

// Adding items to cart
const AddtoCart = async (req, res) => {
  // console.log(req.body);
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );

  const { ProductName, Price, ProductImage } = req.body;

  const from = await CartModel.findOne({ userId: user_id });
  //   console.log(from);
  if (from) {
    console.log("user found");
    const exData = await CartModel.findOne({
      "Products.productName": ProductName,
    });
    if (exData) {
      const data = await CartModel.findOneAndUpdate(
        { userId: user_id, "Products.productName": ProductName },
        { $inc: { "Products.$.quantity": 1 } },
        { new: true }
      );
      if (data) {
        res.send(data)
      }
    } else if (from.Products.length === 0) {
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
        // console.log(hel);
        res.send(hel);
      }
    } else {
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
      console.log(data);
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
    // console.log(data.Products);
    res.status(200).send(data.Products);
  }
};

//Increment cart quantity
const IncrementProduct = async (req, res) => {
  const { name } = req.body;
  try {
    const { user_id, iat } = jwt.decode(
      req.cookies.token,
      process.env.SECRET_KEY
    );
    const stock = await ProductModel.findOne({ name: name });
    const product = await CartModel.findOne({
      userId: user_id,
      "Products.productName": name,
    });

    if (stock && product) {
      const quantity = product.Products.find(
        (product) => product.productName === name
      );

      if (Number(stock.stock) > quantity.quantity) {
        const data = await CartModel.findOneAndUpdate(
          { userId: user_id, "Products.productName": name },
          { $inc: { "Products.$.quantity": 1 } },
          { new: true }
        );

        // console.log(data);
        res.send(data.Products);
      } else {
        console.log(product.Products);
        // res.send(product.Products);
        throw new Error("stock limit reached");
      }
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send("stock limit reached");
  }
};

const DecrementProduct = async (req, res) => {
  const { name } = req.body;
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const data = await CartModel.findOneAndUpdate(
    { userId: user_id, "Products.productName": name },
    { $inc: { "Products.$.quantity": -1 } },
    { new: true }
  );
  res.send(data.Products);
};

const deleteCartData = async (req, res) => {
  const { name } = req.body;
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const data = await CartModel.findOneAndUpdate(
    { userId: user_id },
    { $pull: { Products: { productName: name } } },
    { new: true }
  );
  res.send(data.Products);
  console.log(data);
};

module.exports = {
  AddtoCart,
  getCartData,
  IncrementProduct,
  deleteCartData,
  DecrementProduct,
};
