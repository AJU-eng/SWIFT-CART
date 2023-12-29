const ProductModel = require("../model/ProductModel");

const getProducts = async (req, res) => {
  const products = await ProductModel.find({isDelete:false});
  res.status(200).send(products);
};

const findProduct = async (req, res) => {
  console.log("find api called");
  console.log(req.params);
  const { id } = req.params;
  // console.log(id);
  try {
    const product = await ProductModel.findById(id).populate("Category");
    // console.log(product);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  console.log("delete api called");
  const { id } = req.params;
  const data = await ProductModel.findByIdAndUpdate({_id:id}, { isDelete: true },{new:true});
  console.log(data);
  res.status(200).send(data)
};
// const editProduct = async (req, res) => {
//   console.log(req.body);
//   const product=req.body
//   console.log(req.files);
//   console.log(Array.isArray(req.files));
//   let indexToUpdate;
//   console.log(req.files.length);
//  if( req.files.length==0)
//  {

//    const numberOfImages = Object.keys(product).filter((key) =>
//      key.startsWith("image")
//    ).length;
//   console.log(numberOfImages);
//   for (let i = 0; i < numberOfImages; i++) {
//    const imageKey = `image${i}`;
//    if (!(imageKey in product)) {
//      console.log(`Missing image at index ${i}`);
//      indexToUpdate=i
//      break
//    }
//  }
//  }
// console.log(indexToUpdate+"===============i got the index");
//   // const {id,name,stock,description,price}=req.body
//   // const updateObj={name,stock,description,price}
  
//   //   if (indexToUpdate>=0) {
//   //     updateObj[`moreImage.${indexToUpdate}`]=req.files[0].filename
//   //   }
//   //   else{
//   //     updateObj.name=name;
//   //     updateObj.stock=stock,
//   //     updateObj.description=description;
//   //     updateObj.price=price
//   //   }
//   //   const editProduct=await ProductModel.findByIdAndUpdate({_id:id},{$set:updateObj},{new:true})
//   //   console.log(editProduct);  
  
 

// };

const editProduct = async (req, res) => {
  console.log(req.body);
  const {id,name,stock,description,price,offer}=req.body
  let offers=parseInt(offer)
  console.log(offers);
  
  const product=req.body
  console.log(req.files);
  let indexToUpdate=0;
 if(req.files.length>0)
 {

   const numberOfImages = Object.keys(product).filter((key) =>
     key.startsWith("image")
   ).length;
  console.log(numberOfImages);
  for (let i = 0; i <=numberOfImages; i++) {
   const imageKey = `image${i}`;
   if (!(imageKey in product)) {
     console.log(`Missing image at index ${i}`);
     indexToUpdate=i
   }
 }
 console.log(indexToUpdate+"===============i got the index");
   const {id,name,stock,description,price}=req.body
   const updateObj={name,stock,description,price,offers}
   
     if (indexToUpdate>=0) {
       updateObj[`moreImage.${indexToUpdate}`]=req.files[0].filename
     }
     const editProduct=await ProductModel.findByIdAndUpdate({_id:id},{$set:updateObj},{new:true})
     console.log(editProduct);  
   
 }
 else{
  console.log("hello");
  const EditProductsb=await ProductModel.findByIdAndUpdate({_id:id},{$set:{name:name,description:description,price:price,stock:stock,offer:offers}},{new:true})
  console.log(EditProductsb);
 }
 

};

module.exports = {
  getProducts,
  findProduct,
  deleteProduct,
  editProduct,
};
