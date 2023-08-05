var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  catname: {
    type: String,
    required: true,
    maxlength: 60,
  },
  imgpath: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
    maxlength: 60,
  },
  size: {
    type: Object,
    // required: true,
  },
  price: {
    type: Object,
    // required: true,
  },
});

module.exports = mongoose.model("Items", ItemSchema);
