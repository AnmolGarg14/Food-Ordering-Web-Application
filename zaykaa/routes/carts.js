const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Item = require("../models/item");
const authenticate = require("../middleware/authenticate.js");

// adding the data into cart
router.post("/addtocart/:_id", authenticate, async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const cart = await Item.findOne({ _id: _id });
    console.log(cart);

    const Usercontact = await User.findOne({ _id: req.userID });
    console.log(Usercontact);

    if (Usercontact) {
      const cartData = await Usercontact.addcartdata(cart);
      await Usercontact.save();
      res.status(201).json(Usercontact);
    } else {
      return res.status(402).send({ message: "Please LogIn first" });
    }
  } catch (error) {
    console.log(error);
  }
});

// get data into the cart
router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const buyuser = await User.findOne({ _id: req.userID });
    res.status(201).json(buyuser);
  } catch (error) {
    console.log(error);
  }
});

// remove iteam from the cart

router.delete("/remove/:_id", authenticate, async (req, res) => {
  try {
    const { _id } = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((cruval) => {
      return cruval._id != _id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("Item remove");
  } catch (error) {
    console.log(error + "jwt provide then remove");
    res.status(400).json(error);
  }
});

module.exports = router;
