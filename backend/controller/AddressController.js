const AddressModel = require("../model/AddressModel");
const jwt = require("jsonwebtoken");
const OrderModel = require("../model/OrderModel");
require("dotenv").config();

const addAddress = async (req, res) => {
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const { name, email, number, state, district, pincode, street } = req.body;
  const address = await AddressModel.findOne({ userId: user_id });
  if (address ) {
    const data = await AddressModel.findOneAndUpdate(
      { userId: user_id },
      { $push: { Address: req.body } },
      { new: true }
    );
    console.log(data);
    res.send(data);
  } else {
    const data = await AddressModel.create({
      Address: {
        name: name,
        email: email,
        number: number,
        state: state,
        district: district,
        pincode: pincode,
        street: street,
      },
      userId: user_id,
    });
    console.log(data._id);
    res.send(data);
  }
};

const getAddresses = async (req, res) => {
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const data = await AddressModel.findOne({ userId: user_id });
  res.status(200).send(data);
};
const deleteAddress = async (req, res) => {
  console.log("delete api called");
  const { email } = req.body;
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const data = await AddressModel.findOneAndUpdate(
    { userId: user_id },
    { $pull: { Address: { email: email } } },
    { new: true }
  );
  res.send(data);
  console.log(data);
};

const findAddress = async (req, res) => {
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const { email } = req.body;
  console.log(email);
  const data = await AddressModel.findOne({ userId: user_id });
  // res.send(data)
  // console.log(data);
  // data.Address.forEach((element) => {
  //   // console.log(element);
  //   if (element.email===email) {
  //     console.log(element+"=======");
  //   }
  // });
  const filteredData = data.Address.filter((item) => item.email === email);
  res.send(filteredData);
};

const EditAddress = async (req, res) => {
  const { name, email, number, district, state, pincode, street,id } = req.body;
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );

  const data = await AddressModel.findOneAndUpdate({
    "Address._id":id
  });
  console.log(data);
  res.send(data)
};

const getRecentAddress=async(req,res)=>{
  console.log("recent");
  const {user_id,iat}=jwt.decode(req.cookies.token,process.env.SECRET_KEY)
  
  const data=await OrderModel.findOne({userId:user_id})
  const recentOrders=data.orders[data.orders.length-1]
  // console.log(recentOrders.Address);
  res.send(recentOrders.Address)
}


module.exports = {
  addAddress,
  getAddresses,
  deleteAddress,
  findAddress,
  EditAddress,
  getRecentAddress
};
