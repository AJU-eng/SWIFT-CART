const CouponModel = require("../model/CouponModel");

const AddCoupon = async (req, res) => {
  const { couponCode, Date,value,minPurchaseAmount,maxPurchaseAmount } = req.body;
  console.log(couponCode);
  console.log(Date);

  const data = await CouponModel.create({
    code: couponCode,
    minPurchaseAmount:minPurchaseAmount,
    maxPurchaseAmount:maxPurchaseAmount,
    expirationDate: Date,
    value:parseInt(value),
    status:"Active"
  });
  const dats=await CouponModel.find({})
  console.log(dats);
  res.send(dats);
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
