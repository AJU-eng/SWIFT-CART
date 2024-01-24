const returnModel = require("../model/OrderReturnModel");
const jwt = require("jsonwebtoken");
const WalletModel = require("../model/WalletModel");
const userModel = require("../model/userModel");
const returnRequest = async (req, res) => {
  const {user_id,iat}=jwt.decode(req.cookies.token,process.env.SECRET_KEY)
  const { name, price, reason } = req.body;
  const id = new Date().getTime();
  let obj = {
    productName: name,
    price: price,
    reason: reason,
    status: "requested",
    id: id,
    user:user_id
  };
  
 
    const data = await returnModel.create({ returns: obj});
    
};

const requestApprove = async (req, res) => {
  console.log(req.body);
 
  const { id,price,user} = req.body;
  const data = await returnModel.findOneAndUpdate(
    { "returns.id": id },
    { $set: { "returns.status": "approved" } },
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
    console.log(data,"updated");
  } else {
    const wallets = await WalletModel.create({ userId: user, wallet: obj ,Balance:price});
    console.log(wallets+"created");
  }
  console.log(data+"hei");
  res.send(data)
};

const requestReject = async (req, res) => {
  const { id } = req.body;
  const data = await returnModel.findOneAndUpdate(
    { "returns.id": id },
    { $set: { "returns.status": "rejected" } },
    { new: true }
  );
  console.log(data);
  res.send(data)
};

const getRequest = async (req, res) => {
  const data = await returnModel.find({});
  res.send(data);
};

const singleReturn = async (req, res) => {
  // console.log(req.body);
  // console.log(req.body);
  const { id } = req.body;
  // console.log(_id);
  const returnRequest = await returnModel.findOne(
    
    { 'returns.$elemMatch': { 'id': id } }
  );
  console.log(returnRequest+'data');
  // res.send(data)

};
module.exports = {
  returnRequest,
  requestApprove,
  requestReject,
  getRequest,
  singleReturn,
};
