var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  imgpath: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
    maxlength: 60,
  },
  subname: {
    type: String,
    required: true,
    maxlength: 60,
  },
  desc: {
    type: String,
    required: true,
    maxlength: 300,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
