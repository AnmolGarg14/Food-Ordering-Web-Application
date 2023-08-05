const express = require("express");
const router = express.Router();
const multer = require("multer");
const Category = require("../../models/category");

//img storage path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `category-${Date.now()}.${file.originalname}`);
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

router.post("/addcategory", upload.single("image"), async (req, res) => {
  const { filename } = req.file;
  const { name } = req.body;
  const { subname } = req.body;
  const { desc } = req.body;

  if (!filename || !name || !subname || !desc) {
    res.status(401).json({ status: 401, message: "All fields are required" });
  }

  try {
    let category = await new Category({
      imgpath: filename,
      name,
      subname,
      desc,
    }).save();
    res.json({
      message: "Category Added Successfully",
      data: category,
      success: true,
    });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.get("/getcategory", async (req, res) => {
  try {
    const getcategory = await Category.find();
    res.json({ message: "Category Details", data: getcategory, success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.post("/updatecategory/:_id", async (req, res) => {
  try {
    let category = await Category.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      subname: req.body.subname,
      desc: req.body.desc,
    }).exec();
    res.json({
      message: "Category Successfully Updated",
      data: category,
      success: true,
    });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.delete("/deletecategory/:id", async (req, res) => {
  const result = await Category.deleteOne({
    _id: req.params.id,
  });
  res.send(result);
});

router.get("/search/:key", async (req, resp) => {
  let result = await Category.find({
    $or: [
      { name: { $regex: req.params.key } },
      { subname: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

//get individual category
router.get("/category/:name", async (req, res) => {
  try {
    const { name } = req.params;
    // console.log(name);

    const individualcategory = await Category.findOne({ name: name });
    // console.log(individualcategory);
    res.status(201).json(individualcategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
