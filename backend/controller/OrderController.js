const jwt = require("jsonwebtoken");
const OrderModel = require("../model/OrderModel");
const CartModel = require("../model/CartModel");
const ProductModel = require("../model/ProductModel");
require("dotenv").config();
const makeOrder = async (req, res) => {
  //   console.log(req.body);
  res.send(req.body);
};

const PlaceOrder = async (req, res) => {
    console.log(req.body);
  console.log(req.body.products);
  const { Address, products,paymentMode } = req.body;
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const specific = await ProductModel.findOne({ name: products.productName });
  console.log(specific);
  products.products.map(async (product) => {
    console.log(-product.quantity);

    const stockManage = await ProductModel.findOneAndUpdate(
      { name: product.productName },
      { $inc: { stock: -product.quantity } },
      { new: true }
    );
    console.log(stockManage);
  });

  const userData = await OrderModel.findOne({ userId: user_id });
  if (userData) {
    const updateData = await OrderModel.findOneAndUpdate(
      { userId: user_id },
      { $push: { products: products } },
      { new: true }
    );

    const deleteFromCart = await CartModel.findOneAndDelete(
      { userId: user_id },
      { new: true }
    );
    res.send(deleteFromCart.Products);
  } else {
    const data = await OrderModel.create({
      Address: Address,
      userId: user_id,
      products: [{...products,paymentMode}],
    });
    console.log(data);
  }
};

const getOrder = async (req, res) => {
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );

  const Orders = await OrderModel.findOne({ userId: user_id });
  if (Orders) {
    res.send(Orders.products);
  }
};

const getAdminOrders = async (req, res) => {
  const Orders = await OrderModel.find();
  res.send(Orders);
};

const updateOrderStatus = async (req, res) => {
  console.log(req.body);
  const { price, status } = req.body;
  const data = await OrderModel.findOneAndUpdate(
    { "products.totalPrice": price },
    { $set: { "products.$.status": status } },
    { new: true, multi: true }
  );
  console.log(data);
};

const cancelOrder = async (req, res) => {
  const { price } = req.body;
  const status = await OrderModel.findOneAndUpdate({"products.totalPrice":price},{$set:{"products.$.status":"cancelled"}},{new:true})
  console.log(status);
  res.send(status.products)
  // const status=await OrderModel.findOne({"products.totalPrice":price})
};

module.exports = {
  makeOrder,
  PlaceOrder,
  getOrder,
  getAdminOrders,
  updateOrderStatus,
  cancelOrder
};
