const express = require("express");
const {
  register,
  login,
  deleteUser,
} = require("../controllers/authController");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/delete", authenticateJWT, deleteUser);

module.exports = router;
