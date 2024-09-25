const express = require("express");
const {
  createYodel,
  getAllYodels,
  getYodelById,
  getUsersYodels,
  searchByContent,
} = require("../controllers/yodelController");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateJWT, createYodel);
router.get("/", getAllYodels);
router.get("/search", searchByContent);
router.get("/:id", getYodelById);
router.get("/user/:userId", getUsersYodels);

module.exports = router;
