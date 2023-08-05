const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const User = require("../models/user");

const loginrequired = async (req, res, next) => {
  const token = req.cookies["access-token"];
  if (token) {
    const validatetoken = await jwt.verify(token);
    if (validatetoken) {
      res.user = validatetoken.id;
      next();
    } else {
      console.log("token expires");
    }
  } else {
    console.log("token not found");
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.isVerified) {
      next();
    } else {
      console.log("Please check your email to verify your account");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { loginrequired, verifyEmail };
