// const router = require("express").Router();
const express = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const Joi = require("joi");

const router = express.Router();

const schema = Joi.object({
  username: Joi.string().required().min(4),
  email: Joi.string().required().min(6).email(),
  password: Joi.string().required().min(6),
});

const Loginschema = Joi.object({
  email: Joi.string().required().min(6).email(),
  password: Joi.string().required().min(6),
});

// register user
router.post("/register", async (req, res) => {
  const { error } = await schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedpassword,
  });
  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

// get specific user
router.get("/user/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.json(user);
});
// get all user
router.get("/user", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
// delete user

router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  // Joi validation
  const { error } = await Loginschema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send("Not registered email address");
    }

    // Compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send("Invalid Password");
    }

    const { password, ...other } = user.toObject();

    // Password is valid, you can proceed with your login logic

    const token = JWT.sign({ id: user._id }, process.env.JWT_KEY);
    res.header("auth-key", token).send(other);
    // res.send("Login successful");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
