
const ProductModel = require("../model/ProductModel")


const getProducts=async(req,res)=>{
  const products=await ProductModel.find()
  res.status(200).send(products)
}

const findProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const product = await ProductModel.findById(id);
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
  

module.exports={
    getProducts,
    findProduct,deleteProduct
}