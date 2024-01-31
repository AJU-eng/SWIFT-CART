const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("not logined");
    const { user_id, iat } = jwt.decode(
      req.cookies.token,
      process.env.SECRET_KEY
    );
    const data = await userModel.findOne({ _id: user_id });
    if (data.status === "blocked") {
      console.log("blocked not login");
      // res
      //   .cookie("token", "", {
      //     expires: new Date(0),
      //   })
      //   .send(false);
      throw new Error("not logined");
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    next();
    console.log(verified);
  } catch (error) {
    console.log(error.message);
    res.status(401).send(error.message);
  }
};

module.exports = auth;
