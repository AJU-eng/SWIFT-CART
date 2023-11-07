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
    console.log(req.body.userCredentials);
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
      subject: "Welcome to SwiftCart", // Subject line
      text: `${otps}`, // plain text body
      html: `<b>Your otp for email verification is here ${otps}</b>`,
    });
    // console.log(otps);
    // console.log(req.body);
    // console.log(req.body.session);
    res.send(req.body.userCredentials);
    console.log(JSON.stringify(sendMail) + "messagesent");
  } catch (err) {
    res.status(400).send("email already exist");
  }
};

const verifyOtp = async (req, res) => {
  console.log(req.body.otp);
  const { OTP, email, name, lname, password } = req.body.otp;
  console.log(OTP, email + "==============");
  console.log(req.body);
  const otp_data = await otpModel.findOne({ email: email });
  console.log(otp_data);
  try {
    if (!otp_data) {
      throw new Error("invalid otp");
    } else if (OTP == otp_data.otp) {
      console.log("otp  verified ");
      const data = await userModel.create({
        fname: name,
        lname,
        email: email,
        Password: password,
        status: "unblocked",
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
        .status(200)
        .send("otp verified");
    } else {
      throw new Error("otp invalid");
    }
  } catch (err) {
    res.status(400).send(err.message);
    console.log(err.message);
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
  console.log(password);
  console.log(req.body);

  if (email === "admin@gmail.com" && password === "admin123") {
    console.log("test1 passed");

    const adminToken = jwt.sign({ role: "admin" }, process.env.SECRET_KEY);
    res
      .cookie("admin_token", adminToken, {
        httpOnly: true,
      })
      .send("admin logined");
    console.log("Admin logined");
    return;
  }
  try {
    const data = await userModel.findOne({
      email: email,
    });
    if (data) {
      if (data.status === "blocked") {
        throw new Error("User is Blocked");
      } else if (data.Password === password) {
        const userToken = jwt.sign(
          { user_id: data._id },
          process.env.SECRET_KEY
        );
        res
          .cookie("token", userToken, {
            httpOnly: true,
          })
          .send("logined");
        console.log("User logined");
      } else {
        throw new Error("Incorrect Password");
      }
    } else {
      // res.send("not logined");
      // console.log("User not logined");
      throw new Error("Email is not Registered");
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
};

module.exports = { generate, verifyOtp, loggedIn, logout, login };
