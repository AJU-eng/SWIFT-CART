const validator = require("validator");
const userModel = require("../model/userModel");
const CategoryModal = require("../model/CategoryModal");
const ProductModel = require("../model/ProductModel");
const jwt=require("jsonwebtoken")
const getUser = async (req, res) => {
  const hello = await userModel.find();
  res.send(hello);
};

const userBlock = async (req, res) => {
  // console.log(req.body);
  const { id } = req.body;
  const block = await userModel.findByIdAndUpdate(
    { _id: id },
    { status: "blocked" },
    { new: true }
  );
  if (block) {
    res.send(block);
    console.log(block);
  } else {
    console.log("not updated");
  }
};

const userUnblock = async (req, res) => {
  const { id } = req.body;
  const unblock = await userModel.findByIdAndUpdate(
    { _id: id },
    { status: "unblocked" },
    { new: true }
  );
  if (unblock) {
    console.log(unblock);
    res.send(unblock);
  }
};

const userDelete = async (req, res) => {
 
  const {id}=req.params
  const deletes = await userModel.findByIdAndDelete(id);
  if (deletes) {
    console.log(deletes);
    res.send(deletes);
  }
};



const CategoryAdd = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const image = req.files[0].filename;
  console.log(image);
  const { name } = req.body;
  const Category = new CategoryModal({
    name: name,
    CategoryImage: image,
    status: "unblocked",
  });
  await Category.save();
  if (Category) {
    console.log(Category);
  }
};

const AddProducts = async (req, res) => {
  console.log("hello world");
  const { name, price, category, stock, description } = req.body;
  console.log(req.body);
  console.log(req.files);
  const images = req.files;
  console.log(images);
  let imageArray = [];
  for (let i = 0; i < images.length; i++) {
    imageArray.push(images[i].filename);
  }
  console.log(imageArray);
  const hel = await ProductModel.create({
    name: name,
    price: price,
    Category: category,
    stock: stock,
    description: description,
    moreImage: imageArray,
    isDelete: false,
  });
  console.log(hel);
};

const getCategories = async (req, res) => {
  const catData = await CategoryModal.find();
  res.send(catData);
};

const BlockCategories = async (req, res) => {
  const { id } = req.body;
  const block = await CategoryModal.findByIdAndUpdate(
    { _id: id },
    { status: "Blocked" },
    { new: true }
  );
  res.send(block);
  console.log(block.status);
};
const UnblockCategories = async (req, res) => {
  const { id } = req.body;
  const unblock = await CategoryModal.findByIdAndUpdate(
    { _id: id },
    { status: "Unblocked" },
    { new: true }
  );
  res.send(unblock);
  console.log("ublock api called");
};
const adminLogout=async(req,res)=>{
  res.cookie("admin_token","",{
    expires:new Date(0)
  }).status(200).send("admin logout sucessfully")
}

const adminLoggedIn = async (req, res) => {
  console.log("logged api called");
  const token = req.cookies.admin_token;

  if (!token) {
    return res.json(false);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.send(false);
    }

    res.send(true);
  });
};

module.exports = {
  getUser,
  userBlock,
  userUnblock,
  userDelete,
  CategoryAdd,
  getCategories,
  AddProducts,
  BlockCategories,
  UnblockCategories,
  adminLogout,
  adminLoggedIn
};
