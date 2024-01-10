const returnModel = require("../model/OrderReturnModel");
const jwt = require("jsonwebtoken");
const WalletModel = require("../model/WalletModel");
const userModel = require("../model/userModel");
const returnRequest = async (req, res) => {
  const { name, price, reason } = req.body;
  const id = new Date().getTime();
  let obj = {
    productName: name,
    price: price,
    reason: reason,
    status: "requested",
    id: id,
  };
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const datas = await returnModel.findOne({ userId: user_id });
  if (datas) {
    const data = await returnModel.findOneAndUpdate(
      { userId: user_id },
      { $push: { returns: obj } },
      { new: true }
    );
    console.log(data);
  } else {
    const data = await returnModel.create({ userId: user_id, returns: obj});
    console.log(data);
  }
};

const requestApprove = async (req, res) => {
  console.log(req.body.price);
  const { id, price, user } = req.body;
  const data = await returnModel.findOneAndUpdate(
    { "returns.id": id },
    { $set: { "returns.$.status": "approved" } },
    { new: true }
  );
  const date = new Date();
  const _id=new Date().getTime()
  let obj = {
    amount: price,
    type: "credit",
    Description: "Order Return Refund",
    Date: date,
    id:_id
  };
  // console.log(data);
  const dataAvailable = await WalletModel.findOne({ userId: user });
  if (dataAvailable) {
    const data = await WalletModel.findOneAndUpdate(
      { userId: user },
      { $push: { wallet: obj },$inc:{Balance:price} },
      
      {new:true}
    );
    console.log(data);
  } else {
    const wallets = await WalletModel.create({ userId: user, wallet: obj ,Balance:price});
    console.log(wallets);
  }
};

const requestReject = async (req, res) => {
  const { id } = req.body;
  const data = await returnModel.findOneAndUpdate(
    { "returns.id": id },
    { $set: { "returns.$.status": "rejected" } },
    { new: true }
  );
  console.log(data);
};

const getRequest = async (req, res) => {
  const data = await returnModel.find({});
  res.send(data);
};

const singleReturn = async (req, res) => {
  const { id } = req.body;
  const data = await returnModel.aggregate([
    { $unwind: "$returns" },
    { $match: { "returns.id": id } },
  ]);
  console.log(data);
};
module.exports = {
  returnRequest,
  requestApprove,
  requestReject,
  getRequest,
  singleReturn,
};
