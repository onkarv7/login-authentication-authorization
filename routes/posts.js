const verifyRoute = require("./verifyRoute");

const router = require("express").Router();

router.get("/", verifyRoute, (req, res) => {
  res.send("if verified then this will show");
});

module.exports = router;
