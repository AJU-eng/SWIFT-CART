const CateogryModel=require("../model/CategoryModal")


const FindCategory=async (req,res)=>{
    const {id}=req.body
    const data=await CateogryModel.findById({_id:id})
    res.status(200).send(data)
    console.log("find api called");
}

const EditCategory=async(req,res)=>{
  
     const {id,name}=req.body
     const {image}=req.files[0].filename
     const update=await CateogryModel.findOneAndUpdate({_id:id},{name:name,CategoryImage:image},{new:true})
     console.log(update);
     res.status(200).send(update)
}

module.exports={
    FindCategory,
    EditCategory
}