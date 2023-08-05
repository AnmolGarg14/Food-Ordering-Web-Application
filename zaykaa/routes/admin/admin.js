var express = require("express");
var router = express.Router();
var Admin = require("../../models/admin");

let {
  encryptPassword,
  comparePasswords,
  generateJwt,
} = require("../../utils/auth");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/getadmin", async (req, res) => {
  try {
    const getadmin = await User.find().exec();
    res.json({ message: "Admin Details", data: getadmin, success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.post("/deleteadmin", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.body.id).exec();
    res.json({ message: "Successfully Deleted", success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

// Admin Register API starts here

router.post("/adminregister", async (req, res) => {
  try {
    const adminEmailCheck = await Admin.findOne({
      email: new RegExp(`^${req.body.email}$`, "i"),
    }).exec();

    if (adminEmailCheck) throw new Error("Email already registered");

    req.body.password = await encryptPassword(req.body.password);

    let admin = await new Admin(req.body).save();
    res.status(200).json({
      message: "Admin Register Successfully",
      data: admin,
      success: true,
    });
  } catch (err) {
    console.error(err);
    if (err.message)
      res.json({ message: err.message, data: err, success: false });
    else res.json({ message: "Error", data: err, success: false });
  }
});

// Admin Register API Close

// Admin Login API Starts Here

router.post("/adminlogin", async (req, res) => {
  try {
    const admin = await Admin.findOne({
      email: new RegExp(`^${req.body.email}$`, "i"),
    }).exec();

    if (!admin) return res.status(401).json({ message: "Invalid Email" });

    const checkPassword = await comparePasswords(
      req.body.password,
      admin.password
    );

    if (!checkPassword)
      return res.status(401).json({ message: "Invalid Password" });

    const token = await generateJwt(Admin._id);
    res.json({ message: "Logged In", data: token, success: true });
  } catch (err) {
    console.error(err);
    if (err.message) res.status(500).send({ message: "Internal Server Error" });
    else res.json({ message: "Error", data: err, success: false });
  }
});

// Admin Login Api Ends

module.exports = router;
