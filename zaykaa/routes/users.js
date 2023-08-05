const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Item = require("../models/item");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { verifyEmail } = require("../utils/JWT");
const authenticate = require("../middleware/authenticate.js");
const jwt = require("jsonwebtoken");

let {
  encryptPassword,
  comparePasswords,
  generateJwt,
} = require("../utils/auth");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/adduser", async (req, res) => {
  try {
    let user = await new User(req.body).save();
    res.json({ message: "User Added Successfully", data: user, success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.get("/getuser", async (req, res) => {
  try {
    const getuser = await User.find().exec();
    res.json({ message: "User Details", data: getuser, success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.post("/updateuser", async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
    }).exec();
    res.json({
      message: "User Successfully Updated",
      data: user,
      success: true,
    });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.post("/deleteuser", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.body.id).exec();
    res.json({ message: "Successfully Deleted", success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

//Email AUTH

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.zaykaa@gmail.com",
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// User Register API starts here

router.post("/register", async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    const user = new User({
      name,
      email,
      number,
      password,
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
    });

    const userEmailCheck = await User.findOne({
      email: new RegExp(`^${req.body.email}$`, "i"),
    }).exec();

    const minnumber = number.length;
    if (minnumber != 10)
      return res.status(400).send({ message: "Number must be 10 digits" });

    const userNumberCheck = await User.findOne({
      number: new RegExp(`^${req.body.number}$`, "i"),
    }).exec();

    const minpassword = password.length;
    if (minpassword < 8)
      return res.status(400).send({ message: "Password must be 8 digits" });

    if (!name || !email || !number || !password)
      return res.status(400).send({ message: "All Fields are Required" });

    if (userEmailCheck)
      return res.status(401).send({ message: "Email Already Registered" });

    if (userNumberCheck)
      return res
        .status(402)
        .send({ message: "Mobile Number Already Registered" });

    req.body.password = await encryptPassword(req.body.password);

    let newUser = await new User(req.body).save();

    //send verification mail to user
    var mailOptions = {
      from: ' "Verify your email" <anmol.garg594@gmail.com> ',
      to: user.email,
      subject: "Zaykaa -verify your email",
      html: `<h2> ${user.name}! Thanks for registering on our site </h2>
            <h4> Please verify your mail to continue.... </h4>
            <a href = "http://${req.headers.host}/users/verify-email?token-${user.emailToken}"> Verify Your Email </a>`,
    };

    //sending email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Verification email is sent to your gmail acccount");
      }
    });

    res.status(200).json({
      message: "User Register Successfully",
      data: user,
      success: true,
    });
  } catch (err) {
    console.error(err);
    if (err.message)
      res.json({ message: err.message, data: err, success: false });
    else res.json({ message: "Error", data: err, success: false });
  }
});

//   User Register API Close

//Email Verification

router.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailToken: token });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      console.log("Account Verified");
    } else {
      console.log("Email is not verified");
    }
  } catch (err) {
    console.log(err);
  }
});

// User Login API Starts Here

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: new RegExp(`^${req.body.email}$`, "i"),
    }).exec();

    if (!email || !password)
      return res.status(400).send({ message: "All Fields are Required" });

    if (!user) return res.status(401).json({ message: "Email not registered" });

    const minpassword = password.length;
    if (minpassword < 8)
      return res.status(400).send({ message: "Password must be 8 digits" });

    if (user) {
      const checkPassword = await comparePasswords(
        req.body.password,
        user.password
      );

      if (!checkPassword)
        return res.status(402).send({ message: "Invalid Password" });

      const token = await user.generatAuthtoken();

      res.cookie("Zaykaa", token, {
        expires: new Date(Date.now() + 2589000),
        httpOnly: true,
      });
      res.status(200).send({ data: token, message: "Logged in successfully" });
      console.log(token);
    }
  } catch (err) {
    console.error(err);
    if (err.message) {
      res.status(500).send({ message: "Internal Server Error" });
    } else res.json({ message: "Error", data: err, success: false });
  }
});
// User Login Api Ends

// send email Link For reset Password
router.post("/sendpasswordlink", async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const userfind = await User.findOne({ email: email });

    if (!userfind)
      return res.status(401).json({ message: "Email not registered" });

    // token generate for reset password
    const token = jwt.sign({ _id: userfind._id }, process.env.SECRET_KEY, {
      expiresIn: "120s",
    });

    const setusertoken = await User.findByIdAndUpdate(
      { _id: userfind._id },
      { verifytoken: token },
      { new: true }
    );

    if (setusertoken) {
      const mailOptions = {
        from: "noreply.zaykaa@gmail.com",
        to: email,
        subject: "Sending Email For password Reset",
        text: `This Link Valid For 2 MINUTES http://localhost:3000/forgot-password/${userfind._id}/${setusertoken.verifytoken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent Successfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
});

// verify user for forgot password time
router.get("/forgot-password/:_id/:token", async (req, res) => {
  const { _id, token } = req.params;
  try {
    const validuser = await User.findOne({ _id: _id, verifytoken: token });
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken);
    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// change password
router.post("/:_id/:token", async (req, res) => {
  const { _id, token } = req.params;
  const { password } = req.body;

  try {
    const validuser = await User.findOne({ _id: _id, verifytoken: token });
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (validuser && verifyToken._id) {
      const minpassword = password.length;
      if (minpassword < 8)
        return res.status(400).send({ message: "Password must be 8 digits" });

      if (!password) return res.status(400).send({ message: "Required" });

      const newpassword = await encryptPassword(password);
      console.log(newpassword);
      const setnewuserpass = await User.findByIdAndUpdate(
        { _id: _id },
        { password: newpassword }
      );
      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// get user is login or not
router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validuserone = await User.findOne({ _id: req.userID });
    res.status(201).json(validuserone);
  } catch (error) {
    console.log(error);
  }
});

//profile
router.get("/profile", authenticate, async (req, res) => {
  console.log("Profile");
  res.send(req.rootUser);
});

//profile update
router.post("/updateprofile", authenticate, async (req, res) => {
  try {
    const { name, email, number, address } = req.body;
    if (!name || !email || !number || !address) {
      console.log("All Fields are required");
      return res.json({ error: "All Fields are required" });
    }
    let item = await User.findByIdAndUpdate(req.userID, {
      name,
      email,
      number,
      address,
    }).exec();
    res.json({
      message: "Profile Successfully Updated",
      data: item,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

//delete account
router.delete("/deleteaccount", authenticate, async (req, res) => {
  const result = await User.deleteOne({ _id: req.userID });
  res.send(result);
});

// for userlogout
router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("Zaykaa", { path: "/" });
    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    console.log("user logout");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
