var express = require("express");
var router = express.Router();
var verify = require("../routes/verifyRoute");

router.get("/", verify, async (req, res) => {
  res.send("if you are verified , you can create a post");
});

module.exports = router;
