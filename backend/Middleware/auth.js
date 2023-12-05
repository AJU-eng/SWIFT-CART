const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("not logined");
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    next();
    console.log(verified);
  } catch (error) {
    console.log(error.message);
    res.status(401).send(error.message)
  }
};

module.exports = auth;
