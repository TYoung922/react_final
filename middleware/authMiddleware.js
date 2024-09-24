const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Expecting "Bearer token"

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("JWT verification failed:", err); // Log error for debugging
        return res.sendStatus(403); // Forbidden
      }
      req.user = user; // Attach user info to the request
      next();
    });
  } else {
    console.error("No token provided");
    res.sendStatus(403); // Forbidden
  }
};

module.exports = { authenticateJWT };
