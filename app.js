var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var dotenv = require("dotenv");

// routes
var authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postRouter = require("./routes/posts");

dotenv.config();
var app = express();

// middlewares
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/auth/post", postRouter);

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => {
    console.log("DB is up and running");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
