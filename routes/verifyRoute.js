import Jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const verified = Jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      // Invalid token
      res.status(401).send("Invalid token");
    } else {
      // Other errors (e.g., token expired)
      res.status(401).send("Token validation error");
    }
  }
};

export default verify;
