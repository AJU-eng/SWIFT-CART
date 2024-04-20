// const otp = require("otp-generator");
const otp=require("otp-generator")
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
    user: process.env.EMAIL,
    pass:process.env.PASS,
  },
});

const generate = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body.userCredentials;
    // const { name, email, password } = req.body;
   
    if (validator.isEmpty(name.trim())) {
      throw new Error("All feilds are requried");
    } else if (validator.isEmpty(email.trim())) {
      throw new Error("All feilds are requried");
    } else if (validator.isEmpty(password.trim())) {
      throw new Error("All feilds are requried");
    } else if (!validator.isEmail(email.trim())) {
      throw new Error("Invalid Email");
    } else if (!validator.isStrongPassword(password)) {
      console.log("hello");
      throw new Error("Weak Password😞");
    }
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
      from: process.env.EMAIL,
      to:email,
      subject: "Welcome to SwiftCart", // Subject line
      text: `${otps}`, // plain text body
      html: `<b>Your otp for email verification is here ${otps}</b>`,
    });
    // console.log(otps);
    // console.log(req.body);
    // console.log(req.body.session);
    res.send(req.body.userCredentials);
    // console.log(req.body);
    // res.send(req.body)
    console.log(sendMail);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
};
const resentOtp = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
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
    to: req.body.email,
    subject: "Welcome to SwiftCart", // Subject line
    text: `${otps}`, // plain text body
    html: `<b>Your otp for email verification is here ${otps}</b>`,
  });
  console.log(sendMail);
};
const forgetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (validator.isEmpty(email)) {
      throw new Error("email required");
    } else {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        throw new Error("Email not found");
      } else {
        const otps = otp.generate(4, {
          digits: true,
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        const otpSend = otpModel.create({
          otp: otps,
          email: email,
        });
        if (otpSend) {
          console.log("saved");
        }

        const sendMail = await Transport.sendMail({
          from: "swiftcart027@gmail.com",
          to: email,
          subject: "Welcome to SwiftCart", // Subject line
          text: `${otps}`, // plain text body
          html: `<b>Your otp for email verification is here ${otps}</b>`,
        });
        console.log(sendMail);
        res.status(200).send(email);
      }
    }
  } catch (err) {
    console.log(err);
    console.log(err.message);
    res.status(400).send(err.message);
  }
};

const verifyForgetOtp = async (req, res) => {
  console.log(req.body);
  const { OTP, email } = req.body;
  console.log(OTP, email + "==============");
  console.log(req.body);
  const otp_data = await otpModel.findOne({ email: email });
  console.log(otp_data.otp+"otp form database");
  try {
    if (!otp_data) {
      throw new Error("invalid otp");
    } else if (OTP == otp_data.otp) {
      console.log("otp  verified ");
      res.status(200).send("otp verified");
    } else {
      throw new Error("otp invalid");
    }
  } catch (err) {
    res.status(400).send(err.message);
    console.log(err.message);
  }
};

const resetPassword = async (req, res) => {
  console.log("reset api called");

  const { password, email } = req.body;

  const updatePass = await userModel.findOneAndUpdate(
    { email: email },
    { Password: password },
    { new: true }
  );
  console.log(updatePass);
  res.status(200).send("sucess");
};

const verifyOtp = async (req, res) => {
  console.log("hello world");
  console.log(req.body);
  const { OTP, email, name, password } = req.body.otp;
  console.log(OTP, email + "==============");
  console.log(req.body);
  const otp_data = await otpModel.findOne({ email: email });
  console.log(otp_data+"jfhdjf");
  try {
    if (!otp_data) {
      throw new Error("invalid otp");
    } else if (OTP == otp_data.otp) {
      console.log("otp  verified ");
      const data = await userModel.create({
        name: name,
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

const BlockedCheck=async(req,res)=>{
  console.log("hello world");
  // const {user_id,iat}=jwt.decode(req.cookies.token,process.env.SECRET_KEY)
  try {
    const { user_id, iat } =  jwt.decode(
      req.cookies.token,
      process.env.SECRET_KEY
    );
  
    const data =await userModel.findOne({_id:user_id})
    
    if (data.status==="blocked") {
      res.status(200).json({"success":true})
    }
    else{
      res.status(200).json({"success":false})
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({"err":error.message})
  }
 
}

const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    console.log(password);
    console.log(req.body);
    if (validator.isEmpty(email.trim())) {
      throw new Error("All feilds are required");
    } else if (validator.isEmpty(password.trim())) {
      throw new Error("All feilds are required");
    }

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

    const data = await userModel.findOne({
      email: email,
    });
    if (!validator.isEmail(email.trim())) {
      throw new Error("invalid Email");
    } else if (data) {
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

const fetchUser = async (req, res) => {
  try {
    const { user_id, iat } = jwt.decode(
      req.cookies.token,
      process.env.SECRET_KEY
    );

    const data =await userModel.findById({ _id: user_id });
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error.message);
  }
};

const editUser=async(req,res)=>{
  console.log(req.body);
  const {name,date}=req.body
  const {user_id,iat}=jwt.decode(req.cookies.token,process.env.SECRET_KEY)
  const data=await userModel.findByIdAndUpdate({_id:user_id},{name:name,date:date},{new:true})
  console.log(data);
  res.send(data)
}

module.exports = {
  generate,
  verifyOtp,
  loggedIn,
  logout,
  login,
  forgetPasswordOtp,
  verifyForgetOtp,
  resetPassword,
  resentOtp,
  fetchUser,
  editUser,
  BlockedCheck
};
