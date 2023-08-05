var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

var user = new Schema(
  {
    role: {
      type: String,
      default: "customer",
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    number: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    address: {
      type: String,
      // required: true,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    tokens: [
      {
        token: {
          type: String,
          required: false,
        },
      },
    ],
    carts: Array,
    emailToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    verifytoken: {
      type: String,
    },
  },
  { timestamps: true }
);

user.methods.generatAuthtoken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

// add to cart data
user.methods.addcartdata = async function (cart) {
  try {
    this.carts = this.carts.concat(cart);
    await this.save();
    return this.carts;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("User", user);
