const BannerModel = require("../model/BannerModel");
const BannerAdd = async(req, res) => {
  const Image = req.files[0].filename;
  console.log(Image);
  const data =await BannerModel.create({ Image: Image });
  const datas=await BannerModel.find({})
  console.log(datas);
  res.send(datas)
};

const getBanner=async(req,res)=>{
    const data = await BannerModel.find({})
    console.log(data);
    res.send(data)
}

const deleteBanner=async(req,res)=>{
    const {_id}=req.body
    const data =await BannerModel.findByIdAndDelete({_id:_id},{new:true})
    console.log(data);
}

module.exports = {
  BannerAdd,
  getBanner,
  deleteBanner
};
