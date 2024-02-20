const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const JWT = require("jsonwebtoken");

// post req > registration of model with the schema , save the user/schema use async await
// use try catch and send res json

// create schema validation with Joi

const schema = Joi.object({
  username: Joi.string().required().min(4),
  email: Joi.string().required().min(6).email(),
  password: Joi.string().required().min(6),
});

const Loginschema = Joi.object({
  email: Joi.string().required().min(6).email(),
  password: Joi.string().required().min(6),
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

// delete based on id
router.delete("/users/:id", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.status(200).send(deletedUser);
});

router.post("/register", async (req, res) => {
  // Joi validation
  const { error } = await schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // existing email
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.send("email alredy registered");

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPasssword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPasssword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send({ message: err });
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

    // Password is valid, you can proceed with your login logic

    const token = JWT.sign({ id: user._id }, process.env.JWT_KEY);
    res.header("auth-key", token).send(token);
    // res.send("Login successful");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
