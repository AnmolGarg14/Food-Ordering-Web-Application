var express = require("express");
var router = express.Router();
const multer = require("multer");
var Item = require("../../models/item");

//img storage path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `item-${Date.now()}.${file.originalname}`);
  },
});

//img filter
const isImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images is allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: isImage,
});

router.post("/additem", upload.single("image"), async (req, res) => {
  const { filename } = req.file;
  const { catname } = req.body;
  const { name } = req.body;
  const { size } = req.body;
  const { price } = req.body;

  if (!filename || !catname || !name || !size || !price) {
    res.status(401).json({ status: 401, message: "All fields are required" });
  }

  try {
    let item = await new Item({
      imgpath: filename,
      catname,
      name,
      size,
      price,
    }).save();
    res.json({
      message: "Item Added Successfully",
      data: item,
      success: true,
    });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.get("/getitem/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const getitem = await Item.find({ catname: name }).exec();
    res.json({ message: "Item Details", data: getitem, success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.get("/getitem", async (req, res) => {
  try {
    const getitem = await Item.find().exec();
    res.json({ message: "Item Details", data: getitem, success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.post("/updateitem/:_id", async (req, res) => {
  try {
    // const { _id } = req.body;
    let item = await Item.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      catname: req.body.catname,
      price: req.body.price,
    }).exec();
    res.json({
      message: "Item Successfully Updated",
      data: item,
      success: true,
    });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.delete("/deleteitem/:id", async (req, res) => {
  const result = await Item.deleteOne({ _id: req.params.id });
  // console.log(req.params.id);
  res.send(result);
});

router.get("/search/:key", async (req, resp) => {
  let result = await Item.find({
    $or: [
      { name: { $regex: req.params.key } },
      { catname: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

module.exports = router;
