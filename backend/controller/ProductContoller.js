
const ProductModel = require("../model/ProductModel")


const getProducts=async(req,res)=>{
  const products=await ProductModel.find()
  res.status(200).send(products)
}

const findProduct = async (req, res) => {
  console.log("find api called");
  console.log(req.params);
    const { id } = req.params;
    console.log(id);
    try {
      const product = await ProductModel.findById(id).populate("Category");
      console.log(product);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error("Error finding product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const deleteProduct=async(req,res)=>{
    const {id}=req.params
    const data=await ProductModel.findByIdAndUpdate(id,{iDelete:true})
    console.log(data);
  }
  const editProduct=async(req,res)=>{
    console.log(req.body);
    console.log(req.files);
    // const {id,name,stock,description,price}=req.body
    // const imageArray=req.files
    // let images=[]
    // for (let i = 0; i < imageArray.length; i++) {
    //   images.push(images[i].filename)
    // }
    // const editProduct=await ProductModel.findOneAndUpdate({_id:id},{name:name,stock:stock,description,price:price,images:images})
    // console.log(editProduct);
  }
  

module.exports={
    getProducts,
    findProduct,deleteProduct,
    editProduct
}