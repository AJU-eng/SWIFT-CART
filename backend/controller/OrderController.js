const jwt = require("jsonwebtoken");
const OrderModel = require("../model/OrderModel");
const CartModel = require("../model/CartModel");
const ProductModel = require("../model/ProductModel");
const razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const makeOrder = async (req, res) => {
  //   console.log(req.body);
  res.send(req.body);
};

const onlinePayment = async (req, res) => {
  console.log(req.body);
  try {
    const { amount } = req.body;
    const instance = new razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
    const options = {
      amount: amount*100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    instance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({ order });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const paymentVerify = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");
    if (razorpay_signature === expectedSign) {
      res.status(200).send("payment Verified");
    }
  } catch (error) {
    console.log(error);
  }
};

const PlaceOrder = async (req, res) => {
  console.log(req.body);
  console.log(req.body.products.totalPrice);
  let { Address, products, paymentMode } = req.body;
  products.paymentMode = paymentMode;
  console.log(products);
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
      products: products,
    });
    const cartDelete = await CartModel.findOneAndDelete(
      { userId: user_id },
      { new: true }
    );
    console.log(data);
    res.send(cartDelete.Products);
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
  const status = await OrderModel.findOneAndUpdate(
    { "products.totalPrice": price },
    { $set: { "products.$.status": "cancelled" } },
    { new: true }
  );
  console.log(status);
  res.send(status.products);
  // const status=await OrderModel.findOne({"products.totalPrice":price})
};

const orderHistory = async (req, res) => {
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  console.log(user_id);
  const data = await OrderModel.findOne({
    userId: user_id,
    "products.$.status": "cancelled",
  });

  console.log(data);
  res.send(data);
};

module.exports = {
  makeOrder,
  PlaceOrder,
  getOrder,
  getAdminOrders,
  updateOrderStatus,
  cancelOrder,
  orderHistory,
  onlinePayment,
  paymentVerify,
};
