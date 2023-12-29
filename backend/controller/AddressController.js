const AddressModel = require("../model/AddressModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const addAddress = async (req, res) => {
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const { name, email, number, state, district, pincode, street } = req.body;
  const address = await AddressModel.findOne({ userId: user_id });
  if (address) {
    const data = await AddressModel.findOneAndUpdate(
      { userId: user_id },
      { $push: { Address: req.body } }
    );
    console.log(data);
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
  }
};

const getAddresses=async(req,res)=>{
    const {user_id,iat}=jwt.decode(req.cookies.token,process.env.SECRET_KEY)
    const data=await AddressModel.findOne({userId:user_id})
    res.status(200).send(data)
}

module.exports = {
  addAddress,
  getAddresses
};
