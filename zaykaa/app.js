const createError = require("http-errors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin/admin");
const CategoryRouter = require("./routes/admin/category");
const ItemRouter = require("./routes/admin/items");
const cartRouter = require("./routes/carts");

const app = express();
app.use(cors());

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(""));
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/cart", cartRouter);
app.use("/category", CategoryRouter);
app.use("/item", ItemRouter);
app.use("/uploads", express.static("./uploads"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// MongoDb Connectivity with Mongoose starts here

mongoose.connect(
  // "mongodb://127.0.0.1:27017/Zaykaa",
  process.env.MONGO_CONNECTION_URL,
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Db Connected");
    }
  }
);

// MongoDb Connectivity with Mongoose ends here

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
