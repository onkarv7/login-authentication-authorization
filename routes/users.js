import express from "express";
import verify from "./verifyRoute.js";
const router = express.Router();

router.get("/", verify, async (req, res) => {
  res.send("if you are verified , you can create a post");
});

export default router;

