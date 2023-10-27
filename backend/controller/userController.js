const otp = require("otp-generator");
const nodemailer = require("nodemailer");
const { json } = require("express");
const validator = require("validator");
require("dotenv").config();
const otpModel = require("../model/otp");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
// const { ModuleNode } = require('vite')
const Transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "swiftcart027@gmail.com",
    pass: "ncur cpdc edbw nhrd",
  },
});

const generate = async (req, res) => {
  try {
    const { email } = req.body.userCredentials;
    const useData = await userModel.findOne({ email: email });
    if (useData) {
      throw new Error("email already exist");
    }
    console.log("api called");
    const otps = otp.generate(4, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otps);

    const otpSend = otpModel.create({
      otp: otps,
      email: email,
    });
    if (otpSend) {
      console.log("otp saved");
    }
    const sendMail = await Transport.sendMail({
      from: "swiftcart027@gmail.com",
      to: req.body.userCredentials.email,
      subject: "Hello ✔", // Subject line
      text: `${otps}`, // plain text body
      html: `<b>Hello world? ${otps}</b>`,
    });
    // console.log(otps);
    // console.log(req.body);
    // console.log(req.body.session);
    res.send(req.body.userCredentials);
    console.log(JSON.stringify(sendMail) + "messagesent");
  } catch (err) {
    res.status(400).send("email already exist")
  }
};

const verifyOtp = async (req, res) => {
  console.log(req.body.otp);
  const { OTP, email, name, password } = req.body.otp;
  console.log(OTP, email + "==============");
  console.log(req.body);
  const otp_data = await otpModel.findOne({ email: email });
  console.log(otp_data);
  if (OTP == otp_data.otp) {
    console.log("otp  verified ");
    const data = await userModel.create({
      name: name,
      email: email,
      Password: password,
    });
    if (data) {
      console.log("registered sucessfully");
    }
    const token = jwt.sign({ user_id: data._id }, process.env.SECRET_KEY);
    console.log(token);

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send("otp verified");
  } else {
    res.send("otp invalid");
    console.log("otp invalid");
  }
};

const loggedIn = async (req, res) => {
  console.log("logged api called");
  const token = req.cookies.token;

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
const logout = async (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(0),
    })
    .send(false);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const data = userModel.findOne({
    email: email,
  });
  if (data) {
    res.send("logined")
  }
  else{
    res.send("not logined")
  }
};

module.exports = { generate, verifyOtp, loggedIn, logout,login };
