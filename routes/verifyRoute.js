const Jwt = require("jsonwebtoken");

// func to verify routes with Jwt token

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  try {
    const verified = Jwt.verify(token, process.env.JWT_KEY);
    res.user = verified;
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
};
