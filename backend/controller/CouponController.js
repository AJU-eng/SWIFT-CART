const CouponModel = require("../model/CouponModel");

const AddCoupon = async (req, res) => {
  const { couponCode, Date,value } = req.body;
  console.log(couponCode);
  console.log(Date);

  const data = await CouponModel.create({
    code: couponCode,
    expirationDate: Date,
    value:parseInt(value),
    status:"Active"
  });
  res.send(data);
};

const getCoupon = async (req, res) => {
  const data = await CouponModel.find({});
  res.send(data)
};

const couponBlock=async(req,res)=>{
  const {_id}=req.body
  const data=await CouponModel.findByIdAndUpdate({_id:_id},{status:"Blocked"},{new:true}) 
  console.log(data);
  res.status(200).send(data)
}
const couponUnblock=async(req,res)=>{
  const {_id}=req.body
  const data=await CouponModel.findByIdAndUpdate({_id:_id},{status:"Active"},{new:true}) 
  console.log(data);
  res.status(200).send(data)
}
module.exports = {
  AddCoupon,
  getCoupon,
  couponBlock,
  couponUnblock
};
