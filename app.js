// const express = require("express");
// const mongoose = require("mongoose");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/users.js");

dotenv.config();

const app = express();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to DB");
  } catch (error) {
    handleError(error);
  }
};
connectToDB();
function handleError(error) {
  console.error("An error occurred:", error);
}

app.use(cors());
app.use(express.json());
// middlewares
app.use("/auth", authRouter);
app.use("/auth/post/post", userRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`listening at PORT ${process.env.PORT}`);
});
