const WalletModel = require("../model/WalletModel");
const jwt = require("jsonwebtoken");
const getWallet = async (req, res) => {
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const dataWallet = await WalletModel.findOne({ userId: user_id });
  res.send(dataWallet);
};

module.exports = getWallet;
