const validator = require("validator");
const userModel = require("../model/userModel");
const CategoryModal = require("../model/CategoryModal");
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
  const { id } = req.body;
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
  const { name, stock } = req.body;
  const Category = new CategoryModal({
    name: name,
    Stock: stock,
    CategoryImage: image,
  });
  await Category.save();
  if (Category) {
    console.log(Category);
  }
};

const AddProducts = async (req, res) => {
  const images = req.files;

  const attributes = JSON.parse(formData.attributes);
  formData.attributes = attributes;
  if (files && files.length > 0) {
    formData.moreImageURL = [];
    formData.imageURL = "";
    files.map((file) => {
      if (file.fieldname === "imageURL") {
        formData.imageURL = file.filename;
      } else {
        formData.moreImageURL.push(file.filename);
      }
    });
  }

  console.log(formData);
};
const getCategories = async (req, res) => {
  const catData = await CategoryModal.find();
  res.send(catData);
};

module.exports = {
  getUser,
  userBlock,
  userUnblock,
  userDelete,
  CategoryAdd,
  getCategories,
  AddProducts
};
